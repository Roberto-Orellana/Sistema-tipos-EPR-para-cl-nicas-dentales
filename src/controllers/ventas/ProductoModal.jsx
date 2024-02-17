import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Importa los componentes de modal y botón de React Bootstrap
import { listaProductos } from "../../api/producto";


export const ProductoModal = ({ show, handleClose, handleProductoSelection }) => {
    const [productos, setProductos] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
  
    useEffect(() => {
      const obtenerProductos = async () => {
        try {
          const response = await listaProductos();
          setProductos(response.data);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      };
  
      obtenerProductos();
    }, []);
  
    const handleProductoChange = (e) => {
      setSelectedProductId(e.target.value);
    };
  
    const handleGuardarProducto = () => {
      // Encuentra el producto seleccionado en la lista de productos
      const selectedProduct = productos.find((product) => product.id === selectedProductId);
  
      // Envía el producto seleccionado al componente padre (VentasPage)
      handleProductoSelection(selectedProduct);
  
      // Cierra el modal
      handleClose();
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <select value={selectedProductId} onChange={handleProductoChange}>
              <option value="">Seleccione un producto...</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre_producto}
                </option>
              ))}
            </select>
            {/* Otros campos del producto si es necesario */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarProducto}>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };