import axios from "./axios";


export const registrar = usuario => axios.post(`registro`,usuario);

export const login = usuario => axios.post(`login`,usuario);

export const salir = ()=> axios.post(`salir`);

export const verificarToken = ()=> axios.get(`verificar-token`);

