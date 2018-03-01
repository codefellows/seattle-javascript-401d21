let initialState = {
  // 'uncategorized': [] // maybe we want to force any cards to this key when we delete a category?
}

// {
//   'id1234': [],
//   'id456': [],
// }

export default (state=initialState, action) => {
  let {type, payload} = action

  switch(type) {
    case 'CATEGORY_CREATE':
      if(payload.title === '')
        throw new Error('Category can not be empty');
      return {...state, [payload._id]: []}
    case 'CATEGORY_DELETE':
      let changedState = {...state}
      delete changedState[payload._id]
      return changedState
    case 'CARD_CREATE': return // you do the thing
    case 'CARD_UPDATE': return // you do the thing
    case 'CARD_DELETE': return // you do the thing
    case 'CARD_RESET': return initialState
    default: return state
  }
}
