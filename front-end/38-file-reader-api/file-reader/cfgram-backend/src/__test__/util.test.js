import * as util from '../lib/util.js'

describe('util', () => {
  test('#partial', () => {
    let add = (...args) => args.reduce((a, b) => a + b)
    let add10 = util.partial(add, 5, 2, 3) 

    expect(add10(2)).toBe(12)
    expect(add10(2, 50, 25, 20, 5)).toBe(112)

    let concat = (...args) => args.join(' ')
    expect(util.partial(concat, 'hello')('world')).toBe('hello world')
  })

  test('#partialRight', () => {
    let add = (...args) => args.reduce((a, b) => a + b)
    let add10 = util.partialRight(add, 5, 2, 3)

    expect(add10(2)).toBe(12)
    expect(add10(2, 50, 25, 20, 5)).toBe(112)

    let concat = (...args) => args.join(' ')
    expect(util.partialRight(concat, 'hello')('world')).toBe('world hello')
  })

  test('#compose', () => {
    let add10 = (arg) => arg + 10 
    let sub10 = (arg) => arg - 10 
    let div10 = (arg) => arg / 10 
    let mul10 = (arg) => arg * 10 

    let composed = util.compose(mul10, add10, div10, sub10)
    expect(composed(4)).toBe(-5)
  })

  test('#promisify', () => {
    let mock = (arg, cb) => 
      arg == 'error' ? cb(new Error('TEST ERROR')) : cb(null, arg)
    
    let result = util.promisify(mock)

    return result('error')
    .catch(err => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual('TEST ERROR')
      return result('success')
    })
    .then(data => {
      expect(data).toEqual('success')
    })
  })

  describe('loggers', () => {
    let cache = {}

    beforeAll(() => {
      cache.DEBUG = process.env.DEBUG
      cache.log = console.log
      cache.error = console.error
      console.log = jest.fn()
      console.error = jest.fn()
    })

    afterAll(() => {
      process.env.DEBUG = cache.DEBUG
      console.log = cache.log
      console.error = cache.error
    })

    test('#log', () => {
      process.env.DEBUG = true
      util.log()
      expect(console.log).toHaveBeenCalled()

      console.log.mockClear()

      process.env.DEBUG = null
      util.log('cool')
      expect(console.log).not.toHaveBeenCalled()
    })

    test('#logError', () => {
      process.env.DEBUG = true
      util.logError()
      expect(console.error).toHaveBeenCalled()

      console.error.mockClear()

      process.env.DEBUG = null
      util.logError('cool')
      expect(console.error).not.toHaveBeenCalled()
    })
  })
})
