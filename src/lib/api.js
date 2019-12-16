import axios from 'axios';

const baseUrl = 'https://itc-bootcamp-19.appspot.com';
const apiPath = ' /tweet';

export function getMessages() {
    return axios.get(baseUrl + apiPath);
}

export function postMessage(payload) {
    return axios.post(baseUrl + apiPath, payload);
}