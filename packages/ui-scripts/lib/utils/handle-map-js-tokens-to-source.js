/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import isPlainObject from 'lodash.isplainobject'

/**
 * Transforms an InstUI theme object into the data structure expected by Style
 * Dictionary. See: https://amzn.github.io/style-dictionary/#/properties
 */
export function handleMapJSTokensToSource(tokens) {
  const mapTokenValue = (tokenValue) => ({ value: tokenValue })
  const mapTokenGroup = (tokenGroup) => {
    return Object.entries(tokenGroup).reduce((mapped, [key, value]) => {
      if (isPlainObject(value)) {
        // Ignore nested objects
        return { ...mapped, [key]: mapTokenGroup(value) }
      }

      return {
        ...mapped,
        [key]: mapTokenValue(value)
      }
    }, {})
  }

  const styleDictionarySource = Object.entries(tokens)
    // Exclude the "media" tokens, they are not cross-platform compatible
    .filter(([key]) => !['media'].includes(key))
    .reduce((mapped, [key, value]) => {
      if (isPlainObject(value)) {
        return {
          ...mapped,
          [key]: mapTokenGroup(value)
        }
      }

      return mapped
    }, {})

  return styleDictionarySource
}
