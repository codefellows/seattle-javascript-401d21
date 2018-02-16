![cf](http://i.imgur.com/7v5ASc8.png) 31: Redux
===

## Learning Objectives
* Students will learn to use redux with react
* Students will learn to design redux reducer's for controlling application state
* Students will learn to design action creator functions for working with redux

## Readings
* Read [redux readme](http://redux.js.org/)
* Read [redux motivation](http://redux.js.org/docs/introduction/Motivation.html)
* Read [redux core concepts](http://redux.js.org/docs/introduction/CoreConcepts.html)
* Read [redux three principles](http://redux.js.org/docs/introduction/ThreePrinciples.html)
* Read [redux actions](http://redux.js.org/docs/basics/Actions.html)
* Read [redux reducers](http://redux.js.org/docs/basics/Reducers.html)
* Read [redux store](http://redux.js.org/docs/basics/Store.html)
* Read [redux usage with react](http://redux.js.org/docs/basics/UsageWithReact.html)

## Redux
Redux is a state container for javascript apps. It can be used to manage the state of any JS program, not just react apps. Redux holds the whole state of your application within a **single store**. The redux store becomes the "single source of truth" for all *application state*. Some developers go as far as to store all state (application state and view state) on the store. a Redux store is read only, much like a React component's `state` or `props`. Changes to a store are made with pure functions called reducers.

#### reducer
A redux store is created by passing a function called a **reducer** into `createStore`. a redux reducer's job is both define the state of the application and the changes that can be made to that state. Redux reducers have the function signature `(state, action) => newState`. The reducer will be called each time an **action** is _dispatched_ and what ever state it returns will be the new state of the store.

#### store
A redux store has three methods `getState`, `dispatch`, and `subscribe`

###### dispatch
Each time `dispatch` is invoked its first argument is passed into the reducers action parameter. In order to update the store you must organize your reducer in a way that enables meaningful changes based on values that are dispatched. The most common pattern for dispatching meaningful changes to reducers is by always dispatching objects that have a type and payload. The reducer can then make decisions of what to do with the payload based on the type property of the action dispatched.  

``` javascript
// example dispatch usage
store.dispatch({
  type: 'CREATE_NOTE',
  payload: {id: 'abc123', content: 'hello world'},
})
```
People often create helper functions called "action creators" that create action objects to be dispatched...  
``` javascript
// an action creator for creating notes
const createNote = (note) => ({ type: 'CREATE_NOTE', payload: note })

dispatch(createNote({id: '123456', content: 'hello again, world'}))
```

###### getState
Invoking `store.getState()` returns the current state of the store.

###### subscribe
Subscribe allows you to register change listener functions, that will be called each time the store is dispatched.
```
// log the new state after each dispatch
store.subscribe(() => {
  console.log('___STATE___', store.getState())
})
```

## React Redux
`react-redux` is the official redux bindings for react. Its a set of tools that simplify creating react component's that are able to interact with a redux store.

#### Provider
`Provider` is a react component that makes the Redux store available to `connect()` calls in the component hierarchy. You will wrap the Provider around the rest of your application.

#### connect
the `connect` function Connects a react component to the redux store added to your app's `Provider` component. connect uses `mapStateToProps` and `mapDispatchToProps` to create a higher order function used to wrap a React Component.

###### mapStateToProps
`mapStateToProps` is a function that allows you to assign the store's state or parts of the store's state to props of a component.

###### mapDispatchToProps
`mapDispatchToProps` is a function that allows you to assign methods to a component's props that have access to the store's dispatch method.
