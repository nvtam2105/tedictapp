import { combineReducers } from 'redux';
import TalkReducer from './TalkReducer';
import TalkSearchReducer from './TalkSearchReducer';
import ScriptReducer from './ScriptReducer';

export default combineReducers({
    talks: TalkReducer,
    talksSearch: TalkSearchReducer,
    script: ScriptReducer
});