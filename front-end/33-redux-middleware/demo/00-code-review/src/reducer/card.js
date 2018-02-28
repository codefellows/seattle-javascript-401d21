let initialState = {}

export default (state=initialState, action) => {
  let {type, payload} = action

  switch(type) {
    case 'CATEGORY_CREATE': return {...state, [payload._id]: []}
    case 'CATEGORY_DELETE':
      delete state[payload.categoryId]
      return {...state}
    case 'CARD_CREATE':
      state[payload.categoryId] = state[payload.categoryId].concat([payload])
      return {...state}
    // case ...
    default: return state
  }
}
