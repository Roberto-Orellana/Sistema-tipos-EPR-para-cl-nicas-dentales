import React, { useState, useEffect } from "react";
import { actualizarProd } from "../../api/producto";
import { listaProveedor } from "../../api/proveedor";
import { useNavigate, useLocation } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import "./Inventario.css";

export const InventarioEditarProducto = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const atras = () => {
        navigate('../productos')
    }

    const [nombre, setNombre] = useState(data.nombre_producto || '');
    const [cantidad, setCantidad] = useState(data.cantidad || '');
    const [descripcion, setDescripcion] = useState(data.descripcion || '');
    const [precio, setPrecio] = useState(data.precio_unitario || '');
    const [selectedProveedor, setSelectedProveedor] = useState(data.proveedor_id || '');
    const [proveedores, setProveedores] = useState([]);
    const [formValid, setFormValid] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [nombreError, setNombreError] = useState("");
    const [cantidadError, setCantidadError] = useState("");
    const [precioError, setPrecioError] = useState("");
    const [descripcionError, setDescripcionError] = useState("");

    useEffect(() => {
        if (data) {
            setNombre(data.nombre_producto || "");
            setCantidad(data.cantidad || "");
            setDescripcion(data.descripcion || "");
            setPrecio(data.precio_unitario || "");
            setSelectedProveedor(data.proveedor_id || "");
        }
    }, [data]);

    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                const res = await listaProveedor();
                setProveedores(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        cargarProveedores();
    }, []);

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../productos');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datosActualizar = {
            nombre_producto: nombre,
            cantidad: cantidad,
            descripcion: descripcion,
            precio_unitario: precio,
            proveedor_id: selectedProveedor
        };
        try {
            console.log('Aquí llego')
            const response = await actualizarProd(data.id, datosActualizar);
            console.log("Producto actualizado exitosamente", response.data);
            setMensaje(response.data);
        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }

    };


    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <BsFillArrowLeftSquareFill onClick={atras} className="atras mt-3" />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="inventario-container border col shadow p-4 mb-4">
                    <form onSubmit={handleSubmit}>
                        {mensaje && (<p className="alert alert-success text-center">{mensaje.message}</p>)}
                        <div className=" border rounded titulo mb-3 text-center" >
                            <h2>Actualizar Producto</h2>
                        </div>


                        <div className="row">
                            <div className="mb-3 col">
                                <label className="form-label">Nombre del Producto</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Nombre de producto"
                                    value={nombre}
                                    name="nombre"
                                    onChange={(e) => {
                                        setNombre(e.target.value);

                                    }}
                                />
                                <p className="error-message">{nombreError}</p>
                            </div>
                            <div className="mb-3 col">
                                <label className="form-label">Cantidad</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Cantidad"
                                    value={cantidad}
                                    name="cantidad"
                                    onChange={(e) => {
                                        setCantidad(e.target.value);

                                    }}
                                />
                                <p className="error-message">{cantidadError}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label className="form-label">Descripción</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Descripción del producto"
                                    value={descripcion}
                                    name="descripcion"
                                    onChange={(e) => {
                                        setDescripcion(e.target.value);

                                    }}
                                />
                                <p className="error-message">{descripcionError}</p>
                            </div>
                            <div className="mb-3 col">
                                <label className="form-label">Precio Unitario</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Precio unitario"
                                    value={precio}
                                    name="precio"
                                    onChange={(e) => {
                                        setPrecio(e.target.value);

                                    }}
                                />
                                <p className="error-message">{precioError}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label className="form-label">Proveedor</label>
                                <select value={selectedProveedor} onChange={(e) =>
                                    setSelectedProveedor(e.target.value)} className="form-control">
                                    <option value="">Proveedor Encargado</option>
                                    {proveedores.map((prov) => (
                                        <option key={prov.id} value={prov.id}>
                                            {prov.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className='btn-Paciente d-grid col-3  mx-auto' type="submit ">Actualizar</button>
                    </form>
                </div>
            </div>
        </>
    );
}
