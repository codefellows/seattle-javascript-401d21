import React from 'react'
import {connect} from 'react-redux'
import {renderIf} from '../../lib/utils'
import CategoryForm from '../category/category-form/category-form'
import CategoryItem from '../category/category-item/category-item'
import {
  categoryCreate,
  categoryUpdate,
  } from '../../action/category-actions'

class Dashboard extends React.Component {
  render() {
    return (
      <section className="dashboard">
        <h1>Welcome to The Kanban!</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.categoryCreate}/>

        {renderIf(this.props.categories,
          this.props.categories.map(cat =>
            <CategoryItem
              className="category-items"
              key={cat._id}
              category={cat}></CategoryItem>)
        )}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  cards: state.cards,
})

const mapDispatchToProps = (dispatch, getState) => ({
  categoryCreate: category => dispatch(categoryCreate(category)),
  categoryUpdate: category => dispatch(categoryUpdate(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
