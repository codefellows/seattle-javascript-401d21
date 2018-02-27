import React from 'react'
import {connect} from 'react-redux'
import {renderIf} from '../../lib/utils'
import {categoryCreate} from '../../action/category-actions'
import CategoryForm from '../category/category-form/category-form'

class Dashboard extends React.Component {
  render() {
    return (
      <section>
        <h1>Welcome to The Kanban!</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.categoryCreate}/>

        {renderIf(this.props.categories,
          this.props.categories.map(cat =>
            <div className="category-item" key={cat._id}><h3>{cat.title}</h3></div>)
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
