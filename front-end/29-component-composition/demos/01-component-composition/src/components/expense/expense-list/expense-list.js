import React from 'react'
import ExpenseItem from '../../expense/expense-item/expense-item'
import { renderIf } from '../../../lib/utils'

class ExpenseList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="expense-list">
        <ul>
          {renderIf(this.props.expenses,
            this.props.expenses.map(expense => <ExpenseItem key={expense._id} item={expense}/>)
          )}
        </ul>
      </div>
    )
  }
}

export default ExpenseList
