import cardReducer from './card'
import categoryReducer from './category'
import { combineReducers } from 'redux'

export default combineReducers({
  cards: cardReducer,
  categories: categoryReducer,
})
