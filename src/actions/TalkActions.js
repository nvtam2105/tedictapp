import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export const talksFetch = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3000/talks')
            .then(response => {
                //console.log(response.data);
                 dispatch({ type:'FETCH_TALKS', payload: response.data });
                })
            .catch(err => {
                 dispatch({type:'FETCH_TALKS',payload: err})
            })
    }       
};