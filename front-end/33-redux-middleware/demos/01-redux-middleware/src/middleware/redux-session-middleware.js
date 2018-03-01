export default store => next => action => {
  let result = next(action);
  let state = store.getState();

  for(let key in state){
    // vinicio - avoid storing anything important in local storage
    localStorage[key] = JSON.stringify(state[key]);
  }
  return result;
};