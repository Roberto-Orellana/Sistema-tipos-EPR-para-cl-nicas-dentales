import React from "react";
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { GiHealthIncrease, GiAbstract050 } from "react-icons/gi";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import './Inventario.css'


export const InventarioHub = () => {
    const navigate = useNavigate();

    const productos = () => {
        navigate('../productos')
    }

    const servicios = () => {
        navigate('../servicios')
    }

    const atras = () => {
        navigate('../home')
    }
    return (
        <>
            <div className="container-fluid d-flex justify-content-between">
                <BsFillArrowLeftSquareFill onClick={atras} className="atras mt-3" />
            </div>
            <Row className='tex justify-content-center align-items-center'>
                <Col>
                    <div className='tex justify-content-center align-items-center'>
                        <h1>
                            Inventario
                        </h1>
                    </div>
                    <div className='inventario-container-bton align-items-center'>
                        <Card className="cards-module" onClick={productos}>
                            <Card.Body className="cards-module-body">
                                <GiAbstract050 className="icon" />
                                <Card.Title className="cards-module-title">Productos</Card.Title>
                            </Card.Body>
                        </Card>

                        <Card className="cards-module" onClick={servicios}>
                            <Card.Body className="cards-module-body">
                                <GiHealthIncrease className="icon" />
                                <Card.Title className="cards-module-title">Servicios</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    );
}