const API_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:5000' :
    'http://ec2-34-219-150-204.us-west-2.compute.amazonaws.com:5000/';

export default API_URL;