const API_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:5555' 
    :
    'http://ec2-52-38-96-220.us-west-2.compute.amazonaws.com:5000';

export default API_URL;