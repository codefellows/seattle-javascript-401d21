export default store => next => action => {
  try {
    return next(action);
  } catch (exception) {
    // Vinicio - check sentry.io
    throw exception;
    // Vinicio - think twice before returning an action on an error state
    //return action;
  }
};

