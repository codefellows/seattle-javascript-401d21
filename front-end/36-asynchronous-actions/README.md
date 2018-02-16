![cf](http://i.imgur.com/7v5ASc8.png) 36: Asynchronous Actions
===

## Learning Objectives
* Students will be able to create thunk middleware for redux
* Students will be able to create asynchronous actions

## Readings
* [Async Actions](http://redux.js.org/docs/advanced/AsyncActions.html)

## Redux Thunk
Redux thunk middleware allows you to dispatch function actions as well as function actions. Function actions will have access to `dispatch`, and `getState`. Function actions can trigger async events and dispatch new actions when they are completed. This is often used to make AJAX requests to the a HTTP server.
