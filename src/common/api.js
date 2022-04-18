import axios from "axios";
export default axios.create({
  baseURL: "http://sfpm.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    'Authorization':  localStorage.getItem('token') === '' ? '' : 'token '+ localStorage.getItem('token')
  },
});

// export const url='http://sfpm.herokuapp.com/api'
