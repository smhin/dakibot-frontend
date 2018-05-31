import axios from 'axios';
import API_URL, { ACCESS_TOKEN_URL }  from './ApiConfig';

export function getIntents(projectId, userId) {
  return axios({
    method: 'GET',
    url: `${API_URL}/api/project/` + projectId + '/user/' + userId + '/intents' + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}


export function addIntentToContext(projectId, contextId, userId, data) {
  return axios({
    method: 'PUT',
    url: `${API_URL}/api/project/` + projectId + '/context/' + contextId + '/user/' + userId + '/intent' + `${ACCESS_TOKEN_URL}`,
    data: data
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}
