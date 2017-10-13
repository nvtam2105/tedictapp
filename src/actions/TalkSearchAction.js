import { Actions } from 'react-native-router-flux';
import Config from 'react-native-config';
 
import {
    TALKS_SEARCH_SUCCESS,
    TALKS_FETCH_ERR
} from './types';

import axios from 'axios';

export const talksSearch = ({ search, limit, offset }) => {
    let url = Config.TALK_BASE_URL + `${encodeURIComponent(search)}/${limit}/${offset}`;
    return (dispatch) => {
        return axios.get(url)
            .then((response) => { dispatch({ type: TALKS_SEARCH_SUCCESS, payload: response.data }); })
            .catch((err) => { dispatch({ type: TALKS_FETCH_ERR, payload: err }); })
    };
};