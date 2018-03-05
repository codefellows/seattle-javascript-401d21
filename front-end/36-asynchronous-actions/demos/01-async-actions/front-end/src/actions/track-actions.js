import superagent from 'superagent'
import { logError } from '../lib/utils'

export const trackGet = tracks => ({
  type: 'TRACK_GET',
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


