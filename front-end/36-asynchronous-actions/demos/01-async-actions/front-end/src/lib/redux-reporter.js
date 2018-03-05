import {log, logError} from './utils'

export default store => next => action => {
  log('__ACTION__', action)
  try {
    let result = next(action)
    log('__STATE__', store.getState())
    return result
  } catch(e) {
    e.action = action
    logError('__ERROR__', e)
    return e
  }
}
