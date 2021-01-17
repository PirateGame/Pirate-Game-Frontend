import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: 'http://pirategame.uk/api/',
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        }
    });
}