import '../../styles/proveedor.css'
import {React,  useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { eliminarProveedor } from '../../api/proveedor';
import { BsFillArrowLeftSquareFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

export const DetalleProveedores = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const editar = () => {
        navigate(`/actualizar-proveedor/${data.id}`, { state: data });
      };


      const eliminar = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proveedor?');
    
        if (confirmacion) {
            try {
                await eliminarProveedor(data.id); // Espera a que la eliminación se complete
                navigate('../proveedores');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const atras = () => {
        navigate('../proveedores')
    }

    return (
        <>



            <div className='container fluid'>
                <div className='container-flex d-flex justify-content-between'>
                    <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
                    {/* Modificar el nombre por el del proveedor */}
                    <div className='edit'>
                        <BsPencilSquare onClick={editar} className='editar mt-3' />
                        <BsFillTrashFill onClick={eliminar} className='eliminar mt-3' />
                    </div>

                </div>
                <div className='mt-5 infoProveedor'>
                    <h4>ID: {data.id}</h4>
                    <br />
                    <h4>Nombre: {data.nombre}</h4>
                    <br />
                    <h4>Número: {data.numeroTelefono}</h4>
                    <br />
                    <h4>Correo: {data.correo}</h4>
                    <br />
                    <h4>Dirección: {data.direccion}</h4>
                </div>
            </div>
        </>
    )
}