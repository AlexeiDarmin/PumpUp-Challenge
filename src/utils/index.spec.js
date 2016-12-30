import React from 'react'     // eslint-disable-line no-unused-vars

import should from 'should'   // eslint-disable-line no-unused-vars

import * as utils from './index.js'



describe('addLink simple', () => {


  it('should return empty string on empty string input', () => {
    utils.addLinks(''.should.equal(''))
  })


  it('should return empty string on non string input', () => {
    utils.addLinks(undefined).should.equal('')
  })


  it('should return link on whole string mention', () => {
    const result = utils.addLinks('@hi')
    result[1].should.have.property('type', 'a')
    result[1].props.should.deepEqual({ href: '@hi', children: '@hi' })
  })


  it('should return no links on no mentions', () => {
    const result = utils.addLinks('hey there')
    result[0].should.equal('hey there')
  })


  it('should ignore mention before a space', () => {
    const result = utils.addLinks('@ # ')
    result[0].should.equal('@ # ')
  })

})



describe('addLink multiple mentions', () => {

  it('should break apart multiple mentions with no spaces', () => {

    const result = utils.addLinks('@a#b')

    result[1].should.have.property('type', 'a')
    result[1].props.should.deepEqual({ href: '@a', children: '@a' })
    result[2].should.have.property('type', 'a')
    result[2].props.should.deepEqual({ href: '#b', children: '#b' })

  })


  it('should return two links on two mentions', () => {

    const result = utils.addLinks('#hi @bye')

    result[1].should.have.property('type', 'a')
    result[1].props.should.deepEqual({ href: '#hi', children: '#hi' })
    result[2].should.equal(' ')
    result[3].should.have.property('type', 'a')
    result[3].props.should.deepEqual({ href: '@bye', children: '@bye' })

  })

})
