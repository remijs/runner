'use strict'
const expect = require('chai').expect
const remi = require('remi')
const remiRunner = require('..')
const plugiator = require('plugiator')

describe('remi-runner', function() {
  let app
  let registrator

  beforeEach(function() {
    app = {}
    registrator = remi(app)
    registrator.hook(remiRunner())
  })

  it('should register error-first-callback plugin', function() {
    let plugin = plugiator.noop()

    return registrator
      .register({ register: plugin })
      .then(() => {
        expect(app.registrations[plugin.attributes.name]).to.exist
      })
  })

  it('should register synchronous plugin', function() {
    let plugin = plugiator.anonymous((app, opts) => {})

    return registrator
      .register({ register: plugin })
      .then(() => {
        expect(app.registrations[plugin.attributes.name]).to.exist
      })
  })

  it('should register plugin that returns a promise', function() {
    let plugin = plugiator.anonymous((app, opts) => Promise.resolve())

    return registrator.register({ register: plugin })
      .then(() => {
        expect(app.registrations[plugin.attributes.name]).to.exist
      })
  })
})
