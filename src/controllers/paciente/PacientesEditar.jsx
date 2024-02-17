import React, { useState, useEffect } from "react";
import { editarPaciente } from "../../api/pacientes";
import './Pacientes.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const PacientesEditar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const paciente = location.state;

    function formatDate(dateString) {
        try {
            const date = new Date(dateString);
            if (!isNaN(date)) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            }
        } catch (error) {
            // Manejar errores, por ejemplo, si la fecha no es válida
        }

        // En caso de error o fecha no válida, regresa una cadena vacía o el valor original
        return "";
    }

    // Define estados locales para los campos del formulario
    const [nombre1, setNombre1] = useState("");
    const [nombre2, setNombre2] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [identidad, setIdentidad] = useState("");
    const [genero, setGenero] = useState("Femenino"); // Valor predeterminado para Femenino
    const [fNacimiento, setFechaNacimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");


    const atras = () => {
        navigate('../pacientes')
    }

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../pacientes')
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);
    // Use useEffect para actualizar los estados locales cuando cambia el paciente
    useEffect(() => {
        if (paciente) {
            const nombres = paciente.NombreCompleto.split(" ");
            const nombre1 = nombres[0] || "";
            const nombre2 = nombres[1] || "";
            const apellido1 = nombres[2] || "";
            const apellido2 = nombres[3] || "";
            setNombre1(nombre1 || "");
            setNombre2(nombre2 || "");
            setApellido1(apellido1 || "");
            setApellido2(apellido2 || "");
            setIdentidad(paciente.identidad || "");
            setGenero(paciente.genero || "Femenino");
            const formattedDate = formatDate(paciente.fNacimiento);
            setFechaNacimiento(formattedDate || "");
            setDireccion(paciente.direccion || "");
            setTelefono(paciente.telefono || "");
            setCorreo(paciente.correo || "");
        }
    }, [paciente]);

    // Manejar la actualización de los campos del formulario
    const handleNombre1Change = (e) => setNombre1(e.target.value);
    const handleNombre2Change = (e) => setNombre2(e.target.value);
    const handleApellido1Change = (e) => setApellido1(e.target.value);
    const handleApellido2Change = (e) => setApellido2(e.target.value);
    const handleIdentidadChange = (e) => setIdentidad(e.target.value);
    const handleGeneroChange = (e) => setGenero(e.target.value);
    const handleDireccionChange = (e) => setDireccion(e.target.value);
    const handleTelefonoChange = (e) => setTelefono(e.target.value);
    const handleCorreoChange = (e) => setCorreo(e.target.value);
    const handleFechaNacimientoChange = (e) => setFechaNacimiento(e.target.value);

    // Manejar la presentación del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = formatDate(fNacimiento);

        const updatedData = {
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            identidad,
            genero,
            fNacimiento: formattedDate,
            direccion,
            telefono,
            correo
        };
        try {
            const response = await editarPaciente(paciente.id, updatedData);
            console.log('Se ha modificado al paciente', response.paciente)
            setMensaje(response.data);
            navigate('../pacientes')
        }
        catch (error) {
            console.log(error)
        }
        // Aquí puedes enviar los datos actualizados al servidor o realizar otras acciones necesarias
    };



    return (
        <>
            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
            </div>
            <div className="paciente-container border col shadow p-4 mb-4">
                <form onSubmit={handleSubmit}>
                    {mensaje && (<p className="alert alert-success text-center">{mensaje.message}</p>)}
                    <div className=" border rounded titulo mb-3 text-center" >
                        <h2>Pacientes </h2>
                    </div>

                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Primer Nombre</label>
                            <input type="text" placeholder="Nombre" value={nombre1} onChange={handleNombre1Change} className="form-control" id="Nombre1" />
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Segundo Nombre</label>
                            <input type="text" placeholder="Nombre" value={nombre2} onChange={handleNombre2Change} className="form-control" id="Nombre2" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Primer Apellido</label>
                            <input type="text" placeholder="Apellido" value={apellido1} onChange={handleApellido1Change} className="form-control" id="Apellido1" />
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Segundo Apellido</label>
                            <input type="text" placeholder="Apellido" value={apellido2} onChange={handleApellido2Change} className="form-control" id="Apellido2" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">N° Identidad</label>
                            <input type="number" placeholder="Identidad" value={identidad} onChange={handleIdentidadChange} className="form-control" id="Identidad" />
                        </div>
                    </div>
                    <label className="form-label">Genero</label>
                    <div className="mb-3">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genero"
                                value="Femenino"
                                checked={genero === "Femenino"}
                                onChange={handleGeneroChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">Femenino</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genero"
                                value="Masculino"
                                checked={genero === "Masculino"}
                                onChange={handleGeneroChange}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio2">Masculino</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Fecha de Registro</label>
                            <input type="date" value={fNacimiento} onChange={handleFechaNacimientoChange} pattern="\d{4}-\d{2}-\d{2}" className="form-control" id="FNacimiento" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Direccion</label>
                            <input type="text" value={direccion} onChange={handleDireccionChange} placeholder="Ejem. Ave Siempre Viva" className="form-control" id="Direccion" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Telefono</label>
                            <input type="text" value={telefono} onChange={handleTelefonoChange} placeholder="0000-0000" className="form-control" id="Telefono" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <input type="email" value={correo} onChange={handleCorreoChange} placeholder="Ejemplo@mail.com" className="form-control" id="Correo" />
                        </div>
                    </div>
                    <button className='btn-Paciente d-grid col-3  mx-auto' type="submit">Actualizar</button>
                </form>
            </div>
        </>
    );
}
