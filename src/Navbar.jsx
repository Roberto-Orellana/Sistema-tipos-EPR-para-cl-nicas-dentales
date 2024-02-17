import React from 'react';
import './index.css'
import {
	Link,
	Outlet,
	useNavigate,
} from 'react-router-dom';

import { salir } from './api/registro';
import { useContextUsuario } from './context/usuarioContext';

export const Navbar = () => {
	const { usuario, estaAutenticado, salirUsuario } = useContextUsuario();
	const navigate = useNavigate();

	const landing = () => {
		navigate('/landing')
	}
	const home = () => {
		navigate('/home')
	}

	const onLogout = () => {
		salir();//Borrar las cookies en back
		salirUsuario();//Borrar las cookies en el naveg
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<>
			<nav className="navbar navbar-expand-md bg-success">
				<div className="container-fluid">

					<a className='text-light' onClick={home}></a>
					{estaAutenticado ? (
						<>
							<h1 className='logo'>
								<i className="bi bi-fan text-light text-left" onClick={home}></i>
							</h1>
							<div className='navbar-nav ms-auto mb-2 mb-lg-0 NavOculto'>


								<span style={{ fontSize: '16px' }} className='text-light p-3'>{usuario.nombre} {usuario.apellido}</span>
								<button className='btn btn-success' onClick={onLogout}>
									Cerrar sesión
								</button>

							</div>
						</>

					) : (
						<>
							<button className="navbar-toggler navbar-dark navbar-toggler-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<h1 className='logo'>
									<i className="bi bi-fan text-light" onClick={landing}></i>
								</h1>
								<ul className="navbar-nav ms-auto mb-2 mb-lg-0">

									<li className="nav-item">
										<Link className="nav-link active text-light" aria-current="page" to='#'>Servicios</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link active text-light" aria-current="page" to='#'>Acerca de</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link active text-light" aria-current="page" to='/login'>Iniciar sesión</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-light" to='/registrarse'>Registrarse</Link>
									</li>
								</ul>
							</div>

						</>
					)}

				</div >
			</nav >
			<Outlet />
		</>
	);
};
