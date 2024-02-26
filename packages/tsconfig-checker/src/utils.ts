import { spawn } from 'node:child_process'
import { defineTSConfig, resolveTSConfig } from 'pkg-types'

import type { TSConfig } from 'pkg-types'

export async function loadTsConfig(
  tscPath: string,
  cwdContext = ''
): Promise<{ rawData: string; config: TSConfig; path: string }> {
  const cwd = cwdContext || process.cwd()

  const tsc = await spawn('node', [tscPath, '--showConfig'], {
    cwd,
    stdio: ['pipe', 'pipe', 'inherit']
  })

  let data = ''
  for await (const stdout of tsc.stdout) {
    data += stdout
  }

  const tsConfigPath = await resolveTSConfig(cwd)

  return { rawData: data, config: defineTSConfig(JSON.parse(data)), path: tsConfigPath }
}

function isPathsArg(arg: unknown): arg is boolean | string[] {
  return typeof arg === 'boolean' || (Array.isArray(arg) && arg.every(id => typeof id === 'string'))
}

export type PathsOption = { [entry: string]: string[] }

function isPaths(paths: unknown): paths is PathsOption {
  if (paths == null) {
    return false
  }

  // prettier-ignore
  return typeof paths === 'object'
    && !Array.isArray(paths) && Object.keys(paths).length > 0
    && Object.values(paths).every(p => Array.isArray(p))
}

export function convertPathsArgValue(arg: string): boolean | string[] {
  const data = JSON.parse(arg)
  if (isPathsArg(data)) {
    return data
  }
  throw new Error(`Invalid 'compilerOptions.paths' option value: ${arg}`)
}

export function getPathsPatterns(paths: PathsOption | undefined): string[] {
  return isPaths(paths)
    ? (Object.keys(paths)
        .map(key => (paths[key] && paths[key].length > 0 ? key : undefined))
        .filter(Boolean) as string[])
    : []
}

export function matches(pattern: string, id: string) {
  if (id.length < pattern.length) {
    return false
  }
  if (id === pattern) {
    return true
  }
  return false
}

function matchesWithPathsKeys(pattern: string, keys: string[]): boolean {
  return keys.some(key => matches(pattern, key))
}

export function collectNotAllowPathsPattern(pathsOption: PathsOption, paths: string[]): PathsOption | null {
  const ret = Object.entries(pathsOption)
    .filter(([key]) => !matchesWithPathsKeys(key, paths))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  return Object.keys(ret).length > 0 ? ret : null
}
