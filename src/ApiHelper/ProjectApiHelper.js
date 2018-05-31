import axios from 'axios';
import API_URL, { ACCESS_TOKEN_URL }  from './ApiConfig';

export function getProjectsByUser(userId) {
  return axios({
    method: 'GET',
    url: `${API_URL}/api/user/` + userId + '/projects' + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function getProject(projectId, userId) {
  return axios({
    method: 'GET',
    url: `${API_URL}/api/project/` + projectId + '/user/' + userId + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function createProject(userId, data) {
  return axios({
    method: 'PUT',
    url: `${API_URL}/api/user/` + userId + '/addProject' + `${ACCESS_TOKEN_URL}`,
    data: data
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function addContextToProject(projectId, userId, data) {
  return axios({
    method: 'PUT',
    url: `${API_URL}/api/project/` + projectId + '/user/' + userId + '/context' + `${ACCESS_TOKEN_URL}`,
    data: data
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}

export function getContexts(projectId) {
  return axios({
    method: 'GET',
    url: `${API_URL}/api/project/` + projectId + '/contexts' + `${ACCESS_TOKEN_URL}`
  }).then(function(response){
    console.log(response);
    return response.data;
  });
}
