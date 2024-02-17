import React from "react";
import { Container, Row, Col, Navbar, Nav, Carousel } from 'react-bootstrap';
import { FaTooth, FaStethoscope, FaHeart, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'; // Importar los íconos necesarios
import './Landing.css';


export const Landing = () => {

    return (
        <div className="wrapper">

            <Navbar className="navi" expand="lg">
                {/* <Container>
                        <Navbar.Toggle aria-controls="navbarNav" />
                        <Navbar.Collapse id="navbarNav">
                            <Navbar.Brand href="#about">Acerca de</Navbar.Brand>

                            <Nav className="ml-auto">
                                <Nav.Link href="#services">Servicios</Nav.Link>
                                <Nav.Link href="#contact">Contáctenos</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container> */}
            </Navbar>
            <Container >
                <Carousel >
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block"
                            src="resourses/boca.jpg"
                            alt=""
                        />
                        <Carousel.Caption>
                            <h3>Optimiza tu Clínica Dental</h3>
                            <p className="Parafos">Descubre el mejor servicio SaaS para llevar la gestión de tu clínica a la nube.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1500}>
                        <img
                            className="d-block"
                            src="resourses/boca2.jpg"
                            alt=""
                        />
                        <Carousel.Caption>
                            <h3>Transforma tu Clínica Dental</h3>
                            <p className="Parafos">Experimenta el poder de nuestro ERP diseñado para clínicas dentales. ¡Todo en la nube!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block"
                            src="resourses/boca3.jpg"
                            alt=""
                        />
                        <Carousel.Caption>
                            <h3>Servicio de Vanguardia</h3>
                            <p className="Parafos">Llevamos tus servicios a la nube con las soluciones más avanzadas para tu clínica dental.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </Container>
            <Container className="Content pt-3">
                <Container>
                    <Row>
                        <Col>
                            <section className="colorDeFondo text-center " id="about">
                                <h1>Acerca de Nosotros</h1>
                                <p>En DentCloud, estamos comprometidos con la transformación digital de las clínicas dentales. Nos especializamos en ofrecer soluciones SaaS de vanguardia que simplifican la gestión diaria, permitiendo a las clínicas enfocarse en proporcionar un cuidado dental excepcional.</p>
                            </section>
                        </Col>
                    </Row>
                </Container>
                <Container style={{ width: '100% !important' }}>
                    <Row>
                        <Col>
                            <section className="Servicios colorDeFondo" id="services">
                                <Container>
                                    <h1>Servicios</h1>
                                    <Row>
                                        <Col >
                                            <div className="service-card">
                                                <FaTooth className="service-icon" />
                                                <h3>Gestión Integral de Pacientes:</h3>
                                                <p>Simplifica la gestión de pacientes con una plataforma integral que realiza recordatorios automáticos de citas</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <div className="service-card">
                                                <FaHeart className="service-icon" />
                                                <h3>Programación y Recordatorios Automatizados</h3>
                                                <p>Facilita la programación de citas para pacientes y mejora la puntualidad con recordatorios automáticos</p>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="service-card">
                                                <FaStethoscope className="service-icon" />
                                                <h3>Gestión Integral de Proveedores</h3>
                                                <p>Simplifica la gestión de proveedores con una plataforma integral</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                        </Col>
                    </Row>
                </Container>

            </Container>

            <footer className="d-flex mt-5 py-2 ">

                <Container>
                    <Row>
                        <Col>
                            <div className="mr-5">
                                <FaPhone className="contact-icon" /> (123) 456-7890
                                <FaEnvelope className="contact-icon" />info@dentista.com
                            </div>
                        </Col>
                        <Col>
                            <div className="mr-5">
                                <FaFacebook className="contact-icon" />
                                <FaTwitter className="contact-icon" />
                                <FaWhatsapp className="contact-icon" />
                            </div>
                        </Col>
                    </Row>
                </Container>

            </footer>

        </div>
    );

}
