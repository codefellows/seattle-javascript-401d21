export const log = (...args) => __DEBUG__ ? console.log(...args) : undefined
export const logError = (...args) => __DEBUG__ ? console.error(...args) : undefined
export const renderIf = (test, component) => test ? component : undefined
export const classToggler = options => Object.keys(options).filter(key => !!options[key]).join(' ')
export const map = (child, ...args) => Array.prototype.map.apply(child, args)
export const filter = (child, ...args) => Array.prototype.filter.apply(child, args)
export const reduce = (child, ...args) => Array.prototype.reduce.apply(child, args)
