import axios from 'axios';

const baseUrl = 'https://itc-bootcamp-19-dot-charcha-dev.appspot.com/';
const apiPath = 'tweet';

export function getMessages() {
    return axios.get(baseUrl + apiPath);
}

export function postMessage(payload) {
    return axios.post(baseUrl + apiPath, {tweet: payload});
}