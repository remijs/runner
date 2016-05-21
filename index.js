import isPromise from 'is-promise'

function runAsync (func, cb) {
  cb = cb || function () {};

  return function () {
    var async = false;
    var args = arguments;

    var promise = new Promise(function (resolve, reject) {
      var answer = func.apply({
        async: function () {
          async = true;
          return function (err, value) {
            if (err) {
              reject(err);
            } else {
              resolve(value);
            }
          };
        }
      }, Array.prototype.slice.call(args));

      if (!async) {
        if (isPromise(answer)) {
          answer.then(resolve, reject);
        } else {
          resolve(answer);
        }
      }
    });

    promise.then(cb.bind(null, null), cb);

    return promise;
  }
};

runAsync.cb = function (func, cb) {
  return runAsync(function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length === func.length - 1) {
      args.push(this.async());
    }
    return func.apply(this, args);
  }, cb);
};

export default () =>
  (next, target, plugin, cb) => {
    const oldRegister = plugin.register

    plugin.register = (app, opts, next) =>
      runAsync.cb(oldRegister, next)(app, opts)

    next(target, plugin, cb)
  }
