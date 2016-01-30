'use strict'
const runAsync = require('run-async')

module.exports = function() {
  return (next, target, plugin, cb) => {
    let oldRegister = plugin.register
    plugin.register = (app, opts, next) => {
      runAsync.cb(oldRegister, next)(app, opts)
    }
    next(target, plugin, cb)
  }
}
