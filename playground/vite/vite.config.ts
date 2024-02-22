import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

import alias from './alias'

export default defineConfig({
  resolve: {
    alias: { foo: '/foo', ...alias }
  },
  plugins: [Inspect(), VueI18n({
    include: ['src/locales/**']
  })]
})
