import React from 'react';
import CategoryForm from '../category-form/index';
import {connect} from 'react-redux';
import {categoryUpdate, categoryDelete} from '../../action/category-actions';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };

    this.handleEditing = this.handleEditing.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleEditing() {
    this.setState({editing: !this.state.editing});
  }

  handleDelete() {
    this.props.handleDelete(this.state.category);
  }

  render() {
    return (
      <li className='category-item'

        onDoubleClick={this.handleEditing}>
        <p>{this.props.category.title}</p>
        <p>{this.props.category.budget}</p>
        <button onClick={this.handleDelete}>Delete</button>
        {this.state.editing ?
          <CategoryForm
            buttonText='update'
            onComplete={this.props.handleUpdate}
            category={this.props.category}
            toggleEdit={this.handleEditing}
          />
          : undefined
        }
      </li>
    );
  }
}



export default CategoryItem;
