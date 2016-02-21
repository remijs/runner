# remi-runner

A remi extension that allows registering plugins that are returning promises during their registration or are registered synchronously

[![Dependency Status](https://david-dm.org/remijs/remi-runner/status.svg?style=flat)](https://david-dm.org/remijs/remi-runner)
[![Build Status](https://travis-ci.org/remijs/remi-runner.svg?branch=master)](https://travis-ci.org/remijs/remi-runner)
[![npm version](https://badge.fury.io/js/remi-runner.svg)](http://badge.fury.io/js/remi-runner)
[![Coverage Status](https://coveralls.io/repos/remijs/remi-runner/badge.svg?branch=master&service=github)](https://coveralls.io/github/remijs/remi-runner?branch=master)


## Installation

```
npm install remi-runner
```


## Example Usage

``` js
const remi = require('remi')
const remiRunner = require('remi-runner')

const app = {}
const registrator = remi(app)

registrator.hook(remiRunner())

registrator.register([cbPlugin, promisePlugin, syncPlugin])

// a traditional plugin that uses an error-first-callback
// this will work w/o using the remi-runner
function cbPlugin(app, opts, next) {
  // ...
  next()
}

cbPlugin.attributes = { name: 'cbPlugin' }


// a plugin that returns a Promise. This type of plugin will be registered correctly
// only if remi is hooked with remi-runner
function promisePlugin(app, opts) {
  // ...
  return Promise.resolve()
}

cbPlugin.attributes = { name: 'promisePlugin' }


// a synchronous plugin. This type of plugin will be registered correctly
// only if remi is hooked with remi-runner
function syncPlugin(app, opts) {
  // ...
}

cbPlugin.attributes = { name: 'syncPlugin' }
```


## License

MIT © [Zoltan Kochan](https://www.kochan.io)
