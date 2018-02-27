import React from 'react'

class CategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.category ? props.category.title : '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(Object.assign({}, this.state))
    this.setState({title: ''})
  }

  render() {
    return (
      <form className="category-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}/>
        <button type="submit">{this.props.buttonText}</button>
      </form>
    )
  }
}

export default CategoryForm
