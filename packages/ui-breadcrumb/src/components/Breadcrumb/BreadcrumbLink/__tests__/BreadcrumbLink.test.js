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

import React from 'react'

import BreadcrumbLink from '../index'

describe('<BreadcrumbLink />', () => {
  const testbed = new Testbed(<BreadcrumbLink>Content</BreadcrumbLink>)

  it('should render a link when given an href prop', () => {
    const subject = testbed.render({href: '#'})
    expect(subject.find('a')).to.be.present()
  })

  it('should render as a button and respond to onClick event', () => {
    const onClick = testbed.stub()
    const subject = testbed.render({onClick})
    subject.find('button').simulate('click')
    expect(onClick).to.have.been.called()
  })

  it('should not render a link when not given an href prop', () => {
    const subject = testbed.render()
    expect(subject.find('a')).not.to.be.present()
  })

  it('should not render a button when not given an onClick prop', () => {
    const subject = testbed.render()
    expect(subject.find('button')).not.to.be.present()
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })
})
