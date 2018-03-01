// curried functions
export default store => next => action => {
  // Vinicio - (store,next,action)
  console.group(action.type || 'Initial State');
  console.info('DISPATCHING',action);

  // Vinicio - making sure to execute the next function
  let result = next(action);
  console.log('__NEXT_STATE__',store.getState());
  // Vinicio - Connect to Sentry.io

  console.groupEnd(action.type || 'Initial State');
  // Vinicio - making sure to close the chain
  return result;
};

// Vinicio - this is what's happenig behind the scenes
// export default store => {
//   return next => {
//     return action => {
//     };
//   };
// };

