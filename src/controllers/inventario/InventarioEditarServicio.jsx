import React, { useState, useEffect } from 'react';
import { actualizarServicio } from '../../api/servicios';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

export const InventarioEditarServicio = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [mensaje, setMensaje] = useState("");
    const [nombreServicio, setNombreServicio] = useState(data.nombre_servicio || '');
    const [descripcion, setDescripcion] = useState(data.descripcion || '');
    const [precio, setPrecio] = useState(data.precio_unitario || '')

    const atras = () => {
        navigate('../servicios');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            nombre_servicio: nombreServicio,
            descripcion: descripcion,
            precio_unitario: precio
        };

        try {
            const response = await actualizarServicio(data.id, updatedData);
            console.log('Servicio actualizado exitosamente', response.data);
            setMensaje(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../servicios');
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
                        <h3>Editar los datos del Servicio</h3>
                    </div>
                    <div className='inputs row'>
                        <label className='form-label'>Nombre del Servicio</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Nombre del servicio'
                            value={nombreServicio}
                            onChange={(e) => setNombreServicio(e.target.value)}
                        />
                    </div>
                    <div className='inputs row'>
                        <label className='form-label'>Descripción</label>
                        <textarea
                            className='form-control'
                            placeholder='Descripción del servicio'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Precio Unitario</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Precio unitario"
                                value={precio}
                                name="precio"
                                onChange={(e) => {
                                    setPrecio(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className='inputs-btn'>
                        <button className='btn-form' type='submit'>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
