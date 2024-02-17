import React, { useState, useEffect } from "react";
import { listaProveedor } from "../../api/proveedor";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill, BsPlusSquareFill, BsArrowRight } from "react-icons/bs";
import { Pagination } from "react-bootstrap";

// Componente que renderiza una lista de proveedores
export const Proveedores = () => {
    const MAX_DISPLAY_PAGES = 6;
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [proveedoresPerPage, setProveedoresPerPage] = useState(10); // Número de registros por página

    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroTelefono, setFiltroTelefono] = useState('');
    // Agrega estados similares para otros campos de filtro, si es necesario

    const handleFiltrar = () => {
        // Aplicar los filtros en la lista de proveedores
        const proveedoresFiltrados = proveedores.filter(proveedor => {
            const nombreMinusculas = proveedor.nombre.toLowerCase();
            const telefonoMinusculas = proveedor.numeroTelefono.toLowerCase();

            // Filtrar por nombre y teléfono
            return (
                nombreMinusculas.includes(filtroNombre.toLowerCase()) &&
                telefonoMinusculas.includes(filtroTelefono.toLowerCase())
                // Agrega condiciones similares para otros campos de filtro, si es necesario
            );
        });

        // Retornar los proveedores filtrados
        return proveedoresFiltrados;
    };
    const handleProveedoresPerPageChange = (e) => {
        setProveedoresPerPage(parseInt(e.target.value, 10)); // Actualizar la cantidad de registros por página
        setCurrentPage(1); // Reiniciar a la primera página cuando se cambia la cantidad de registros por página
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
        // Realiza la petición para obtener la lista de proveedores
        const lista = async () => {
            try {
                const res = await listaProveedor();
                setProveedores(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        lista();
    }, []);

    const atras = () => {
        navigate("../home");
    };

    const detalles = (data) => {
        navigate("../detalle-proveedor", { state: data });
    };

    const agregarProveedor = () => {
        navigate("../agregar-proveedor");
    };

    const totalProveedores = proveedores.length;
    const totalPages = Math.ceil(totalProveedores / proveedoresPerPage);

    // Manejar el cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calcular los índices de los proveedores a mostrar en la página actual

    const proveedoresFiltrados = handleFiltrar();
    const startIndex = (currentPage - 1) * proveedoresPerPage;
    const endIndex = Math.min(startIndex + proveedoresPerPage, proveedoresFiltrados.length);

    // Obtener los proveedores filtrados para mostrar en la página actual
    const proveedoresToDisplay = proveedoresFiltrados.slice(startIndex, endIndex);



    return (
        <>
            <div>
                <div className="container-fluid d-flex justify-content-between">
                    <label className="form-label p m mt-4 col-3" >
                        <BsFillArrowLeftSquareFill onClick={atras} className="atras mt-3" />
                    </label>
                    <h2 className="text-center mt-3">Proveedores</h2>

                    <label className="form-label mt-3 col-3 align-items-center" >
                        <BsPlusSquareFill onClick={agregarProveedor} className="agregar mt-2 ml-1" />
                    </label>


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
                    <div className="row m-2">
                        <label className="form-label">Filtro por Telefono:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={filtroTelefono}
                            onChange={(e) => setFiltroTelefono(e.target.value)}
                            placeholder="Filtrar por teléfono"
                        />
                    </div>
                </div>
                {proveedoresToDisplay.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p>No hay proveedores disponibles.</p>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center">
                        <table className="table table-striped table-bordered mt-3">
                            <thead className="bg-success" style={{ backgroundColor: "#198754" }}>
                                <tr>
                                    <th className="text-center" scope="col">
                                        ID
                                    </th>
                                    <th className="text-center" scope="col">
                                        Nombre
                                    </th>
                                    <th className="text-center" scope="col">
                                        Teléfono
                                    </th>
                                    <th className="text-center" scope="col">
                                        Detalles
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {proveedoresToDisplay.slice(startIndex, endIndex).map((data, index) => (
                                    <tr key={data.id}>
                                        <td scope="row" data-cell="id" className="text-center">
                                            {startIndex + index + 1}
                                        </td>
                                        <td scope="row" data-cell="Nombre" className="text-center">
                                            {data.nombre}
                                        </td>
                                        <td scope="row" data-cell="Telefono" className="text-center">
                                            {data.numeroTelefono}
                                        </td>
                                        <td onClick={() => detalles(data)} scope="row" data-cell="Ver Mas" className="text-center cursor">
                                            <BsArrowRight className="text-center linkDetalles" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="justify-content-center align-items-center m-3">
                    <label htmlFor="proveedoresPerPage" className="">Registros por página:</label>
                    <select
                        id="registrosPerPage"
                        className="form-select"
                        value={proveedoresPerPage}
                        onChange={handleProveedoresPerPageChange}
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
        </>
    );
};