import { TALKS_FETCH_SUCCESS, TALKS_FETCH_REFRESH } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TALKS_FETCH_SUCCESS:
      return action.payload.length > 0 ? [...state, ...action.payload] : state;
    case TALKS_FETCH_REFRESH:
      return action.payload;
    default:
      return state;
  }
};