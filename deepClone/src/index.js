const DeepCloner = class {
  constructor() {
    this.cache = []
  }

  clone(source) {
    if (source instanceof Object) {
      let cacheDist = this.findCache(source)
      if (cacheDist) {
        // 有缓存
        return cacheDist
      } else {
        // 无缓存
        let dist
        if (source instanceof Array) {
          dist = new Array()
        } else if (source instanceof Function) {
          dist = function () {
            return source.apply(this, arguments)
          }
        } else if (source instanceof RegExp) {
          dist = new RegExp(source.source, source.flags)
        } else if (source instanceof Date) {
          dist = new Date(source)
        } else {
          dist = new Object()
        }
        this.cache.push([source, dist])
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            dist[key] = this.clone(source[key])
          }
        }
        return dist
      }
    }
    return source
  }

  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1]
      }
    }
    return undefined
  }
}
module.exports = DeepCloner


// 存在一个坑，每次拷贝没有清除cache(cache全局共享，造成互相污染的问题)，解决方案：面向对象
// let cache = []
//
// function deepClone(source) {
//   if (source instanceof Object) {
//     let cacheDist = findCache(source)
//     if (cacheDist) {
//       // 有缓存
//       return cacheDist
//     } else {
//       // 无缓存
//       let dist
//       if (source instanceof Array) {
//         dist = new Array()
//       } else if (source instanceof Function) {
//         dist = function () {
//           return source.apply(this, arguments)
//         }
//       } else if (source instanceof RegExp) {
//         dist = new RegExp(source.source, source.flags)
//       } else if (source instanceof Date) {
//         dist = new Date(source)
//       } else {
//         dist = new Object()
//       }
//       cache.push([source, dist])
//       for (let key in source) {
//         if (source.hasOwnProperty(key)) {
//           dist[key] = deepClone(source[key])
//         }
//       }
//       return dist
//     }
//   }
//   return source
// }
//
// function findCache(source) {
//   for (let i = 0; i < cache.length; i++) {
//     if (cache[i][0] === source) {
//       return cache[i][1]
//     }
//   }
//   return undefined
// }
//
// module.exports = deepClone
