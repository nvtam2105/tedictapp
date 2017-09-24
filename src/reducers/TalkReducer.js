import axios from 'axios';

export default () => {
    return axios.get('http://localhost:3000/talks')
        .then(response => response.data);
};
