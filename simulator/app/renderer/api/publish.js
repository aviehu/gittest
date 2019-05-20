import axios from 'axios';

export default async function publish(url, payload) {
  return axios.post(
    url + (Array.isArray(payload.data) ? '/bulk' : '/publish'),
    payload);
}
