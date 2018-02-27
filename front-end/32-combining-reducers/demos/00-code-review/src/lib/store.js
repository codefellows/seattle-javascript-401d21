import {createStore} from 'redux';
import reducer from '../reducer/category';

export default () => createStore(reducer);