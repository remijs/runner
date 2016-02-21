'use strict'
const runAsync = require('run-async')

module.exports = () =>
  (next, target, plugin, cb) => {
    const oldRegister = plugin.register

    plugin.register = (app, opts, next) =>
      runAsync.cb(oldRegister, next)(app, opts)

    next(target, plugin, cb)
  }
