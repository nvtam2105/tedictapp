import { Actions } from 'react-native-router-flux';
import Config from 'react-native-config';

import { 
    SCRIPT_FETCH_SUCCESS ,
    SCRIPT_FETCH_ERR
} from './types';

import axios from 'axios';

export const scriptFetch = (talkId) => {

    let url = Config.SCRIPT_BASE_URL + `${talkId}`;
    console.log(url);
    return (dispatch) => {       
        return axios.get(url)
            .then((response) => {dispatch({type: SCRIPT_FETCH_SUCCESS, payload: response.data });})
            .catch((err) => {dispatch({ type: SCRIPT_FETCH_ERR, payload: err });})
    };      
};