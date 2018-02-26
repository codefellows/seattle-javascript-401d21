import React from 'react'

class ExpenseUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.expense
      ? this.props.expense
      : {
        _id: '',
        name: '',
        price: 0,
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dashboard.setState(prevState => {
      expenses: prevState.expenses.map(expense => {
        if(expense._id === this.state._id) {
          console.log('made it')
          return this.state
        }
        return expense
      })
    })
    // this.props.dashboard.setState(prevState => {
    //   expenses: prevState.expenses.map(expense =>
    //     expense._id === this.state._id ? this.state : expense)
    // })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <form
        className="expense-update-form"
        onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}/>

        <input
          type="number"
          name="price"
          value={this.state.price}
          onChange={this.handleChange}/>

        <button type="submit">update</button>
        <button type="button" onClick={this.props.toggleEdit}>cancel</button>
      </form>
    )
  }
}

export default ExpenseUpdateForm
