import React, { useState, useEffect } from "react";
import { listaProductos, eliminarProducto, cantidadMinProd } from "../../api/producto";
import { listaProveedor } from "../../api/proveedor";
import { useNavigate, useLocation } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
import { BsDashSquareFill, BsFillArrowLeftSquareFill, BsFillTrashFill, BsPlusSquareFill } from "react-icons/bs";
import './Inventario.css'


export const InventarioProductosPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const MAX_DISPLAY_PAGES = 6;
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productoConProveedor, setProductoConProveedor] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtroNombre, setFiltroNombre] = useState('');

    const [productosPerPage, setProductosPerPage] = useState(10); // Número de registros por página

    const handleProductosPerPageChange = (e) => {
        setProductosPerPage(parseInt(e.target.value, 10)); // Actualizar la cantidad de registros por página
        setCurrentPage(1); // Reiniciar a la primera página cuando se cambia la cantidad de registros por página
    };

    const totalProductos = productos.length;
    const totalPages = Math.ceil(totalProductos / productosPerPage);

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

    const handleActualizarProducto = (id) => {
        const producto = productos.find((p) => p.id === id);

        if (producto) {
            navigate(`/actualizar-producto/${producto.id}`, { state: producto });
        }

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFiltrarPorNombre = () => {
        // Filtrar los productos por nombre
        const productosFiltrados = productoConProveedor.filter(producto =>
            producto.nombre_producto.toLowerCase().includes(filtroNombre.toLowerCase())
        );

        return productosFiltrados;
    };
    const productosFiltrados = handleFiltrarPorNombre();

    const startIndex = (currentPage - 1) * productosPerPage;
    const endIndex = Math.min(startIndex + productosPerPage, totalProductos);
    const productosToDisplay = productosFiltrados.slice(startIndex, endIndex);

    const atras = () => {
        navigate('../Inventario')
    }

    const handleEliminarProducto = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmacion) {
            try {
                await eliminarProducto(id);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const resProductos = await listaProductos();
                setProductos(resProductos.data);

                const resProveedores = await listaProveedor();
                setProveedores(resProveedores.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductos();
    }, []);

    useEffect(() => {
        if (productos.length > 0 && proveedores.length > 0) {
            const productoConProveedor = productos.map(producto => {
                const proveedor = proveedores.find(p => p.id === producto.proveedor_id);
                return {
                    ...producto,
                    nombre: proveedor.nombre
                };
            });
            setProductoConProveedor(productoConProveedor);
        }
    }, [productos, proveedores]);

    const agregarProducto = () => {
        navigate("../agregar-producto");
    };
    const cantidadMinima = 5;
    return (
        <>
            <div>
                <div className='d-flex justify-content-center align-items-center'>
                    <h2>Lista de Productos</h2>
                </div>
                <div className='container-fluid d-flex justify-content-between'>
                    <div><BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' /></div>
                    <BsPlusSquareFill onClick={agregarProducto} className="agregar mt-3" />
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <p>{totalProductos > 0 ? `Total de productos: ${totalProductos}` : "No hay productos disponibles."}</p>
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
                {productoConProveedor.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p>No hay productos disponibles.</p>
                    </div>
                ) : (
                    <div className='d-flex justify-content-center align-items-center'>
                        <table className='flex table table-striped table-bordered mt-3'>
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">N°</th>
                                    <th className="text-center" scope="col">Nombre del Producto</th>
                                    <th className="text-center" scope="col">Cantidad</th>
                                    <th className="text-center" scope="col">Descripción</th>
                                    <th className="text-center" scope="col">Precio</th>
                                    <th className="text-center" scope="col">Proveedor Asignado</th>
                                    <th className="text-center" scope="col">Editar</th>
                                    <th className="text-center" scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosToDisplay.map((producto, index) => {
                                    // Verificar si la cantidad está por debajo del umbral establecido
                                    const cantidadBaja = producto.cantidad < cantidadMinima;

                                    return (
                                        <tr key={producto.id} className={cantidadBaja ? 'cantidad-baja' : ''}>
                                            <td scope="row" data-cell="ID">{index + 1}</td>
                                            <td scope="row" data-cell="Producto">{producto.nombre_producto}</td>
                                            <td scope="row" data-cell="Cant.">{producto.cantidad}</td>
                                            <td scope="row" data-cell="Descrp.">{producto.descripcion}</td>
                                            <td scope="row" data-cell="Precio">{producto.precio_unitario}</td>
                                            <td scope="row" data-cell="Proveedor">{producto.nombre}</td>
                                            <td scope="row" data-cell="Editar">
                                                <BsDashSquareFill onClick={() => handleActualizarProducto(producto.id)} />
                                            </td>
                                            <td scope="row" data-cell="Eliminar">
                                                <BsFillTrashFill onClick={() => handleEliminarProducto(producto.id)} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="justify-content-center align-items-center m-3">
                <label htmlFor="productosPerPage" className="">Registros por página:</label>
                <select
                    id="productosPerPage"
                    className="form-select"
                    value={productosPerPage}
                    onChange={handleProductosPerPageChange}
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