import superagent from 'superagent'
import {logError} from '../lib/utils'

// ACTION CREATORS
export const albumSet = albums => ({
  type: 'ALBUM_SET',
  payload: albums
})

export const albumCreate = album => ({
  type: 'ALBUM_CREATE',
  payload: album
})

export const albumUpdate = album => ({
  type: 'ALBUM_UPDATE',
  payload: album
})

export const albumDelete = album => ({
  type: 'ALBUM_DELETE',
  payload: album
})

// ASYNC ACTIONS
export const albumFetchRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/api/v1/album`)
  .then(res => dispatch(albumSet(res.body)))
  .catch(logError)
}

export const albumCreateRequest = album => (dispatch, getState) => {
  return superagent.post(`${__API_URL__}/api/v1/album`)
  .send(album)
  .then(res => dispatch(albumCreate(res.body)))
  .catch(logError)
}


