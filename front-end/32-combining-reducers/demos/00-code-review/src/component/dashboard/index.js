import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate, categoryDelete, categoryUpdate} from '../../action/category-actions';
import CategoryForm from '../category-form/index';
import CategoryItem from '../category-list/index';

class Dashboard extends React.Component {
  render() {
    return(
      <section>
        <h1>Expenses Categories</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.dashboardCategoryCreate}/>

        {this.props.categories ?
          this.props.categories.map(cat =>
            <CategoryItem key={cat._id}
              category={cat}
              handleDelete={this.props.dashboardCategoryDelete}
              handleUpdate={this.props.dashboardCategoryUpdate}
            />)
          :
          undefined
        }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  dashboardCategoryCreate: category => dispatch(categoryCreate(category)),
  dashboardCategoryDelete: category => dispatch(categoryDelete(category)),
  dashboardCategoryUpdate: category => dispatch(categoryUpdate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
