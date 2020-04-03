const API_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:5000' :
    'http://partners.infinitylabs.co.il:5000';

export default API_URL;