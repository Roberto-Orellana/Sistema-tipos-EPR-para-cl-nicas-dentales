import axios from "./axios";

export const agendarCita = async (nuevaCita) => axios.post('citas/agendar-cita', nuevaCita);
export const listarCitas = async () => axios.get('citas/lista-cita');
export const actualizarEstadoCita = async (id, nuevoEstado) => axios.put(`citas/actualizar-estado-cita/${id}`, { nuevoEstado });
export const listarCitasCercanas = async () => axios.get('citas/listar-citas-cercanas')