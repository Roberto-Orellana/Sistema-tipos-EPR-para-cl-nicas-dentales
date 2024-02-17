import React, { useState, useEffect } from "react";
import './Citas.css';
import { listaPaciente } from "../../api/pacientes";
import { listarCitas, actualizarEstadoCita } from "../../api/citas";
import { BsFillEnvelopeExclamationFill, BsFillEnvelopeXFill, BsFillEnvelopeCheckFill } from "react-icons/bs"
import { Pagination } from "react-bootstrap";


export const CitasTable = () => {
    const [citas, setCitas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [citasConPacientes, setCitasConPacientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [citasPerPage, setCitasPerPage] = useState(10);
    const [filtroNombre, setFiltroNombre] = useState('');


    const MAX_DISPLAY_PAGES = 6;
    const totalCitas = citasConPacientes.length;
    const totalPages = Math.ceil(totalCitas / citasPerPage);


    const handleCitasPerPageChange = (e) => {
        setCitasPerPage(parseInt(e.target.value, 10)); // Actualizar la cantidad de registros por página
        setCurrentPage(1); // Reiniciar a la primera página cuando se cambia la cantidad de registros por página
    };
    // Manejar el cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPaginationItems = () => {
        let startPage, endPage;
        if (totalPages <= MAX_DISPLAY_PAGES) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfDisplay = Math.floor(MAX_DISPLAY_PAGES / 2);
            if (currentPage <= halfDisplay) {
                startPage = 1;
                endPage = MAX_DISPLAY_PAGES;
            } else if (currentPage + halfDisplay >= totalPages) {
                startPage = totalPages - MAX_DISPLAY_PAGES + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfDisplay;
                endPage = currentPage + halfDisplay;
            }
        }

        const items = [];
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return items;
    };

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const res = await listarCitas();
                setCitas(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCitas();
    }, []);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const res = await listaPaciente();
                setPacientes(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPacientes();
    }, []);

    useEffect(() => {
        if (citas.length > 0 && pacientes.length > 0) {
            const citasConPacientes = citas.map(cita => {
                const paciente = pacientes.find(p => p.id === cita.paciente_id);
                return {
                    ...cita,
                    nombre: paciente.NombreCompleto,
                    telefono: paciente.telefono,
                    correo: paciente.correo,
                };
            });
            setCitasConPacientes(citasConPacientes);
        }
    }, [citas, pacientes]);

    const handleFiltrar = () => {
        // Filtrar las citas por nombre
        const citasFiltradas = citasConPacientes.filter(cita =>
            cita.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        );

        return citasFiltradas;
    };

    // Calcular los índices
    const citasFiltradas = handleFiltrar();
    const startIndex = (currentPage - 1) * citasPerPage;
    const endIndex = Math.min(startIndex + citasPerPage, totalCitas);


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

    const handleActualizarEstado = async (id, nuevoEstado) => {
        try {
            // Envía una solicitud para actualizar el estado de la cita
            const response = await actualizarEstadoCita(id, nuevoEstado);
            console.log("Respuesta del servidor:", response.data);
            // Actualiza el estado local de las citas después de la respuesta exitosa
            setCitas((prevCitas) =>
                prevCitas.map((cita) =>
                    cita.id === id ? { ...cita, estado_cita: nuevoEstado } : cita
                )
            );

        } catch (error) {
            console.error("Error al actualizar el estado de la cita:", error);
        }

    };

    const citasToDisplay = citasFiltradas.slice(startIndex, endIndex)

    return (
        <>
            <div className="d-flex justify-content-center align-items-center m-2">
                <div className="row m-2">
                    <label className="form-label">Filtro por Nombre:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        placeholder="Filtrar por evento..."
                    />
                </div>
            </div>
            {citasToDisplay.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center">
                    <p>No hay citas disponibles.</p>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center">
                    <table className='flex table table-striped table-bordered mt-3'>
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">N°</th>
                                <th className="text-center" scope="col">Nombre</th>
                                <th className="text-center" scope="col">F. de Creacion</th>
                                <th className="text-center" scope="col">F. de Consulta</th>
                                <th className="text-center" scope="col">Telefono</th>
                                <th className="text-center" scope="col">Correo</th>
                                <th className="text-center" scope="col">Descripcion</th>
                                <th className="text-center" scope="col">Estado</th>
                                <th className="text-center" scope="col">Pendiente</th>
                                <th className="text-center" scope="col">Completar</th>
                                <th className="text-center" scope="col">Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citasToDisplay.map((cita, index) => (
                                <tr key={cita.id}>
                                    <td scope="row" data-cell="ID">{index + 1}</td>
                                    <td scope="row" data-cell="Nombre">{cita.nombre}</td>
                                    <td scope="row" data-cell="FCreacion">{formatDate(cita.fecha_creacion)}</td>
                                    <td scope="row" data-cell="F.Reservada">{formatDate(cita.fecha_reservacion)}</td>
                                    <td scope="row" data-cell="Tel.">{cita.telefono}</td>
                                    <td scope="row" data-cell="Email">{cita.correo}</td>
                                    <td scope="row" data-cell="Descripcion">{cita.descripcion}</td>
                                    <td scope="row" data-cell="Estado">{cita.estado_cita}</td>
                                    <td data-cell="Pendiente" className="icon-button">
                                        <BsFillEnvelopeExclamationFill className="icon-button-pend" onClick={() => handleActualizarEstado(cita.id, "pendiente")} />
                                    </td>
                                    <td data-cell="Completar" className="icon-button">
                                        <BsFillEnvelopeCheckFill className="icon-button-compl" onClick={() => handleActualizarEstado(cita.id, "procesada")} />
                                    </td>
                                    <td data-cell="Cancelar" className="icon-button">
                                        <BsFillEnvelopeXFill className="icon-button-canc" onClick={() => handleActualizarEstado(cita.id, "cancelada")} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="justify-content-center align-items-center m-3">
                <label htmlFor="citasPerPage" className="">Registros por página:</label>
                <select
                    id="citasPerPage"
                    className="form-select"
                    value={citasPerPage}
                    onChange={handleCitasPerPageChange}
                    style={{ width: '5rem' }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>

            </div>

            <div className="pagination-container">
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev
                        onClick={() => {
                            if (currentPage > 1) {
                                handlePageChange(currentPage - 1);
                            }
                        }}
                    />
                    {renderPaginationItems()}
                    <Pagination.Next
                        onClick={() => {
                            if (currentPage < totalPages) {
                                handlePageChange(currentPage + 1);
                            }
                        }}
                    />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
            </div>

        </>
    );
};