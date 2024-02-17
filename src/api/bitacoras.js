import axios from "./axios";

export const obtenerRegistros = async () => axios.get('bitacora');

export const obtenerRegistroCita = async () => axios.get('bitacoras/registroscitas');
