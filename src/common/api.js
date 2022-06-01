// export const COMMON_URL='http://127.0.0.1:8000/api'
// export const COMMON_URL = 'http://10.5.216.116:9000/api';
import axios from "axios";
export default axios.create({
  baseURL: "http://10.5.241.227:9000/api",
  // baseURL: "http://sfpm.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    'Authorization':  localStorage.getItem('token') === '' ? '' : 'token '+ localStorage.getItem('token')
  },
});
export const COMMON_URL='http://10.5.241.227:9000/api'
// export const  COMMON_URL=  'http://sfpm.herokuapp.com/api';
