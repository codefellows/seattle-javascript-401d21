import React from 'react'
import {Provider} from 'react-redux'
import createStore from '../lib/store'
import Dashboard from './dashboard/dashboard'
import {BrowserRouter, Route} from 'react-router-dom'

const store = createStore()

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => console.log('__STATE__:', store.getState()))
  }

  render() {
    return (
      <main className="main-content">
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path="/" component={Dashboard}/>
          </BrowserRouter>
        </Provider>
      </main>
    )
  }
}

export default App
