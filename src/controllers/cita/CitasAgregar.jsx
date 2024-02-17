import React, { useState, useEffect } from "react";
import './Citas.css';
import { listaPaciente } from "../../api/pacientes";
import { agendarCita } from "../../api/citas";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const CitasAgregar = () => {
    const [selectedPatient, setSelectedPatient] = useState("");
    const [citaMotivo, setCitaMotivo] = useState("");
    const [fNacimiento, setFNacimiento] = useState("");
    const [pacientes, setPacientes] = useState([]); // Estado para almacenar la lista de pacientes
    const navigate = useNavigate();

    const [citaMotivoError, setCitaMotivoError] = useState('');
    const [formValid, setFormValid] = useState(false);

    const validateForm = () => {
        const motivoPattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Acepta solo letras y espacios

        const motivo = citaMotivo.match(motivoPattern);
        setCitaMotivoError(motivo ? '' : 'Agregar una descripcion del articulo');

        const isFormValid = motivo;

        setFormValid(isFormValid);
    }

    // Cargar la lista de pacientes al cargar el componente
    useEffect(() => {
        const lista = async () => {
            try {
                const res = await listaPaciente();
                setPacientes(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        lista();
    }, []);
    // Función para manejar el envío del formulario

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValid) {
            const nuevaCita = {
                fechaReservacion: fNacimiento,
                pacienteId: selectedPatient,
                descripcion: citaMotivo,
            };

            agendarCita(nuevaCita)
                .then((response) => {
                    console.log(nuevaCita);
                    if (response.status === 201) {
                        // La cita se agendó correctamente, puedes hacer algo aquí si es necesario
                        console.log("Cita agendada exitosamente");
                    } else {
                        // Hubo un error al agendar la cita
                        console.log("Error al agendar la cita");
                    }
                })
                .catch((error) => {
                    // Manejar errores de la solicitud
                    console.error("Error al agendar cita:", error);
                });

        } else {
            console.error('El formulario no es válido. Por favor, revisa los campos.');
        }
    };

    const atras = () => {
        navigate("../citas");
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
            </div>
            <div className='citas-container justify-content-center align-items-center'>

                <div className="citaAdd-container">
                    <form className="former" onSubmit={handleSubmit}>
                        <div className="col">
                            <h1>Agendar una Cita</h1>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Paciente</label>
                                    <select value={selectedPatient} onChange={(e) =>
                                        setSelectedPatient(e.target.value)} className="form-control">
                                        <option value="">Selecciona un paciente</option>
                                        {pacientes.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.NombreCompleto}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha de Atención</label>
                                <input
                                    type="date"
                                    value={fNacimiento}
                                    onChange={(e) => setFNacimiento(e.target.value)}
                                    className="form-control"
                                    min={today}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label">Motivo de la Cita</label>
                                    <input
                                        type="text"
                                        value={citaMotivo}
                                        onChange={(e) => { setCitaMotivo(e.target.value); validateForm(); }}
                                        className="form-control" />
                                    <p className='error-message'>{citaMotivoError}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary" disabled={!formValid}>Agendar Cita</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

};