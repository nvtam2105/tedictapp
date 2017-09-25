import { combineReducers } from 'redux';
import TalkReducer from './TalkReducer';

export default combineReducers({
    talks: TalkReducer
});