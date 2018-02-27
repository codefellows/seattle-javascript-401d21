import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.category
      ? this.props.category
      : {
        title: '',
        budget: '',
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    console.log(this.props);
    e.preventDefault();

    this.props.onComplete(this.state);
    this.setState({title: '', budget: ''})
    if(this.props.buttonText === 'update') this.props.toggleEdit();

  }

  render() {
    return (
      <form className='category-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='title'
          value={this.state.title}
          onChange={this.handleChange}/>
        <input
          type='number'
          name='budget'
          value={this.state.budget}
          onChange={this.handleChange} />

        <button type='submit'>{this.props.buttonText}</button>
      </form>

    );
  }
}

export default CategoryForm;
