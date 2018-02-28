import cardReducer from './card'
import {combineReducers} from 'redux'
import categoryReducer from './category'

export default combineReducers({
  cards: cardReducer,
  categories: categoryReducer,
})
