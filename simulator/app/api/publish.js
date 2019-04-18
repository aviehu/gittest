import axios from 'axios';

export default function publish(url, payload) {
  return axios
    .post(url, payload)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.error(error);
    });
}
