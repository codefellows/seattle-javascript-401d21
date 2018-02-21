// import './styles/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'https://pokeapi.co/api/v2'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({val: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    // console.log(this.props.get_set_app)
    this.props.update_state(this.state.val)
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="pokemon-name"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="Bulbasaur"/>

        <button type="submit">Search</button>

        {/* <Navbar get_set_app={this.props.get_set_app}/> */}
      </form>
    )
  }
}


class Results extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="results">
        {this.props.pokemon ?
          <section className="pokemon-data">
            {console.log(this.props.pokemon)}
            <h2>{this.props.pokemon.name}</h2>
            <img
              src={this.props.pokemon.sprites.front_default}
              alt={this.props.pokemon.name}/>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="pokemon-error">
            <h2>You broke it.</h2>
          </section>
          :
          undefined
        }
      </div>
    )
  }
}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: null,
      searchError: null,
    }
    this.searchApi = this.searchApi.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  updateState(name) {
    this.searchApi(name)
    .then(res => this.setState({pokemon: res.body, searchError: null}))
    .catch(err => this.setState({pokemon: null, searchError: err}))
  }

  searchApi(name) {
    return superagent.get(`${API_URL}/pokemon/${name}`)
  }

  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState}/>
        <Results pokemon={this.state.pokemon} error={this.state.searchError}/>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
