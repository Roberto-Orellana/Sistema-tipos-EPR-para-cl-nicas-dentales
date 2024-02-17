import axios from "axios";


const API_URL = 'http://localhost:3000';
// const API_URL = 'https://proeyctodeindustria.xyz';

//Confg de axios para que establesca las cookies en este dominio
const confgAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default confgAxios;