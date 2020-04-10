const API_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:5000' 
    :
    'https://corona-app-server.azurewebsites.net';

export default API_URL;