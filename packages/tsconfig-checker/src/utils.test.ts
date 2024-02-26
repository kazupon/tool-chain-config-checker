import { describe, test, expect } from 'vitest'
import { getPathsPatterns, collectNotAllowPathsPattern } from './utils'

import type { PathsOption } from './utils'

describe('getAliasPatterns', () => {
  test('basic', () => {
    const paths: PathsOption = {
      'foo/*': ['path/to/foo/*'],
      'bar/*': ['path/to/bar/*']
    }
    expect(getPathsPatterns(paths)).toEqual(['foo/*', 'bar/*'])
  })

  test('undefined', () => {
    expect(getPathsPatterns(undefined)).toEqual([])
  })

  test('key only', () => {
    const paths: PathsOption = {
      'foo/*': ['path/to/foo/*'],
      'bar/*': [],
    }

    expect(getPathsPatterns(paths)).toEqual(['foo/*'])
  })
})

describe('collectNotAllowPathsPattern', () => {
  test('a part', () => {
    expect(collectNotAllowPathsPattern({
      'foo/*': ['path/to/foo/*'],
      'bar/*': ['path/to/bar/*']
    }, ['foo/*'])).toEqual({ 'bar/*': ['path/to/bar/*'] })
  })

  test('all pass', () => {
    expect(collectNotAllowPathsPattern({
      'foo/*': ['path/to/foo/*'],
      'bar/*': ['path/to/bar/*']
    }, ['foo/*', 'bar/*'])).toEqual(null)
  })

  test('missing key', () => {
    expect(collectNotAllowPathsPattern({
      'foo/*': ['path/to/foo/*'],
      'bar/*': ['path/to/bar/*']
    }, ['foo1/*'])).toEqual({ 'foo/*': ['path/to/foo/*'], 'bar/*': ['path/to/bar/*'] })
  })
})
