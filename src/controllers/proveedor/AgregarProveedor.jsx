import '../../styles/proveedor.css'
import React, { useState, useEffect } from 'react';
import { agregarProveedor } from '../../api/proveedor';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const AgregarProveedor = () => {
    const navigate = useNavigate();
    const volver = () => {
        navigate('../proveedores')
    }

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [nombreError, setNombreError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [correoError, setCorreoError] = useState('');
    const [direccionError, setDireccionError] = useState('');


    const validateForm = () => {
        const nombrePattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Acepta solo letras y espacios
        const telefonoPattern = /^\d+$/; // Acepta solo números
        const correoPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/; // Valida el formato de correo electrónico

        const nombreValid = nombre.match(nombrePattern);
        const telefonoValid = telefono.match(telefonoPattern);
        const correoValid = correo.match(correoPattern);

        setNombreError(nombreValid ? '' : '(Ingrese un nombre válido (solo letras y espacios))');
        setTelefonoError(telefonoValid ? '' : '(Ingrese un número de teléfono válido (solo números)');
        setCorreoError(correoValid ? '' : '(Ingrese un correo electrónico válido)');
        setDireccionError(direccion !== '' ? '' : '(Ingrese la dirección)');

        setFormValid(nombreValid && telefonoValid && correoValid && direccion !== '');

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValid) {
            const nuevoProveedorData = {
                nombre: nombre,
                numeroTelefono: telefono,
                correo: correo,
                direccion: direccion,
            };

            agregarProveedor(nuevoProveedorData)
                .then((response) => {
                    console.log('Proveedor agregado exitosamente', response.data);
                    setMensaje(response.data);
                    setNombre('');
                    setTelefono('');
                    setCorreo('');
                    setDireccion('');
                })
                .catch((error) => {
                    console.error('Error al agregar el proveedor', error);
                });
        } else {
            console.error('El formulario no es válido. Por favor, revisa los campos.');
        }
    };

    return (
        <div>
            <div className='proveedores-container-form'>
                <div className='container- flex justify-content-between'>
                    <div className='container-fluid'  >
                        <BsFillArrowLeftSquareFill onClick={volver} className='atras mt-3' />
                    </div>
                    <form className='addForm border rounded' onSubmit={handleSubmit}>
                        {mensaje && (<p className="alert alert-success text-center">{mensaje.message}</p>)}
                        <div>
                            <div className='inputs row'>
                                <h3>Ingrese los datos del Proveedor</h3>
                            </div>
                            <div className='inputs row'>
                                <label className='form-label'>Nombre Completo</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Nombre de proveedor'
                                    value={nombre}
                                    name='nombre'
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                        validateForm();
                                    }}
                                />
                                <p className='error-message'>{nombreError}</p>
                            </div>
                            <div className='inputs row'>
                                <label className='form-label'>Telefono <small>(Ej: 99052489)</small></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Numero de Telefono'
                                    value={telefono}
                                    name='telefono'
                                    onChange={(e) => {
                                        setTelefono(e.target.value);
                                        validateForm();
                                    }}
                                />
                                <p className='error-message'>{telefonoError}</p>
                            </div>
                            <div className='inputs row'>
                                <label className='form-label'>Correo  <small>(Ej: NombreEmail@email.com)</small></label>
                                <input
                                    className='form-control'
                                    type='email'
                                    placeholder='Correo Electrónico'
                                    value={correo}
                                    name='correo'
                                    onChange={(e) => {
                                        setCorreo(e.target.value);
                                        validateForm();
                                    }}
                                />
                                <p className='error-message'>{correoError}</p>
                            </div>
                            <div className='inputs row'>
                                <label className='form-label'>Direccion</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='Direccion de la empresa'
                                    value={direccion}
                                    name='direccion'
                                    onChange={(e) => {
                                        setDireccion(e.target.value);
                                        validateForm();
                                    }}
                                />
                                <p className='error-message'>{direccionError}</p>
                            </div>
                            <div className='inputs-btn'>
                                <button className='btn-form' type='submit' disabled={!formValid}>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
