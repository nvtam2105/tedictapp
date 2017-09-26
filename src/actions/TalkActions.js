import { Actions } from 'react-native-router-flux';
import { 
    TALKS_FETCH_SUCCESS ,
    TALKS_FETCH_ERR
} from './types';

import axios from 'axios';

export const talksFetch = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3000/talks')
            .then(response => {
                dispatch({type: TALKS_FETCH_SUCCESS, payload: response.data });
            })
            .catch(err => {
                dispatch({ type: TALKS_FETCH_ERR, payload: err });
            })
    }       
};