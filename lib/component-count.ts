import fs from 'fs'
import path from 'path'

/** Number of documented components (one directory per component under app/docs/components). */
export function getComponentCount(): number {
  const dir = path.join(process.cwd(), 'app', 'docs', 'components')
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).length
}

/** Rounded-down "NN+" label for marketing copy, so it stays valid as components are added. */
export function getComponentCountLabel(): string {
  const count = getComponentCount()
  const rounded = Math.floor(count / 5) * 5
  return `${rounded}+`
}
