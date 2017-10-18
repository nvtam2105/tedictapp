import { Actions } from 'react-native-router-flux';
import Config from 'react-native-config';
import axios from 'axios';
import { TALKS_SEARCH_SUCCESS, TALKS_SEARCH_REFRESH ,TALKS_SEARCH_MORE, TALKS_FETCH_ERR } from './types';


export const talksSearch = ({ preSearch, search, limit, offset }) => {
    let url = Config.TALK_BASE_URL + `${encodeURIComponent(search)}/${limit}/${offset}`;
    console.log(preSearch === search)
    return (dispatch) => {
        return axios.get(url)
            .then((response) => {
                preSearch === search && offset !== 0 ?
                    dispatch({ type: TALKS_SEARCH_MORE, payload: response.data })
                    : dispatch({ type: TALKS_SEARCH_SUCCESS, payload: response.data })
            })
            .catch((err) => { dispatch({ type: TALKS_FETCH_ERR, payload: err }); })
    };
};