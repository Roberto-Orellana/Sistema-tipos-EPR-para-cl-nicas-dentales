import React, { useState, useEffect } from "react";
import { agregarProducto } from "../../api/producto";
import { listaProveedor } from "../../api/proveedor";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import "./Inventario.css";

export const InventarioAgregarProducto = () => {
    const navigate = useNavigate();

    const atras = () => {
        navigate('../productos')
    }

    const [proveedores, setProveedores] = useState([]);
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [selectedProveedor, setSelectedProveedor] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [mensaje , setMensaje] = useState("");
    const [nombreError, setNombreError] = useState("");
    const [cantidadError, setCantidadError] = useState("");
    const [precioError, setPrecioError] = useState("");
    const [descripcionError, setDescripcionError] = useState("");

    // Función para cargar la lista de proveedores
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

    // Función para validar el formulario
    const validateForm = () => {
        const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/; // Acepta solo letras y espacios
        const quantityPattern = /^\d+$/; // Acepta solo números
        const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/; // Acepta números con 1 o 2 decimales

        const nameValid = nombre.match(namePattern);
        const quantityValid = cantidad.match(quantityPattern);
        const priceValid = precio.match(pricePattern);

        setNombreError(
            !nombre
                ? "(El nombre del producto es requerido)"
                : nameValid
                    ? ""
                    : "(Ingrese un nombre válido, solo letras y espacios)"
        );
        setCantidadError(
            !cantidad
                ? "(La cantidad es requerida)"
                : quantityValid
                    ? ""
                    : "(Ingrese una cantidad válida, solo números)"
        );
        setPrecioError(
            !precio
                ? "(El precio es requerido)"
                : priceValid
                    ? ""
                    : "(Ingrese un precio válido, solo números y máximo 2 decimales)"
        );
        setDescripcionError(!descripcion ? "(La descripción es requerida)" : "");

        setFormValid(
            nombre &&
            cantidad &&
            descripcion &&
            precio &&
            nameValid &&
            quantityValid &&
            priceValid
        );
    };

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                setMensaje('');
                navigate('../productos');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    
    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar el formulario antes de enviarlo
        validateForm();

        // Si el formulario es válido, enviar los datos
        if (formValid) {
            const nuevoProducto = {
                nombre_producto: nombre,
                cantidad: cantidad,
                descripcion: descripcion,
                precio_unitario: precio,
                proveedor_id: selectedProveedor
            };

            // Lógica para agregar el producto (llamada a la API, etc.)
            agregarProducto(nuevoProducto)
                .then((response) => {
                    console.log("Producto agregado exitosamente", response.data);
                    setMensaje(response.data);
                    // Limpiar los campos después de agregar el producto
                    setNombre("");
                    setCantidad("");
                    setDescripcion("");
                    setPrecio("");
                    setSelectedProveedor("");
                })
                .catch((error) => {
                    console.error("Error al agregar el producto", error);
                });
        } else {
            console.error(
                "El formulario no es válido. Por favor, revisa los campos."
            );
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
                            <h2>Agregar Producto</h2>
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
                                        validateForm();
                                    }}
                                />
                                <p className="error-message">{nombreError}</p>
                            </div>
                            <div className="mb-3 col">
                                <label className="form-label">Cantidad</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Cantidad"
                                    value={cantidad}
                                    name="cantidad"
                                    onChange={(e) => {
                                        setCantidad(e.target.value);
                                        validateForm();
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
                                        validateForm();
                                    }}
                                />
                                <p className="error-message">{descripcionError}</p>
                            </div>
                            <div className="mb-3 col">
                                <label className="form-label">Precio Unitario</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Precio unitario"
                                    value={precio}
                                    name="precio"
                                    onChange={(e) => {
                                        setPrecio(e.target.value);
                                        validateForm();
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
                        <button className='btn-Paciente d-grid col-3  mx-auto' type="submit " disabled={!formValid}>Agregar</button>
                    </form>
                </div>
            </div>
        </>
    );
}
