import React, { useEffect, useState } from "react";
import { obtenerRegistros } from "../../api/bitacoras";
import { useNavigate, Link } from 'react-router-dom'
import { BsDashSquareFill, BsFillArrowLeftSquareFill, BsPlusSquareFill } from "react-icons/bs";
import { RiMailDownloadFill } from "react-icons/ri";
import { Pagination } from 'react-bootstrap';


export const RegistroPage = () => {
    const navigate = useNavigate();
    const [registrosBitacora, setRegistrosBitacora] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [registrosPerPage, setRegistrosPerPage] = useState(10); // Número de registros por página

    const [filtroEvento, setFiltroEvento] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    const handleRegistrosPerPageChange = (e) => {
        setRegistrosPerPage(parseInt(e.target.value, 10)); // Actualizar la cantidad de registros por página
        setCurrentPage(1); // Reiniciar a la primera página cuando se cambia la cantidad de registros por página
    };
    const totalPages = Math.ceil(registrosBitacora.length / registrosPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const obtenerRegistrosBitacora = async () => {
            try {
                const res = await obtenerRegistros();
                setRegistrosBitacora(res.data);
            } catch (error) {
                console.error('Error al obtener registros de bitácora:', error);
            }
        };

        obtenerRegistrosBitacora();
    }, []);

    const atras = () => {
        navigate('../home')
    }

    // Calcula los índices de los pacientes a mostrar en la página actual
    const regCitas = () => {
        navigate('../registroscitas')
    }

    const registrosFiltradosPorEvento = registrosBitacora.filter(registro =>
        registro.evento.toLowerCase().includes(filtroEvento.toLowerCase())
    );

    const registrosFiltradosPorFecha = registrosFiltradosPorEvento.filter(registro =>
        registro.fecha.includes(filtroFecha)
    );

    const registrosOrdenados = registrosFiltradosPorFecha.sort((a, b) =>
        a.evento.localeCompare(b.evento)
    );

    // Calcular los índices de la página actual
    const startIndex = (currentPage - 1) * registrosPerPage;
    const endIndex = Math.min(startIndex + registrosPerPage, registrosOrdenados.length);

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
            <h1>Registro de Bitácora</h1>
            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
                <RiMailDownloadFill onClick={regCitas} className='agregar mt-3' />
            </div>
            <div className="d-flex justify-content-center align-items-center m-2">
                <div className="row m-2">
                    <label className="form-label">Filtro por Evento:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={filtroEvento}
                        onChange={(e) => setFiltroEvento(e.target.value)}
                        placeholder="Filtrar por evento..."
                    />
                </div>
                <div className="row m-2">
                    <label className="form-label">Filtro por Fecha:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        placeholder="Filtrar por fecha..."
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
                                <th className="text-center" scope="col">Fecha</th>
                                <th className="text-center" scope="col">Evento</th>
                                <th className="text-center" scope="col">Descripción</th>

                            </tr>
                        </thead>
                        <tbody>
                            {registrosToDisplay.map((registro, index) => (
                                <tr key={registro.id}>
                                    <td data-cell="Fecha">{formatFecha(registro.fecha)}</td>
                                    <td data-cell="Evento">{registro.evento}</td>
                                    <td data-cell="Descripcion">{registro.descripcion}</td>
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
                    onChange={handleRegistrosPerPageChange}
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
