import React from 'react';

class ExpenseForm extends React.Component{
  constructor(props){
    super(props);// Vinicio - we HAVE to call this super()
    this.state = {
      name : '',
      price : 0,
    };
    //----------------------------------------------------
    // Binding Handlers
    //----------------------------------------------------
    let memberFunctions = Object.getOwnPropertyNames(ExpenseForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
    //----------------------------------------------------
  }
  //------------------------------------------------------
  // Member Function
  //------------------------------------------------------
  handleSubmit(event){
    event.preventDefault();
    this.props.handleAddExpense(this.state);
    // vinicio - clearing the form
    this.setState({
      name : '',
      price : 0,
    });
  }

  handleChange(event){
    let {name,value} = event.target;
    // vinicio - name will be the name of the input we are working with

    this.setState({
      [name]: value,
    });
  }

  //------------------------------------------------------
  // Lifecycle hooks
  //------------------------------------------------------
  render(){
    return(
      <form className='expense-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleChange}  
        />
        <input
          type='number'
          name='price'
          placeholder='price'
          value={this.state.price}
          onChange={this.handleChange}  
        />
        <button type='submit'> create expense </button>
      </form>
    );
  }
};

export default ExpenseForm;