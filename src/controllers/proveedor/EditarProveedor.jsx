import React, { useState, useEffect } from 'react';
import { actualizarProveedor } from '../../api/proveedor';
import { useNavigate, useLocation } from 'react-router-dom'
import '../../styles/proveedor.css'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
export const EditarProveedor = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;


    const [nombre, setNombre] = useState(data.nombre || ''); // Initialize with the provided data or an empty string
    const [numeroTelefono, setNumeroTelefono] = useState(data.numeroTelefono || '');
    const [correo, setCorreo] = useState(data.correo || '');
    const [direccion, setDireccion] = useState(data.direccion || '');
    const [mensaje, setMensaje] = useState("");

    const atras = () => {
        navigate('../proveedores')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            nombre,
            numeroTelefono,
            correo,
            direccion,
        };
        try {
            const response = await actualizarProveedor(data.id, updatedData);
            console.log('proveedor actualizado exitosamente', response.data);
            setMensaje(response.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../proveedores');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    return (
        <>
            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
            </div>
            <form className='addForm border rounded' onSubmit={handleSubmit}>
                {mensaje && (<p className="alert alert-success text-center">{mensaje.message}</p>)}
                <div>
                    <div className='inputs row'>
                        <h3>Editar los datos del Proveedor</h3>
                    </div>
                    <div className='inputs row'>
                        <label className='form-label'>Nombre</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Nombre de proveedor"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className='inputs row'>
                        <label className='form-label'>Telefono</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Numero de Telefono"
                            value={numeroTelefono}
                            onChange={(e) => setNumeroTelefono(e.target.value)}
                        />
                    </div>
                    <div className='inputs row'>
                        <label className='form-label'>Correo</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Correo Electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className='inputs row'>
                        <label className='form-label'>Direccion</label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Direccion de la empresa"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </div>
                    <div className='inputs-btn'>
                        <button className='btn-form' type="submit">Guardar Cambios</button>
                    </div>
                </div>
            </form>
        </>
    );
};
