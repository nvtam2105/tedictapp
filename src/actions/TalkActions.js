import { Actions } from 'react-native-router-flux';
import Config from 'react-native-config';

import { 
    TALKS_FETCH_SUCCESS ,
    TALKS_FETCH_ERR
} from './types';

import axios from 'axios';

export const talksFetch = ({ limit, offset }) => {

    let url = Config.TALK_BASE_URL + `${limit}/${offset}`;
    //let url = `http://localhost:3000/talks/${limit}/${offset}`;
    console.log(url);
    return (dispatch) => {       
        return axios.get(url)
            .then((response) => {dispatch({type: TALKS_FETCH_SUCCESS, payload: response.data });})
            .catch((err) => {dispatch({ type: TALKS_FETCH_ERR, payload: err });})
    };      
};