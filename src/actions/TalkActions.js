import { Actions } from 'react-native-router-flux';
import Config from 'react-native-config';

import {
    TALKS_FETCH_SUCCESS,
    TALKS_FETCH_REFRESH,
    TALKS_FETCH_ERR
} from './types';

import axios from 'axios';

export const talksFetch = ({ limit, offset }) => {
    let url = Config.TALK_BASE_URL + `${limit}/${offset}`;
    console.log(url);
    return (dispatch) => {
        return axios.get(url)
            .then((response) => {
                offset === 0 ?
                    dispatch({ type: TALKS_FETCH_REFRESH, payload: response.data })
                    : dispatch({ type: TALKS_FETCH_SUCCESS, payload: response.data });
            })
            .catch((err) => { dispatch({ type: TALKS_FETCH_ERR, payload: err }); })
    };
};