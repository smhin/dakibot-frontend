import axios from 'axios';
import API_URL, { ACCESS_TOKEN_URL }  from './ApiConfig';

export function getUser(userId) {
  return axios({
    method: 'GET',
    url: `${API_URL}/api/user/` + userId + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function createUser(data) {
  return axios({
    method: 'POST',
    url: `${API_URL}/user`,
    data: data
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}
