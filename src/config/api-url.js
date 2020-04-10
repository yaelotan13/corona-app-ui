const API_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:5555' 
    :
    'https://corona-app-server.azurewebsites.net';

export default API_URL;