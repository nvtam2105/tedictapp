import { TALKS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TALKS_FETCH_SUCCESS:
      return action.payload.length > 0 ? [ ...state, ...action.payload ] : state;
    default:
      return state;
  }
};