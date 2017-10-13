import { TALKS_SEARCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TALKS_SEARCH_SUCCESS:
      return action.payload.length > 0 ? [...action.payload] : [];
    default:
      return state;
  }
};