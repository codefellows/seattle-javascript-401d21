import React from 'react'
import {renderIf} from '../../../lib/utils'
import ExpenseUpdateForm from '../expense-update-form/expense-update-form';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item ? this.props.item : {},
      editing: false,
    }

    this.handleEditing = this.handleEditing.bind(this)
  }

  handleEditing() {
    this.setState({editing: !this.state.editing})
  }

  render() {
    return (
      <li
        className="expense-item"
        id={this.state.item._id}
        onDoubleClick={this.handleEditing}>

        <p>Name: {this.state.item.name}</p>
        <p>Price: ${this.state.item.price}</p>
        {renderIf(this.state.editing,
          <ExpenseUpdateForm
            expense={this.state.item}
            toggleEdit={this.handleEditing}
            dashboard={this.props.dashboard}/>
        )}
      </li>
    )
  }
}

export default ExpenseItem
