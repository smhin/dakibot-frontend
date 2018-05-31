import axios from 'axios';
import API_URL, { ACCESS_TOKEN_URL }  from './ApiConfig';

const AuthAPIRoute = 'http://localhost:8080/oauth/token';


export function login(data) {
  return axios({
    method: 'POST',
    url: AuthAPIRoute + "?grant_type=password&username=" + data.username + "&password=" + data.password,
    auth:
      {
        username: 'my-trusted-client',
        password: 'secret'
      }
  }).then(function(response){
    console.log(response);
    localStorage.setItem('TOKEN' , response.data.access_token);
    return axios({
      method: 'GET',
      url: `${API_URL}/api/user/username/` + data.username + '/password/' + data.password + '?access_token=' + response.data.access_token
    }).then(function(response){
      console.log(response);
      return response.data;
    })
  });
}
