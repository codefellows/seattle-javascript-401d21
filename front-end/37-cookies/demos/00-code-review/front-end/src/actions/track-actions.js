import superagent from 'superagent'
import { logError } from '../lib/utils'

export const trackSet = tracks => ({
  type: 'TRACK_SET',
  payload: tracks
})

export const trackCreate = track => ({
  type: 'TRACK_CREATE',
  payload: track
})

export const trackUpdate = track => ({
  type: 'TRACK_UPDATE',
  payload: track
})

export const trackDelete = track => ({
  type: 'TRACK_DELETE',
  payload: track
})

export const trackFetchRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/api/v1/track`)
  .then(res => dispatch(trackSet(res.body)))
  .catch(logError)
}

export const trackCreateRequest = track => dispatch => {
  return superagent.post(`${__API_URL__}/api/v1/track`)
  .send(track)
  .then(res => dispatch(trackCreate(res.body)))
  .catch(logError)
}

export const trackUpdateRequest = track => dispatch => {
  return superagent.put(`${__API_URL__}/api/v1/track/${track._id}`)
  .send(track)
  .then(() => dispatch(trackUpdate(track)))
  .catch(logError)
}

export const trackDeleteRequest = track => dispatch => {
  return superagent.delete(`${__API_URL__}/api/v1/track/${track._id}`)
  .then(() => dispatch(trackDelete(track)))
  .catch(logError)
}
