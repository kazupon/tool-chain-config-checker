import { readFileSync } from 'node:fs'
import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import path from 'node:path'
import { URL } from 'node:url'
import { loadConfigFromFile } from 'vite'
import { definePackageJSON } from 'pkg-types'
import { getAliasPatterns, convertAliasArgValue, collectNotAllowAliasPattern } from './utils.js'

function getPackageJSON(base: string) {
  try {
    const rawData = readFileSync(path.join(base, '../package.json'), 'utf8')
    return definePackageJSON(JSON.parse(rawData))
  } catch (error) {
    return { version: '0.0.0' }
  }
}

const __dirname = path.dirname(new URL(import.meta.url).pathname)
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
    alias: {
      type: "string",
      description: "allow 'resolve.alias' option, if you can disable it, specify 'false'",
      default: 'true'
    },
  },
  async run({ args }) {
    consola.debug('args', args)

    /**
     * load vite config
     */

    const loadedConfig = await loadConfigFromFile({
      command: 'build',
      mode: 'production',
    }, undefined, process.cwd(), 'silent')

    if (loadedConfig == null) {
      throw new Error('not found vite config. please check it!')
    }
    const { config, path: configPath } = loadedConfig

    /**
     * `alias` option
     */

    const alias = convertAliasArgValue(args.alias)
    consola.debug('alias parsed value', alias)
    const aliasPatterns = getAliasPatterns(config.resolve?.alias)
    consola.debug('aliasPatterns', aliasPatterns)
    if (typeof alias === 'boolean' && !alias && aliasPatterns.length > 0) {
      consola.error(`Detect 'resolve.alias' option is in ${configPath} ...`)
      consola.log('detect alias:')
      consola.box(config.resolve?.alias)
      process.exit(1)
    } else if (Array.isArray(alias) && alias.length > 0 && aliasPatterns.length > 0) {
      const notAllowAlias = collectNotAllowAliasPattern(config.resolve?.alias || [], alias)
      if (notAllowAlias.length > 0) {
        consola.error(`Detect 'resolve.alias' option is in ${configPath} ...`)
        consola.log('detect alias:')
        consola.box(notAllowAlias)
        process.exit(1)
      }
    }

    consola.success(`OK: ${configPath}`)
  },
});

runMain(main)
