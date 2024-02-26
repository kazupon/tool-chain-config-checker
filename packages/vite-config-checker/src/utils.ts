import type { AliasOptions, Alias } from 'vite'

export function convertAliasArgValue(arg: string): boolean | string[] {
  const data = JSON.parse(arg)
  if (isAliasArg(data)) {
    return data
  }
  throw new Error(`Invalid 'alias' option value: ${arg}`)
}

function isAliasArg(arg: unknown): arg is boolean | string[] {
  return typeof arg === 'boolean' || (Array.isArray(arg) && arg.every(id => typeof id === 'string'))
}

function isAlias(entries: AliasOptions): entries is Alias[] {
  return Array.isArray(entries)
}

export function getAliasPatterns(entries: AliasOptions | undefined): (string | RegExp)[] {
  if (!entries) {
    return []
  }
  if (isAlias(entries)) {
    return entries.map(entry => entry.find)
  }
  return Object.entries(entries).map(([find]) => find)
}

export function matches(pattern: string | RegExp, id: string) {
  if (pattern instanceof RegExp) {
    return pattern.test(id)
  }
  if (id.length < pattern.length) {
    return false
  }
  if (id === pattern) {
    return true
  }
  return false
}

type NotAllowAliasPattern = Omit<Alias, 'customResolver'> | Record<string, string>

function matchesWithAliasKeys(pattern: string | RegExp, keys: string[]): boolean {
  return keys.some(key => matches(pattern, key))
}

export function collectNotAllowAliasPattern(entries: AliasOptions, alias: string[]): NotAllowAliasPattern[] {
  // difference 'entries' from 'alias'
  if (isAlias(entries)) {
    return entries.filter(entry => !matchesWithAliasKeys(entry.find, alias)) || []
  } else {
    return Object.entries<string>(entries as Record<string, string>)
      .filter(([find]) => !matchesWithAliasKeys(find, alias))
      .map(([find, replacement]) => ({ [find]: replacement }))
  }
}
