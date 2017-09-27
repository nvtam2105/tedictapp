import { Actions } from 'react-native-router-flux';
import { 
    TALKS_FETCH_SUCCESS ,
    TALKS_FETCH_ERR
} from './types';

import axios from 'axios';

export const talksFetch = ({ limit, offset }) => {
    return (dispatch) => {
        let url = `http://localhost:3000/talks/${limit}/${offset}`;
        console.log('url=' + url);
        return axios.get(url)
            .then(response => {
                dispatch({type: TALKS_FETCH_SUCCESS, payload: response.data });
            })
            .catch(err => {
                dispatch({ type: TALKS_FETCH_ERR, payload: err });
            })
    }       
};