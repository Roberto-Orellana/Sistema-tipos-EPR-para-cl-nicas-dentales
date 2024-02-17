import React, { useEffect, useState } from "react";
import { obtenerRegistroCita } from "../../api/bitacoras";
import { listaPaciente } from "../../api/pacientes";
import { useNavigate, Link } from 'react-router-dom'
import { BsDashSquareFill, BsFillArrowLeftSquareFill, BsPlusSquareFill } from "react-icons/bs";
import { Pagination } from 'react-bootstrap';


const RegistrosCitas = () => {
    const navigate = useNavigate();
    const [registrosCitas, setRegistrosCitas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [registrosPerPage, setRegistrosPerPage] = useState(10); // Número de registros por página
    const [registrosCitasConPacientes, setRegistrosCitasConPacientes] = useState([]);

    const [filtroNombre, setFiltroNombre] = useState('');

    const [filtroFecha, setFiltroFecha] = useState('');

    const handleRegistrosCitasPerPageChange = (e) => {
        setRegistrosPerPage(parseInt(e.target.value, 10)); // Actualizar la cantidad de registros por página
        setCurrentPage(1); // Reiniciar a la primera página cuando se cambia la cantidad de registros por página
    };
    const totalPages = Math.ceil(registrosCitas.length / registrosPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const obtenerRegistroCitas = async () => {
            try {
                const res = await obtenerRegistroCita();
                setRegistrosCitas(res.data);
            } catch (error) {
                console.error('Error al obtener registros de citas:', error);
            }
        };

        obtenerRegistroCitas();
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
        if (registrosCitas.length > 0 && pacientes.length > 0) {
            const registrosCitasConPacientes = registrosCitas.map(registrosCitas => {
                const paciente = pacientes.find(p => p.id === registrosCitas.paciente_id);
                return {
                    ...registrosCitas,
                    nombre: paciente.NombreCompleto,
                    telefono: paciente.telefono,
                    correo: paciente.correo,
                };
            });
            setRegistrosCitasConPacientes(registrosCitasConPacientes);
        }
    }, [registrosCitas, pacientes]);

    const atras = () => {
        navigate('../bitacoras')
    }


    const registrosFiltradosPorEvento = registrosCitasConPacientes.filter(registrosCitas =>
        registrosCitas.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    );

    const registrosFiltradosPorFecha = registrosFiltradosPorEvento.filter(registrosCitas =>
        registrosCitas.fecha_creacion.includes(filtroFecha)
    );

    const registrosOrdenados = registrosFiltradosPorFecha.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
    );




    // Calcular los índices de la página actual
    const startIndex = (currentPage - 1) * registrosPerPage;
    const endIndex = Math.min(startIndex + registrosPerPage, registrosFiltradosPorFecha.length);

    // Obtener los registros para mostrar en la página actual
    const registrosToDisplay = registrosOrdenados.slice(startIndex, endIndex);
    function formatFecha(dateString) {
        try {
            const date = new Date(dateString);

            if (!isNaN(date)) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return `${year}-${month}-${day}, ${hours}:${minutes}`;
            }
        } catch (error) {
            // Manejar errores, por ejemplo, si la fecha no es válida
        }

        // En caso de error o fecha no válida, regresa una cadena vacía o el valor original
        return "";
    }

    const MAX_DISPLAY_PAGES = 6; // Número máximo de páginas que quieres mostrar

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
        <div>
            <h1>Registro de Citas Pasadas</h1>
            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
            </div>
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
                <div className="row m-2">
                    <label className="form-label">Filtro por Fecha de Creación:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        placeholder="Filtrar por fecha de creación..."
                    />
                </div>
            </div>
            {registrosToDisplay.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center">
                    <p>No hay registros disponibles.</p>
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

                            </tr>
                        </thead>
                        <tbody>
                            {registrosToDisplay.map((registrocitas, index) => (
                                <tr key={registrocitas.id}>
                                    <td scope="row" data-cell="ID">{index + 1}</td>
                                    <td scope="row" data-cell="Nombre">{registrocitas.nombre}</td>
                                    <td scope="row" data-cell="FCreacion">{formatFecha(registrocitas.fecha_creacion)}</td>
                                    <td scope="row" data-cell="F.Reservada">{formatFecha(registrocitas.fecha_reservacion)}</td>
                                    <td scope="row" data-cell="Tel.">{registrocitas.telefono}</td>
                                    <td scope="row" data-cell="Email">{registrocitas.correo}</td>
                                    <td scope="row" data-cell="Descripcion">{registrocitas.descripcion}</td>
                                    <td scope="row" data-cell="Estado">{registrocitas.estado_cita}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="justify-content-center align-items-center m-3">
                <label htmlFor="registrosPerPage" className="">Registros por página:</label>
                <select
                    id="registrosPerPage"
                    className="form-select"
                    value={registrosPerPage}
                    onChange={handleRegistrosCitasPerPageChange}
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
        </div>
    );

}

export default RegistrosCitas;