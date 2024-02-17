import React, { useState, useEffect } from "react";
import '../paciente/Pacientes.css'
import { agregarPaciente } from "../../api/pacientes";
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const PacientesAgregar = () => {
    const navigate = useNavigate();

    const [nombre1, setNombre1] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [genero, setGenero] = useState('');
    const [identidad, setIdentidad] = useState('');
    const [fNacimiento, setFNacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [nombre1Error, setNombre1Error] = useState('');
    const [nombre2Error, setNombre2Error] = useState('');
    const [apellido1Error, setApellido1Error] = useState('');
    const [apellido2Error, setApellido2Error] = useState('');
    const [identidadError, setIdentidadError] = useState('');
    const [direccionError, setDireccionError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [correoError, setCorreoError] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const validateForm = () => {
        const nombrePattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Acepta solo letras y espacios
        const identidadPattern = /^\d+$/; // Acepta solo números

        const nombre1Valid = nombre1.match(nombrePattern);
        const nombre2Valid = nombre2 === '' || nombre2.match(nombrePattern); // Puede estar vacío o contener letras y espacios
        const apellido1Valid = apellido1.match(nombrePattern);
        const apellido2Valid = apellido2 === '' || apellido2.match(nombrePattern); // Puede estar vacío o contener letras y espacios
        const identidadValid = identidad.match(identidadPattern) && identidad.length <= 13; // Acepta solo números y no más de 13 dígitos
        const direccionValid = direccion !== '';
        const telefonoValid = telefono !== '' && telefono.match(/^\d+$/); // Acepta solo números
        const correoValid = correo !== '' && correo.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/); // Valida el formato de correo electrónico

        setNombre1Error(nombre1Valid ? '' : 'Ingrese un primer nombre válido (solo letras y espacios)');
        setNombre2Error(nombre2Valid ? '' : 'Ingrese un segundo nombre válido (solo letras y espacios)');
        setApellido1Error(apellido1Valid ? '' : 'Ingrese un primer apellido válido (solo letras y espacios)');
        setApellido2Error(apellido2Valid ? '' : 'Ingrese un segundo apellido válido (solo letras y espacios)');
        setIdentidadError(identidadValid ? '' : 'Ingrese un número de identidad válido (solo números y no más de 13 dígitos)');
        setDireccionError(direccionValid ? '' : 'Ingrese la dirección');
        setTelefonoError(telefonoValid ? '' : 'Ingrese un número de teléfono válido (solo números)');
        setCorreoError(correoValid ? '' : 'Ingrese un correo electrónico válido');

        const isFormValid = nombre1Valid && nombre2Valid && apellido1Valid && apellido2Valid &&
            identidadValid && direccionValid && telefonoValid && correoValid;

        setFormValid(isFormValid);
    };

    const volver = () => {
        navigate('../pacientes')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Realizar validaciones
        if (formValid) {
            const nuevoPaciente = {
                nombre1: nombre1,
                nombre2: nombre2,
                apellido1: apellido1,
                apellido2: apellido2,
                identidad: identidad,
                genero: genero,
                fNacimiento: fNacimiento,
                direccion: direccion,
                telefono: telefono,
                correo: correo,
            }

            agregarPaciente(nuevoPaciente)
                .then((response) => {
                    console.log('Paciente agregado exitosamente', response.data);
                    setMensaje(response.data);
                    // Limpiar los campos después de agregar el paciente
                    setNombre1('');
                    setNombre2('');
                    setApellido1('');
                    setApellido2('');
                    setGenero('');
                    setIdentidad('');
                    setFNacimiento('');
                    setDireccion('');
                    setTelefono('');
                    setCorreo('');
                })

                .catch((error) => {
                    console.error('Error al agregar el paciente', error);
                });
        } else {
            console.error('El formulario no es válido. Por favor, revisa los campos.');
        }
    }

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../pacientes');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);


    return (
        <div className='container- flex justify-content-between'>
            <div className='container-fluid'  >
                <BsFillArrowLeftSquareFill onClick={volver} className='atras mt-3' />
            </div>
            <div className="paciente-container border col shadow p-4 mb-4">
                <form onSubmit={handleSubmit}>
                    {mensaje && (<p className="alert alert-success text-center">{mensaje.message}</p>)}
                    <div className=" border rounded titulo mb-3 text-center" >
                        <h2>Pacientes </h2>
                    </div>

                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Primer Nombre<small>(*)</small></label>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre1}
                                onChange={(e) => { setNombre1(e.target.value); validateForm(); }}
                                className="form-control" id="Nombre1"
                                required />
                            <p className='error-message'>{nombre1Error}</p>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Segundo Nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre2}
                                onChange={(e) => setNombre2(e.target.value)}
                                className="form-control" id="Nombre2" />
                            <p className='error-message'>{nombre2Error}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Primer Apellido<small>(*)</small></label>
                            <input
                                type="text"
                                placeholder="Apellido"
                                value={apellido1} onChange={(e) => { setApellido1(e.target.value); validateForm(); }}
                                className="form-control" id="Apellido1" required />
                            <p className='error-message'>{apellido1Error}</p>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Segundo Apellido</label>
                            <input
                                type="text"
                                placeholder="Apellido"
                                value={apellido2}
                                onChange={(e) => { setApellido2(e.target.value); validateForm(); }}
                                className="form-control" id="Apellido2" />
                            <p className='error-message'>{apellido2Error}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">N° Identidad<small>(Ej: 0803195000001)</small></label>
                            <input
                                type="number"
                                placeholder="Identidad"
                                value={identidad}
                                onChange={(e) => { setIdentidad(e.target.value); validateForm(); }}
                                className="form-control" id="Identidad" required />
                            <p className='error-message'>{identidadError}</p>
                        </div>
                    </div>
                    <label className="form-label">Genero<small>(*)</small></label>
                    <div className="mb-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={(e) => setGenero(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Femenino" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Femenino</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" onChange={(e) => setGenero(e.target.value)} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Masculino" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Masculino</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Fecha de Registro<small>(*)</small></label>
                            <input type="date" value={fNacimiento} onChange={(e) => setFNacimiento(e.target.value)} className="form-control" id="FNacimiento" min={today} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Direccion<small>(*)</small></label>
                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => { setDireccion(e.target.value); validateForm(); }}
                                placeholder="Ejem. Ave Siempre Viva"
                                className="form-control" id="Direccion" required />
                            <p className='error-message'>{direccionError}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Telefono<small>(Ej:99990000 o 22221111 *)</small></label>
                            <input
                                type="text"
                                value={telefono}
                                onChange={(e) => { setTelefono(e.target.value); validateForm(); }}
                                placeholder="0000-0000"
                                className="form-control" id="Telefono" required />
                            <p className='error-message'>{telefonoError}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo<small>(Ej: NombreEmail@email.com *)</small></label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => { setCorreo(e.target.value); validateForm(); }}
                                placeholder="Ejemplo@mail.com"
                                className="form-control" id="Correo" required />
                            <p className='error-message'>{correoError}</p>
                        </div>
                    </div>
                    <small>(* son obligatorios)</small>
                    <button className='btn-Paciente d-grid col-3  mx-auto' type="submit" disabled={!formValid}>Agregar</button>
                </form>
            </div>
        </div>
    );
}
