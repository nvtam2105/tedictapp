const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TALKS_FETCH':
      return action.payload;
    default:
      return state;
  }
};
