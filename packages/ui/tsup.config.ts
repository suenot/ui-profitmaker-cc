import { defineConfig } from 'tsup'
import { readdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(__dirname, '../..')

// Discover one entry per component file (skip stories) so every component is its
// own chunk — this is what makes per-subpath imports and lazy loading minimal.
const entry: Record<string, string> = { index: 'src/index.ts' }
for (const dir of ['components/ui', 'components/trading']) {
  for (const file of readdirSync(join(root, dir))) {
    if (!file.endsWith('.tsx') || file.includes('.stories.')) continue
    entry[file.replace(/\.tsx$/, '')] = join(root, dir, file)
  }
}

function hasDirective(src: string): string | null {
  for (const line of src.split('\n').slice(0, 5)) {
    const t = line.trim()
    if (/^['"`]use (client|server)['"`]/.test(t)) return t.replace(/;?$/, ';')
  }
  return null
}

export default defineConfig({
  entry,
  format: ['esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  // react/react-dom (peer) and everything in dependencies are auto-externalized
  // by tsup. cn (lib/utils) is internal and lands in a shared chunk.
  esbuildOptions(options) {
    options.alias = { '@': root }
  },
  async onSuccess() {
    const dist = resolve(__dirname, 'dist')
    // Ship design tokens alongside the bundle.
    copyFileSync(resolve(__dirname, 'styles.css'), join(dist, 'styles.css'))
    // esbuild strips top-level "use client"/"use server" directives — restore them
    // on each emitted entry whose source declared one, preserving Next.js RSC boundaries.
    for (const [name, src] of Object.entries(entry)) {
      if (name === 'index') continue
      const directive = hasDirective(readFileSync(src, 'utf8'))
      const out = join(dist, `${name}.js`)
      if (!directive || !existsSync(out)) continue
      const code = readFileSync(out, 'utf8')
      if (!/^['"`]use (client|server)['"`]/.test(code.trimStart())) {
        writeFileSync(out, `${directive}\n${code}`)
      }
    }
  },
})
