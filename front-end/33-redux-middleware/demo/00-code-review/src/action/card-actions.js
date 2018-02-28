import uuid from 'uuid/v4'

export const cardCreate = card => {
  card._id = uuid()
  card.timestamp = new Date()
  return {
    type: 'CARD_CREATE',
    payload: card,
  }
}

export const cardUpdate = card => ({
  type: 'CARD_UPDATE',
  payload: card,
})

export const cardDelete = card => ({
  type: 'CARD_DELETE',
  payload: card,
})

export const cardReset = () => ({type: 'CARD_RESET'})
