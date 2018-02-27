import React from 'react'
import {Provider} from 'react-redux'
import createAppStore from '../lib/store'
import Dashboard from './dashboard/dashboard'
import {BrowserRouter, Route} from 'react-router-dom'

const store = createAppStore()

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => console.log('__STATE__: ', store.getState()))
    store.dispatch({type: null})
  }

  render() {
    return (
      <main className="application">
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path='/' component={Dashboard}/>
          </BrowserRouter>
        </Provider>
      </main>
    )
  }
}

export default App
