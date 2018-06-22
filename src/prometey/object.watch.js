/*
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

// object.watch
if (!Object.prototype.watch) {
  Object.defineProperty(Object.prototype, 'watch', { //eslint-disable-line
    enumerable: false,
    configurable: true,
    writable: false,
    value: function(prop, handler) {
      let oldval = this[prop]
      let newval = oldval
      const getter = () => newval
      const setter = val => {
        oldval = newval
        return (newval = handler.call(this, prop, oldval, val))
      }

      if (delete this[prop]) {
        // can't watch constants
        Object.defineProperty(this, prop, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true,
        })
      }
    },
  })
}

// object.unwatch
if (!Object.prototype.unwatch) {
  Object.defineProperty(Object.prototype, 'unwatch', { //eslint-disable-line
    enumerable: false,
    configurable: true,
    writable: false,
    value: function(prop) {
      var val = this[prop]
      delete this[prop] // remove accessors
      this[prop] = val
    },
  })
}
