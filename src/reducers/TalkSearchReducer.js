import { TALKS_SEARCH_SUCCESS, TALKS_SEARCH_MORE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TALKS_SEARCH_SUCCESS:
      return action.payload.length > 0 ? [...action.payload] : [];
    case TALKS_SEARCH_MORE:
    return action.payload.length > 0 ? [...state, ...action.payload] : state;
    default:
      return state;
  }
};