export default (state=null, action) => {
  let {type, payload} = action

  switch(type) {
    case 'TOKEN_SET': return payload
    case 'TOKEN_DELETE': return null
    default: return state
  }
}
