import React from 'react'

export default class AlbumForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      album: this.props.album
        ? this.props.album
        : {name: ''},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let {name, value} = e.target
    this.setState(({
      album: {
        [name]: value
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(this.state.album)
    Object.keys(this.state.album).map(key => this.setState({[key]: ''}))
  }

  render() {
    return (
      <form className="album-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Zepplin #4"
          value={this.state.album.name}
          onChange={this.handleChange}/>

        <button type="submit">{this.props.buttonText}</button>
      </form>
    )
  }
}
