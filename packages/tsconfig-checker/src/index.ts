import { readFileSync } from 'node:fs'
import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import path from 'node:path'
import { loadTsConfig, convertPathsArgValue, getPathsPatterns, collectNotAllowPathsPattern } from './utils'

import { definePackageJSON } from 'pkg-types'

function getPackageJSON(base: string) {
  try {
    const rawData = readFileSync(path.join(base, '../package.json'), 'utf8')
    return definePackageJSON(JSON.parse(rawData))
  } catch (error) {
    return { version: '0.0.0' }
  }
}

const { name, version, description } = getPackageJSON(__dirname)
consola.debug('name', name)
consola.debug('version', version)

const main = defineCommand({
  meta: {
    name,
    version,
    description
  },
  args: {
    paths: {
      type: 'string',
      description: "allow 'compilerOptions.paths' option, if you can disable it, specify 'false'",
      default: 'true'
    }
  },
  async run({ args }) {
    const tscPath = require.resolve('typescript/lib/tsc')
    consola.debug('tsc path', tscPath)

    // load tsconfig.json
    const cwd = process.cwd()
    const { config: tsConfig, path: tsConfigPath } = await loadTsConfig(tscPath, cwd)

    // check 'paths' option
    consola.debug('config paths', args.paths)
    const paths = convertPathsArgValue(args.paths)
    consola.debug('paths parsed value', paths)
    const pathsPatterns = getPathsPatterns(tsConfig.compilerOptions?.paths)
    consola.debug('pathsPatterns', pathsPatterns)
    if (typeof paths === 'boolean' && !paths && pathsPatterns.length > 0) {
      consola.error(`Detect 'compilerOptions.paths' option is in ${tsConfigPath} ...`)
      consola.log('detect paths:')
      consola.box(tsConfig.compilerOptions?.paths)
      process.exit(1)
    } else if (Array.isArray(paths) && paths.length > 0 && pathsPatterns.length > 0) {
      const notAllowPaths = collectNotAllowPathsPattern(tsConfig.compilerOptions?.paths || [], paths)
      if (notAllowPaths != null && Object.keys(notAllowPaths).length > 0) {
        consola.error(`Detect 'compilerOptions.paths' option is in ${tsConfigPath} ...`)
        consola.log('detect paths:')
        consola.box(notAllowPaths)
        process.exit(1)
      }
    }

    consola.success(`OK: ${tsConfigPath}`)
  }
})

runMain(main)
