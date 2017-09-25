import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export const talksFetch = () => {
    return (dispatch) => {
        dispatch({ type: 'TALKS_FETCH', payload: axios.get('https://api.ted.com/v1/talks.json?api-key=2a9uggd876y5qua7ydghfzrq').then(response => response.data) });
    };
};