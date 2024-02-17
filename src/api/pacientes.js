import axios from "./axios";

export const listaPaciente = async () => axios.get(`paciente/lista-pacientes`);

export const agregarPaciente = async (nuevoPaciente) => axios.post('paciente/agregar-paciente',nuevoPaciente);

export const contarPaciente = async () => axios.get('paciente/cantidad-pacientes');

export const eliminarPaciente = (idPaciente) => axios.delete(`paciente/eliminar-paciente/${idPaciente}`);

export const editarPaciente = async (idPaciente, datosActualizar) => axios.put(`paciente/actualizar-paciente/${idPaciente}`,datosActualizar);