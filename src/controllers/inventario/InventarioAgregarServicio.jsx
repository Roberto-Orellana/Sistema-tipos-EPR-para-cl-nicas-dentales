import React, { useState, useEffect } from "react";
import { agregarServicio } from "../../api/servicios"; // Importa la función para agregar servicios si ya la tienes definida
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import './Inventario.css'

export const InventarioAgregarServicio = () => {

    const navigate = useNavigate();

    const atras = () => {
        navigate('../servicios')
    }

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('')
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../servicios');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realizar validaciones si es necesario
        const nuevoServicio = {
            nombre_servicio: nombre,
            descripcion: descripcion,
            precio_unitario: precio
        }


        // Llama a la función para agregar servicio enviando los datos
        agregarServicio(nuevoServicio)
            .then((response) => {
                console.log(response.data)
                setMensaje(response.data);
                setNombre("");
                setDescripcion("");
            })
            .catch((error) => {
                console.error(error);
                // Manejo de errores si la inserción falla
            })
    };

    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <BsFillArrowLeftSquareFill onClick={atras} className="atras mt-3" />
            </div>
            <div className="inventario-container border col shadow p-4 mb-4">

                <form onSubmit={handleSubmit}>
                    {mensaje && (<p className="alert alert-success text-center">{mensaje.message}</p>)}
                    <div className=" border rounded titulo mb-3 text-center" >
                        <h2>Agregar Nuevo Servicio</h2>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Nombre del Servicio:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label className="form-label">Descripción:</label>
                                <textarea
                                    className="form-control"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                />

                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label className="form-label">Precio Unitario</label>
                                <input
                                    className="form-control"
                                    type="numeric"
                                    placeholder="Precio unitario"
                                    value={precio}
                                    name="precio"
                                    onChange={(e) => {
                                        setPrecio(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='btn-Paciente d-grid col-3  mx-auto' type="submit">Agregar Servicio</button>
                    </div>
                </form>
            </div>
        </>
    );
};
