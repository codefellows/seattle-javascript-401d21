import React from 'react'
import {connect} from 'react-redux'
import {categoryCreate} from '../../actions/category-actions'
import CategoryForm from '../category/category-form/category-form'

class Dashboard extends React.Component {
  render() {
    return (
      <section>
        <h1>Welcome to my Kanban Board</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.dashboardCategoryCreate}/>

        {this.props.categories ?
          this.props.categories.map(cat =>
            <div key={cat._id}>
              <h3>{cat.title}</h3>
            </div>)
          :
          undefined
        }
      </section>
    )
  }
}

const mapStateToProps = state => ({
  categories: state
})

const mapDispatchToProps = (dispatch, getState) => ({
  dashboardCategoryCreate: category => dispatch(categoryCreate(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
