// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useContextUsuario } from '../context/usuarioContext';

// export const LoginPage = () => {
// 	const navigate = useNavigate();

// 	const { loginUsuario, errorBack } = useContextUsuario();
// 	const { register, handleSubmit } = useForm();

// 	const login = async (data) => {
// 		await loginUsuario(data);
// 		navigate('/home')
// 	}

// 	return (

// 		<div className="container d-flex justify-content-center align-items-center " style={{ minHeight: "60vh", maxWidth: '500px' }}>
// 			<form onSubmit={handleSubmit(login, { resetOnSubmit: false })} className="shadow p-3 mb-5 bg-body rounded">
// 				{errorBack?.email && (<p className="alert alert-danger text-center">El usuario no existe</p>)}
// 				{errorBack?.contracenia && (<p className="alert alert-danger text-center">Contraseña incorrecta</p>)}
// 				<h1 className="mb-4 text-center">Iniciar sesión</h1>
// 				<hr />
// 				<br />
// 				<input
// 					type="email"
// 					placeholder="Email"
// 					className="form-control mb-3"
// 					required
// 					{...register("correo", { required: true })}
// 				/>
// 				<input
// 					type="password"
// 					placeholder="Contraseña"
// 					className="form-control mb-3"
// 					required
// 					{...register("contracenia", { required: true })}
// 				/>
// 				<div className="d-flex justify-content-center">
// 					<button className="btn btn-success">Enviar</button>
// 				</div>
// 			</form>

// 		</div>

// 	);
// };

import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContextUsuario } from '../context/usuarioContext';

export const LoginPage = () => {
	const navigate = useNavigate();

	const { loginUsuario, errorBack, suscripcion } = useContextUsuario();
	const { register, handleSubmit } = useForm();

	const login = async (data) => {

		await loginUsuario(data);
		navigate('/home')
	}

	return (

		<div className="container d-flex justify-content-center align-items-center " style={{ minHeight: "60vh", maxWidth: '500px' }}>
			<form onSubmit={handleSubmit(login, { resetOnSubmit: false })} className="shadow p-3 mb-5 bg-body rounded">
				{errorBack?.email && (<p className="alert alert-danger text-center">El usuario no existe</p>)}
				{errorBack?.contrasenia && (<p className="alert alert-danger text-center">Contraseña incorrecta</p>)}
				{errorBack?.suscripcionValida && (<p className="alert alert-danger text-center">Suscripcion terminada, contacte al administrador para renovar</p>)}
				<h1 className="mb-4 text-center">Iniciar sesión</h1>
				<hr />
				<br />
				<input
					type="email"
					placeholder="Email"
					className="form-control mb-3"
					required
					{...register("correo", { required: true })}
				/>
				<input
					type="password"
					placeholder="Contraseña"
					className="form-control mb-3"
					required
					{...register("contrasenia", { required: true })}
				/>
				<div className="d-flex justify-content-center">
					<button className="btn btn-success" >Enviar</button>
				</div>
				<div className="mt-3 text-left">
					<Link to="/restablecer-contrasenia">Recuperar contraseña</Link>
				</div>
			</form>

		</div>

	);
};
