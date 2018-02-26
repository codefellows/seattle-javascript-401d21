import {createStore} from 'redux'
import reducer from '../reducers/category'

export default () => createStore(reducer)
