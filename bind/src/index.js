// es3代码
var slice = Array.prototype.slice

function bind(asThis) {
  var args = slice.call(arguments, 1)
  var fn = this
  if (typeof fn !== 'function') {
    throw new Error('bind必须绑定函数上')
  }

  function resultFn() {
    var args2 = slice.call(arguments, 0)
    return fn.apply(resultFn.prototype.isPrototypeOf(this) ? this : asThis, args.concat(args2))
  }

  resultFn.prototype = fn.prototype
  return resultFn
}

// es6代码
// new之后所做的事，可以简单总结为下面四点：
// 1.生成一个临时对象
// 2.改变临时对象的原型链    bind可以使用new的关键所在
// 3.把这个临时对象作为this调用fn
// 4.把fn的this作为返回值给return回来
// function bind(asThis, ...args) {
//   // this 就是要绑定的函数
//   const fn = this
//
//   function resultFn(...args2) {
//     // resultFn.prototype.isPrototypeOf(this)与this instanceof resultFn等价
//     return fn.call(this instanceof resultFn ? this : asThis, ...args, ...args2)
//   }
//
//   resultFn.prototype = fn.prototype
//   return resultFn
// }

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
