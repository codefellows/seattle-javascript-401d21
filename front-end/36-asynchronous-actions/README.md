![cf](http://i.imgur.com/7v5ASc8.png) 36: Asynchronous Actions
===

## Daily Plan
- Notes:
    - Anything top of mind?
    - What's happening this week; Topics, Schedule, etc...

- Code Review
- Redux Thunk Middleware
- Working with asynchronous actions (functions)
- Lab Preview


## Learning Objectives
* Students will be able to create thunk middleware for redux
* Students will be able to create asynchronous actions

## Readings
* [Async Actions](https://redux.js.org/advanced/async-actions#async-action-creators)

## Redux Thunk
Redux thunk middleware allows you to dispatch function actions as well as function actions. Function actions will have access to `dispatch`, and `getState`. Function actions can trigger async events and dispatch new actions when they are completed. This is often used to make AJAX requests to the a HTTP server.
