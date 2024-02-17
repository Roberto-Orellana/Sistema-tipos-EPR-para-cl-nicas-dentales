import React, { useState, useEffect } from "react";
import { listaProductos } from "../../api/producto";
import { listaPaciente } from "../../api/pacientes";
import { listaServicios } from "../../api/servicios";
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import '../paciente/Pacientes.css'

export const VentasPage = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [factura, setFactura] = useState('');
    const [rtn, setRtn] = useState('');
    const [vencimiento, setVencimiento] = useState('')


    const [cantidadP, setCantidadP] = useState('');
    const [cantidadS, setCantidadS] = useState('');


    const [selectedProductId, setSelectedProductId] = useState('');
    const [selectedServicioId, setSelectedServicioId] = useState('');
    const [ventas, setVentas] = useState([]);

    const atras = () => {
        navigate('../home');
    }

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const resProductos = await listaProductos();
                setProductos(resProductos.data);
            } catch (error) {
                console.log(error);
            }
        };

        const listarPacientes = async () => {
            try {
                const response = await listaPaciente();
                setPacientes(response.data);
            } catch (error) {
                console.error("Error al obtener pacientes:", error);
            }
        };

        const listarServicios = async () => {
            try {
                const response = await listaServicios();
                setServicios(response.data);
            } catch (error) {
                console.error("Error al obtener servicios:", error);
            }
        };

        fetchProductos();
        listarPacientes();
        listarServicios();
    }, []);

    const agregarProductoVenta = () => {
        if (selectedProductId && cantidadP) {
            const productoSeleccionado = productos.find(producto => producto.id === parseInt(selectedProductId));
            if (productoSeleccionado) {
                const nuevaVenta = {
                    id: productoSeleccionado.id,
                    nombre: productoSeleccionado.nombre_producto,
                    precio_unitario: productoSeleccionado.precio_unitario,
                    cantidad: parseInt(cantidadP),
                };
                setVentas([...ventas, nuevaVenta]);
            }
        }
    }

    const agregarServicioVenta = () => {
        if (selectedServicioId && cantidadS) {
            const servicioSeleccionado = servicios.find(servicio => servicio.id === parseInt(selectedServicioId));
            if (servicioSeleccionado) {
                const nuevaVenta = {
                    id: servicioSeleccionado.id,
                    nombre: servicioSeleccionado.nombre_servicio,
                    precio_unitario: servicioSeleccionado.precio_unitario,
                    cantidad: parseInt(cantidadS),
                };
                setVentas([...ventas, nuevaVenta]);
            }
        }
    }


    const sumaPrecios = () => {
        return ventas.reduce((total, venta) => total + (venta.precio_unitario * venta.cantidad), 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const generarPDF = () => {
        const doc = new jsPDF();

        // Fecha actual
        const fechaActual = new Date().toLocaleDateString();

        // Encabezado del PDF
        doc.text("Factura Dental", 10, 10);

        // Información adicional
        const pacienteSeleccionado = pacientes.find((p) => p.id === factura);
        console.log(factura);
        const nombrePaciente = pacienteSeleccionado ? pacienteSeleccionado.NombreCompleto : '';

        // Ubicación del bloque de información del paciente y RTN
        doc.text(`Dirigida a: ${nombrePaciente}`, 10, 20);
        doc.text(`RTN: ${rtn}`, 100, 20);

        // Ubicación del bloque de fecha de creación y estado de vencimiento
        doc.text(`Fecha de Creación: ${fechaActual}`, 10, 30);
        doc.text(`Estado de Vencimiento: ${vencimiento}`, 100, 30);

        // Resto del código para generar la tabla, similar al anterior
        // ...

        // Ubicación de la tabla de productos y totales
        const headers = ["N°", "Nombre", "Precio (unidad)", "Cantidad", "Importes"];
        let yPos = 60;

        doc.autoTable({
            head: [headers],
            startY: yPos,
        });

        const data = ventas.map((venta, index) => [
            index + 1,
            venta.nombre,
            `Lps. ${venta.precio_unitario}`,
            venta.cantidad,
            `Lps. ${venta.precio_unitario * venta.cantidad}`,
        ]);

        doc.autoTable({
            body: data,
            startY: yPos + 10,
        });

        doc.text(`Total: Lps. ${sumaPrecios()}`, 10, doc.autoTable.previous.finalY + 10);

        doc.save("factura.pdf");
    };

    return (
        <>
            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
            </div>
            <div className="paciente-container border col shadow p-4 mb-4">
                <div className=" border rounded titulo mb-3 text-center" >
                    <h2>Factura Dental</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label className="form-label">Factura a nombre de:</label>
                        <select
                            className="form-control"
                            value={factura.paciente}
                            onChange={(e) => setFactura(e.target.value)}
                        >
                            <option value="">Seleccione un paciente...</option>
                            {pacientes.map((paciente) => (
                                <option key={paciente.id} value={paciente.id}>
                                    {paciente.NombreCompleto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <div className="row">
                        <label className='form-label'>Numero Factura</label>
                        <input
                            className='form-control'
                            type="number"
                            value={rtn}
                            onChange={(e) => setRtn(e.target.value)}
                            placeholder="RTN"
                        />
                    </div>
                    <br />
                    <div className="row">
                        <label className="form-label">Estado de Vencimiento:</label>
                        <select
                            className="form-control"
                            value={vencimiento}
                            onChange={(e) => setVencimiento(e.target.value)}
                        >
                            <option value="">Seleccione el estado de vencimiento...</option>
                            <option value="pagado">pagado</option>
                            <option value="pendiente">pendiente</option>
                        </select>
                    </div>
                    <br />
                    <div className="col">
                        <div className="row">
                            <div className="col mb-3">
                                <label className='form-label'>Producto:</label>
                                <select className='form-control' value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                                    <option value="">Seleccione un producto...</option>
                                    {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>
                                            {producto.nombre_producto}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col mb-3">
                                <label className='form-label'>Cant:</label>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={cantidadP}
                                    onChange={(e) => setCantidadP(e.target.value)}
                                    placeholder="cantidad"
                                />
                            </div>
                        </div>
                        <div className="container d-flex row justify-content-center align-items-center">
                            <button className="btn-form d-grid col-4" type="button" onClick={agregarProductoVenta}>Agregar</button>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <label className='form-label'>Servicio:</label>
                                <select className='form-control' value={selectedServicioId} onChange={(e) => setSelectedServicioId(e.target.value)}>
                                    <option value="">Seleccione un servicio...</option>
                                    {servicios.map((servicio) => (
                                        <option key={servicio.id} value={servicio.id}>
                                            {servicio.nombre_servicio}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col mb-3">
                                <label className='form-label'>Cant:</label>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={cantidadS}
                                    onChange={(e) => setCantidadS(e.target.value)}
                                    placeholder="cantidad"
                                />
                            </div>
                        </div>
                        <div className="container d-flex row justify-content-center align-items-center">
                            <button className="btn-form d-grid col-4" type="button" onClick={agregarServicioVenta}>Agregar</button>
                        </div>

                    </div>


                    <br />

                    <div className="d-flex justify-content-center align-items-center">
                        <table className='flex table table-striped table-bordered mt-3'>
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">N°</th>
                                    <th className="text-center" scope="col">Nombre</th>
                                    <th className="text-center" scope="col">Precio (unidad)</th>
                                    <th className="text-center" scope="col">Cantidad</th>
                                    <th className="text-center" scope="col">Importes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map((venta, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{venta.nombre}</td>
                                        <td className="text-center">Lps.{venta.precio_unitario}</td>
                                        <td className="text-center">{venta.cantidad}</td>
                                        <td className="text-center">Lps. {venta.precio_unitario * venta.cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="text-center" colSpan="4">Total:</td>
                                    <td className="text-center">Lps.{sumaPrecios()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button className="btn-form d-grid col-5 mx-auto" type="submit" onClick={generarPDF}>Generar</button>
                </form>
            </div>
        </>
    );
};
