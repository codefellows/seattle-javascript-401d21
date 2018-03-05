let validateTrack = payload => {
  if(!payload._id) throw new Error('VALIDATION ERROR. Track must have an ID')
  if(!payload.name) throw new Error('VALIDATION ERROR. Track must have name')
}

export default (state={}, action) => {
  let { type, payload } = action

  switch(type) {
    case 'ALBUM_CREATE': return {...state, [payload._id]: []}
    case 'ALBUM_DELETE':
    delete state[payload._id]
    return {...state}
    case 'TRACK_GET': return payload
    case 'TRACK_CREATE':
      validateTrack(payload)
      state[payload._id] = state[payload._id].concat([payload])
      return {...state}
    case 'TRACK_UPDATE':
      validateTrack(payload)
      state[payload._id] = state[payload._id].map(track =>
        track._id === payload._id ? payload : track)
      return {...state}
    case 'TRACK_DELETE':
      validateTrack(payload)
      state[payload._id] = state[payload._id].filter(track => track._id !== payload._id)
      return {...state}
    default: return state
  }
}
