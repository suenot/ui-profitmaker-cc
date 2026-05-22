import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..'),
      'next/link': path.resolve(__dirname, '../lib/storybook-mocks/next-link.tsx'),
      'next/navigation': path.resolve(__dirname, '../lib/storybook-mocks/next-navigation.ts'),
    }
    config.esbuild = {
      ...config.esbuild,
      jsx: 'automatic',
    }
    return config
  },
}

export default config
