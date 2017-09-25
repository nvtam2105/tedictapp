const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_TALKS':
      return action.playload;
    default:
      return state;
  }
};
