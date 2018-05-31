const BASE_URL = 'http://localhost';
const PORT = '8080';
const API_URL = `${BASE_URL}:${PORT}`;

export default API_URL;
export var ACCESS_TOKEN_URL = '?access_token=' + localStorage.getItem('TOKEN');
