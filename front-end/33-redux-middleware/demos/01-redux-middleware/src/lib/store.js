import {createStore,applyMiddleware} from 'redux'
import reducer from '../reducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxReporter from '../middleware/redux-reporter'
import crashReporter from '../middleware/crash-reporter'
import reduxSession from '../middleware/redux-session-middleware'

export default () => createStore(reducer,composeWithDevTools(
  // Vinicio : The middleware will be executed in this exact order
  applyMiddleware(reduxReporter,crashReporter,reduxSession)
));

// Vinicio - A version without compose with dev tools
// export default () => createStore(reducer, applyMiddleware(reduxReporter));
