import React, { useState, useEffect } from "react";
import { listaServicios, eliminarServicio } from "../../api/servicios";
import { Pagination } from "react-bootstrap";
import { BsPlusSquareFill, BsDashSquareFill, BsFillArrowLeftSquareFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate, useLocation } from 'react-router-dom';

export const InventarioServiciosPage = () => {

    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [serviciosPerPage, setServiciosPerPage] = useState(10);
    const [filtroNombre, setFiltroNombre] = useState('');
    
    const MAX_DISPLAY_PAGES = 6;

    // Funciones para manejar el número de servicios por página
    const handleServiciosPerPageChange = (e) => {
        setServiciosPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    // Lógica para manejar la eliminación de un servicio
    const handleEliminarServicio = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este servicio?');
        if (confirmacion) {
            try {
                await eliminarServicio(id);
                // Volver a cargar la lista de servicios después de eliminar uno
                const resServicios = await listaServicios();
                setServicios(resServicios.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleActualizarServicio = async (id) => {
        const servicio = servicios.find((p) => p.id === id);
        if (servicio) {
            navigate(`/actualizar-servicio/${servicio.id}`, { state: servicio })
        }
    }




    const atras = () => {
        navigate('../Inventario')
    }

    // Lógica para manejar el cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFiltrarPorNombre = () => {
        // Filtrar los servicios por nombre
        const serviciosFiltrados = servicios.filter(servicio =>
            servicio.nombre_servicio.toLowerCase().includes(filtroNombre.toLowerCase())
        );

        return serviciosFiltrados;
    };

    

    // Obtener el índice de inicio y fin de servicios a mostrar en la página actual
    const startIndex = (currentPage - 1) * serviciosPerPage;
    const endIndex = Math.min(startIndex + serviciosPerPage, servicios.length);

    const totalServicios = servicios.length;
    const totalPages = Math.ceil(totalServicios / serviciosPerPage);
    const serviciosFiltrados = handleFiltrarPorNombre();

    const serviciosToDisplay = serviciosFiltrados.slice(startIndex, endIndex)


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
        const fetchServicios = async () => {
            try {
                const resServicios = await listaServicios();
                setServicios(resServicios.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchServicios();
    }, []);

    const agregarServicios = () => {
        navigate("../agregar-servicio");
    };


    return (
        <div>
            <h1>Lista de Servicios</h1>
            <div className='container-fluid d-flex justify-content-between'>
                <div><BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' /></div>
                <BsPlusSquareFill onClick={agregarServicios} className="agregar mt-3" />
            </div>
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
            </div>
            {servicios.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center">
                    <p>No hay servicios disponibles.</p>
                </div>
            ) : (
                <div className='d-flex justify-content-center align-items-center'>
                    <table className='flex table table-striped table-bordered mt-3'>
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">N°</th>
                                <th className="text-center" scope="col">Nombre del Servicio</th>
                                <th className="text-center" scope="col">Descripción</th>
                                <th className="text-center" scope="col">Precio</th>
                                {/* Agregar más columnas según los detalles que desees mostrar */}
                                <th className="text-center" scope="col">Editar</th>
                                <th className="text-center" scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviciosToDisplay.map((servicio, index) => (
                                <tr key={servicio.id}>
                                    <td scope="row" data-cell="ID">{index + 1}</td>
                                    <td scope="row" data-cell="Servicio">{servicio.nombre_servicio}</td>
                                    <td scope="row" data-cell="Descripción">{servicio.descripcion}</td>
                                    <td scope="row" data-cell="Precio">{servicio.precio_unitario}</td>
                                    {/* Agregar más celdas según los detalles que desees mostrar */}
                                    <td scope="row" data-cell="Editar">
                                        <BsDashSquareFill onClick={() => handleActualizarServicio(servicio.id)} />
                                    </td>
                                    <td scope="row" data-cell="Eliminar">
                                        <BsFillTrashFill onClick={() => handleEliminarServicio(servicio.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="justify-content-center align-items-center m-3">
                <label htmlFor="serviciosPerPage" className="">Registros por página:</label>
                <select
                    id="serviciosPerPage"
                    className="form-select"
                    value={serviciosPerPage}
                    onChange={handleServiciosPerPageChange}
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