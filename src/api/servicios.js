import axios from "./axios";

export const listaServicios = async () => axios.get('servicios/lista-servicios');

export const agregarServicio = async (nuevoServicio) => axios.post(`servicios/agregar-servicio`, nuevoServicio);

export const eliminarServicio = async (idServicio) => axios.delete(`servicios/eliminar-servicio/${idServicio}`);

export const actualizarServicio = async (idServicio, datosActualizar) => axios.put(`servicios/actualizar-servicio/${idServicio}`, datosActualizar);