import {combineReducers} from 'redux';
import token from './auth';
import picture from './picture';

export default combineReducers({
  token,picture,
})
