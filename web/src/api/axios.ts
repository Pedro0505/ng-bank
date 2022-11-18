import axios from 'axios';

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API,
});

export default myAxios;
