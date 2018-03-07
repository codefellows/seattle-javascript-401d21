let reporter = store => next => action => {
  console.log('__ACTION__', action)

  try {
    let result = next(action)
    console.log('__STATE__', store.getState())
    return result
  } catch(e) {
    e.action = action
    console.error('__ERROR__', e)
    return e
  }
}

export default reporter