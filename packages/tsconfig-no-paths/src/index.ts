import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import path from 'node:path'

import { defineTSConfig, definePackageJSON } from 'pkg-types'

function getPackageJSON() {
  try {
    const rawData = readFileSync(path.join(__dirname, '../package.json'), 'utf8')
    return definePackageJSON(JSON.parse(rawData))
  } catch (error) {
    return { version: '0.0.0' }
  }
}

const version = getPackageJSON().version
consola.debug('version', version)

const main = defineCommand({
  meta: {
    name: "tsconfig-no-paths",
    version,
    description: "tsconfig paths option none using checker",
  },
  args: { },
  async run({ args }) {
    const tscPath = require.resolve('typescript/lib/tsc');
    consola.debug('tsc path', tscPath)

    // run tsc
    const cwd = process.cwd()
    const tsc = await spawn('node', [tscPath, '--showConfig'], {
      cwd,
      stdio: ['pipe', 'pipe', 'inherit']
    })

    // collect tsconfig via stdout
    let data = ''
    for await (const stdout of tsc.stdout){
      data += stdout
    }

    const tsConfig = defineTSConfig(JSON.parse(data))
    if (Object.keys(tsConfig.compilerOptions?.paths || {}).length > 0) {
      consola.error('Detect `paths` option is in tsconfig.json ...')
      consola.error('Please remove `paths` option from tsconfig.json')
      consola.error(`the below the resolved tsconfig.json with 'tsc --showConfig' at ${cwd}`)
      consola.box(data)
      process.exit(1)
    }
  },
});

runMain(main)
