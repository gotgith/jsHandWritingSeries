var slice = Array.prototype.slice

function bind(asThis) {
  var args = slice.call(arguments, 1)
  var fn = this
  if (typeof fn !== 'function') {
    throw new Error('bind必须绑定函数上')
  }
  return function () {
    var args2 = slice.call(arguments, 0)
    return fn.apply(asThis, args.concat(args2))
  }
}

// es6代码
// function bind(asThis, ...args) {
//   // this 就是要绑定的函数
//   const fn = this
//   return function (...args2) {
//     return fn.call(asThis, ...args, ...args2)
//   }
// }

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
