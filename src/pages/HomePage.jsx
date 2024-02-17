import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import { Card, Row, Col } from 'react-bootstrap';
import { FaUser, FaBriefcase, FaCalendar, FaList, FaShoppingCart, FaBullhorn } from 'react-icons/fa';
import { contarPaciente } from '../api/pacientes';
import { CitasProximas } from '../controllers/cita/CitasProximas';


export const HomePage = () => {
  const [totalPacientes, setTotalPacientes] = useState(0);

  useEffect(() => {
    contarPaciente()
      .then((response) => {
        setTotalPacientes(response.data.totalPacientes);
      })
      .catch((error) => {
        console.error('Error al obtener el recuento de pacientes: ' + error);
      });
  }, []);

  const navigate = useNavigate();

  const proveedores = () => {
    navigate('../proveedores')
  }

  const pacientes = () => {
    navigate('../pacientes')
  }

  const citas = () => {
    navigate('../citas')
  }

  const inventario = () => {
    navigate('../inventario')
  }

  const registros = () => {
    navigate('../bitacoras')
  }

  const ventas = () => {
    navigate('../venta')
  }

  return (
    <>
      <Row>
        <Col>
          <div className='tex'>
            <h1 >Área de Trabajo</h1>
          </div>
          <div className='containe-home-bton'>
            <Card className="cards-module" onClick={proveedores}>
              <Card.Body className="cards-module-body">
                <FaBullhorn className="icon" />
                <Card.Title className="cards-module-title">Proveedores</Card.Title>
              </Card.Body>
            </Card>

            <Card className="cards-module" onClick={inventario}>
              <Card.Body className="cards-module-body">
                <FaBriefcase className="icon" />
                <Card.Title className="cards-module-title">Inventario</Card.Title>
              </Card.Body>
            </Card>

            <Card className="cards-module" onClick={ventas}>
              <Card.Body className="cards-module-body">
                <FaShoppingCart className="icon" />
                <Card.Title className="cards-module-title">Ventas</Card.Title>
              </Card.Body>
            </Card>

            <Card className="cards-module " onClick={registros}>
              <Card.Body className="cards-module-body">
                <FaList className="icon" />
                <Card.Title className="cards-module-title">Registro</Card.Title>
              </Card.Body>
            </Card>

            <Card className="cards-module" onClick={citas}>
              <Card.Body className="cards-module-body">
                <FaCalendar className="icon" />
                <Card.Title className="cards-module-title">Citas</Card.Title>
              </Card.Body>
            </Card>

            <Card className="cards-module" onClick={pacientes}>
              <Card.Body className="cards-module-body">
                <FaUser className="icon" />
                <Card.Title className="cards-module-title">Pacientes</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Col >
        <Col>
          <div className="container-home">
            <div className="contador-pacientes">
              <h2>Recuento de Pacientes</h2>
              <p>Total de pacientes: <span>{totalPacientes}</span></p>
            </div>
            <div>
              <CitasProximas />
            </div>
          </div>
        </Col>
      </Row >
    </>
  )
}
