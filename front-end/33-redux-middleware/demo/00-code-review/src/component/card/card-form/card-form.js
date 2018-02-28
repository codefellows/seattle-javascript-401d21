import React from 'react'

class CardForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.props.card
      ? this.props.card
      : {
        categoryId: this.props.categoryId,
        title: '',
      }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState({title: ''})
  }

  render() {
    return (
      <form className="card-from" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="do a thing"
          value={this.state.title}
          onChange={this.handleChange}/>

        <button type="submit">{this.props.buttonText}</button>
      </form>
    )
  }
}

export default CardForm
