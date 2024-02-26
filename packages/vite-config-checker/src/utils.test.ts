import { describe, test, expect } from 'vitest'
import { getAliasPatterns, matches, collectNotAllowAliasPattern } from './utils.js'

import type { Alias } from 'vite'

describe('getAliasPatterns', () => {
  test('Alias type', () => {
    const alias: Alias[] = [
      {
        find: 'foo',
        replacement: 'path/to/foo'
      },
      {
        find: 'bar',
        replacement: 'path/to/bar'
      }
    ]

    expect(getAliasPatterns(alias)).toEqual(['foo', 'bar'])
  })

  test('Record type', () => {
    const alias: Record<string, string> = {
      foo: 'path/to/foo',
      bar: 'path/to/bar'
    }

    expect(getAliasPatterns(alias)).toEqual(['foo', 'bar'])
  })

  test('undefined', () => {
    expect(getAliasPatterns(undefined)).toEqual([])
  })
})

describe('matches', () => {
  test('string', () => {
    expect(matches('foo', 'foo')).toBe(true)
    expect(matches('foo', 'bar')).toBe(false)
  })

  test('regexp', () => {
    expect(matches(/foo/, 'foo')).toBe(true)
    expect(matches(/foo/, 'bar')).toBe(false)
  })
})

describe('collectNotAllowAliasPattern', () => {
  describe('Alias type', () => {
    test('a part', () => {
      expect(
        collectNotAllowAliasPattern(
          [
            {
              find: 'foo',
              replacement: 'path/to/foo'
            },
            {
              find: 'bar',
              replacement: 'path/to/bar'
            }
          ],
          ['foo']
        )
      ).toEqual([{ find: 'bar', replacement: 'path/to/bar' }])
    })

    test('all pass', () => {
      expect(
        collectNotAllowAliasPattern(
          [
            {
              find: 'foo',
              replacement: 'path/to/foo'
            },
            {
              find: 'bar',
              replacement: 'path/to/bar'
            }
          ],
          ['foo', 'bar']
        )
      ).toEqual([])
    })

    test('missing key', () => {
      expect(
        collectNotAllowAliasPattern(
          [
            {
              find: 'foo',
              replacement: 'path/to/foo'
            },
            {
              find: 'bar',
              replacement: 'path/to/bar'
            }
          ],
          ['foo1']
        )
      ).toEqual([
        {
          find: 'foo',
          replacement: 'path/to/foo'
        },
        {
          find: 'bar',
          replacement: 'path/to/bar'
        }
      ])
    })
  })

  describe('record type', () => {
    test('a part', () => {
      expect(
        collectNotAllowAliasPattern(
          {
            foo: 'path/to/foo',
            bar: 'path/to/bar'
          },
          ['foo']
        )
      ).toEqual([{ bar: 'path/to/bar' }])
    })

    test('all pass', () => {
      expect(
        collectNotAllowAliasPattern(
          {
            foo: 'path/to/foo',
            bar: 'path/to/bar'
          },
          ['foo', 'bar']
        )
      ).toEqual([])
    })

    test('missing key', () => {
      expect(
        collectNotAllowAliasPattern(
          {
            foo: 'path/to/foo',
            bar: 'path/to/bar'
          },
          ['foo1']
        )
      ).toEqual([{ foo: 'path/to/foo' }, { bar: 'path/to/bar' }])
    })
  })
})
