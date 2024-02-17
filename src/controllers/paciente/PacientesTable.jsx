import React, { useEffect, useState } from "react";
import { listaPaciente, eliminarPaciente } from "../../api/pacientes";
import { TbBallpenFilled } from "react-icons/tb"
import { BsFillTrashFill } from "react-icons/bs"
import { useNavigate, useLocation } from 'react-router-dom'
import { Pagination } from 'react-bootstrap';

export const PacientesTable = () => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    const [pacientesPerPage, setPacientesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePacientesPerPageChange = (e) => {
        setPacientesPerPage(parseInt(e.target.value, 10)); // Actualizar la cantidad de registros por página
        setCurrentPage(1); // Reiniciar a la primera página cuando se cambia la cantidad de registros por página
    };


    const totalPages = Math.ceil(pacientes.length / pacientesPerPage);

    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroIdentidad, setFiltroIdentidad] = useState('');


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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


    const editar = (id) => {
        // Encontrar el paciente correspondiente por su ID
        const paciente = pacientes.find((p) => p.id === id);

        if (paciente) {
            // Redirigir al usuario a la página de edición y pasar los datos del paciente
            navigate(`/actualizar-paciente/${paciente.id}`, { state: paciente });
        }
    };

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

    const eliminar = async (data) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este paciente?');
        if (confirmacion) {
            try {
                await eliminarPaciente(data);
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleFiltrar = () => {
        // Aplicar los filtros en la lista de pacientes
        const pacientesFiltrados = pacientes.filter(paciente => {
            const nombreMinusculas = paciente.NombreCompleto.toLowerCase();
            const identidadMinusculas = paciente.identidad.toLowerCase();

            // Filtrar por nombre y identidad
            return (
                nombreMinusculas.includes(filtroNombre.toLowerCase()) &&
                identidadMinusculas.includes(filtroIdentidad.toLowerCase())
            );
        });

        // Retornar los pacientes filtrados
        return pacientesFiltrados;
    };


    // Calcula los índices de los pacientes a mostrar en la página actual
    const pacientesFiltrados = handleFiltrar();
    const startIndex = (currentPage - 1) * pacientesPerPage;
    const endIndex = Math.min(startIndex + pacientesPerPage, pacientesFiltrados.length);

    // Obtiene los pacientes que se mostrarán en la página actual
    const patientsToDisplay = pacientesFiltrados.slice(startIndex, endIndex);

    const MAX_DISPLAY_PAGES = 6;

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
                        placeholder="Filtrar por nombre"
                    />
                </div>
                <div className="row m-2">
                    <label className="form-label">Filtro por Identidad:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={filtroIdentidad}
                        onChange={(e) => setFiltroIdentidad(e.target.value)}
                        placeholder="Filtrar por identidad"
                    />
                </div>
            </div>
            {patientsToDisplay.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center">
                    <p>No hay pacientes disponibles.</p>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center">
                    <table className='flex table table-striped table-bordered mt-3'>
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">N°</th>
                                <th className="text-center" scope="col">Identidad</th>
                                <th className="text-center" scope="col">Nombre</th>
                                <th className="text-center" scope="col">Genero</th>
                                <th className="text-center" scope="col">Fecha de Registro</th>
                                <th className="text-center" scope="col">Direccion</th>
                                <th className="text-center" scope="col">Telefono</th>
                                <th className="text-center" scope="col">Correo</th>
                                <th className="text-center" scope="col">Editar</th>
                                <th className="text-center" scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientsToDisplay.map((data, index) => (
                                <tr key={data.id}>
                                    <td scope="row" data-cell="id">{index + 1}</td>
                                    <td scope="row" data-cell="identidad">{data.identidad}</td>
                                    <td scope="row" data-cell="nombre">{data.NombreCompleto}</td>
                                    <td scope="row" data-cell="genero">{data.genero}</td>
                                    <td scope="row" data-cell="fecha de creacion">{formatDate(data.fNacimiento)}</td>
                                    <td scope="row" data-cell="direccion">{data.direccion}</td>
                                    <td scope="row" data-cell="telefono">{data.telefono}</td>
                                    <td scope="row" data-cell="correo">{data.correo}</td>
                                    <td data-cell="Editar" onClick={() => editar(data.id)}><TbBallpenFilled /></td>
                                    <td data-cell="Borrar" onClick={() => eliminar(data.id)}><BsFillTrashFill /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="justify-content-center align-items-center m-3">
                <label htmlFor="pacientesPerPage" className="">Registros por página:</label>
                <select
                    id="pacientesPerPage"
                    className="form-select"
                    value={pacientesPerPage}
                    onChange={handlePacientesPerPageChange}
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
}