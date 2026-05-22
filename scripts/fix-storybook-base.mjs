import { readFileSync, writeFileSync } from 'fs'

const path = 'public/storybook/index.html'
const html = readFileSync(path, 'utf8')

if (!html.includes('<base href="/storybook/">')) {
  const fixed = html.replace('<head>', '<head><base href="/storybook/">')
  writeFileSync(path, fixed)
  console.log('✓ Added <base href="/storybook/"> to Storybook index.html')
}
