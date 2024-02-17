import axios from "./axios";

export const listaProductos = async () => axios.get('productos/lista-productos');

export const agregarProducto = async (nuevoProducto) => axios.post(`productos/agregar-producto`,nuevoProducto);

export const eliminarProducto = async (idProducto) => axios.delete(`productos/eliminar-producto/${idProducto}`);

export const cantidadMinProd = async () => axios.get('productos/cantidades-productos');

export const actualizarProd = async (idProducto,datosActualizar) => axios.put(`productos/actualizar-producto/${idProducto}`,datosActualizar);