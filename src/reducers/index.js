import { combineReducers } from 'redux';
import TalkReducer from './TalkReducer';
import ScriptReducer from './ScriptReducer';

export default combineReducers({
    talks: TalkReducer,
    script: ScriptReducer
});