import React from 'react'

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.item ? this.props.item : {}
  }

  render() {
    return (
      <li className="expense-item" id={this.state._id}>
        <p>Name: {this.state.name}</p>
        <p>Price: ${this.state.price}</p>
      </li>
    )
  }
}

export default ExpenseItem
