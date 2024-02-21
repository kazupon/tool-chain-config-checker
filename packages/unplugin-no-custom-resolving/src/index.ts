import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => {
  const full: Date = new Date()

  let build: Date
  let buildEnd: Date
  let render: Date

  return {
    name: 'unplugin-stats',
    apply: 'build',
    buildStart() {
      build = new Date()
    },
    buildEnd() {
      buildEnd = new Date()
    },
    writeBundle() {
      const time = (buildEnd.getTime() - build.getTime()) / 1000
      // eslint-disable-next-line no-console
      console.log(`Build time: ${time.toFixed(3)}s`)
    }
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
