import axios from 'axios';
import API_URL, { ACCESS_TOKEN_URL }  from './ApiConfig';

export function getLanguages() {
  return axios({
    method: 'GET',
    url: `${API_URL}` + '/languages' + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function getLanguage(id) {
  return axios({
    method: 'GET',
    url: `${API_URL}` + '/language/' + id + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function createLanguage(data) {
  return axios({
    method: 'POST',
    url: `${API_URL}` + '/language/',
    data: data
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}
