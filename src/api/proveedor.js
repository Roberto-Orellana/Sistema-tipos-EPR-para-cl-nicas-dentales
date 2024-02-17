import axios from "./axios";

export const listaProveedor = async ()  => axios.get(`proveedor/lista-proveedores`);

export const eliminarProveedor = async (idProveedor) => axios.delete(`proveedor/eliminar-proveedor/${idProveedor}`);

export const agregarProveedor = async (nuevoProveedorData) => axios.post(`proveedor/agregar-proveedor`, nuevoProveedorData);

export const actualizarProveedor = async (idProveedor, datosActualizados) => axios.put(`proveedor/actualizar-proveedor/${idProveedor}`, datosActualizados);