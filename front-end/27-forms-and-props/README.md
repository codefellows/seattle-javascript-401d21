![cf](http://i.imgur.com/7v5ASc8.png) 27: Forms and Props
===

## Learning Objectives
* Students will learn to test react components using jest and enzyme
* Students will learn to manage controlled inputs
* Students will learn to pass data from parent to child through props

## Readings
* Read [Components and Props](https://facebook.github.io/react/docs/components-and-props.html)
* Read [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)
* Read [Handling Events](https://facebook.github.io/react/docs/handling-events.html)
* Read [Forms](https://facebook.github.io/react/docs/forms.html)

## Forms and Inputs
React form elements maintain internal state. Think of React inputs as stateful child components. This means that we must manage the state of inputs through our own stateful  component and one way data binding. We create a parent component I'll refer to as a _form-container_ that manages the state for all child components of the form, passing any necessary state down into inputs through props. Each input has an `onChange` event that we can handle and use to update our _form-container's_ state each time the user interacts with an input.

## Props
Components accept arbitrary inputs called "props". In jsx props are passed into a component with a syntax that looks like html attributes. `props` is the name of the object passed into a component consturctor, any prop added to a component in the jsx will be accessible as a property on `props`. After `props` is passed into the constructor's `super` they are available on the context by using `this.props`. **`props` are READ ONLY**

``` javascript
// props is the argument passed to the constructor
// props can be accessed on `this` after being passed into super
class Foo extends React.Component {
  constructor(props){
    super(props)
    console.log('title', props.title)
    console.log('content', props.content)
  }
  render(){
    return (
      <div>
        <h1> {this.props.title} </h1>
        <p> {this.props.content} </p>
      </div>
    )
  }
}

// adding props to a component
<Foo title='some literal value value' content={this.state.article.content}>
```

## One Way Data flow
State can only be passed from parent to child through props. This enforces the idea of one way data flow. One way data flow is the way to describe that state can only be passed down the component tree (not up). If a child wants to pass some data to its parent, the parent can pass a function to the child through props and the child may invoke that function and pass it data for the parent to manage.
