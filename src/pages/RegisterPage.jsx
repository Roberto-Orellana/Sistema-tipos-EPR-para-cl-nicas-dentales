import React, { useEffect, useState } from 'react';
import '../styles/registrarse.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContextUsuario } from '../context/usuarioContext';

export const RegisterPage = () => {
	const navigate = useNavigate();
	const { registrarUsuario, estaAutenticado, errors: errorBack } = useContextUsuario();
	const { register, handleSubmit, setError, clearErrors, formState: { errors, values } } = useForm();

	useEffect(() => {
		if (estaAutenticado) {
			navigate('/home', {
				replace: true,
			});
		}

	}, [estaAutenticado]);

	const registrar = async (data) => {
		// Calcula el tipo de suscripción, costo y fechas antes de enviarlas
		let tipoSuscripcion, costoSuscripcion;

		if (data.tipoSuscripcion === '1') {
			tipoSuscripcion = 1;
			costoSuscripcion = 8;
		} else if (data.tipoSuscripcion === '2') {
			tipoSuscripcion = 2;
			costoSuscripcion = 24;
		} else if (data.tipoSuscripcion === '3') {
			tipoSuscripcion = 3;
			costoSuscripcion = 96;
		}

		// Obtiene la fecha de inicio y calcula la fecha de finalización
		const fechaActual = new Date();
		const fechaFormateada = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}`;

		const fechaFinalizacion = new Date(fechaActual);
		fechaFinalizacion.setMonth(fechaFinalizacion.getMonth() + (data.tipoSuscripcion === '1' ? 1 : data.tipoSuscripcion === '2' ? 3 : 12));
		const fechaFormateadaFinal = `${fechaFinalizacion.getFullYear()}-${(fechaFinalizacion.getMonth() + 1).toString().padStart(2, '0')}-${fechaFinalizacion.getDate().toString().padStart(2, '0')}`;

		const datosUsuario = {
			...data,
			tipoSuscripcion,
			costoSuscripcion,
			fechaInicioSuscripcion: fechaFormateada,
			fechaFinSuscripcion: fechaFormateadaFinal,
		};

		// console.log('Datos a enviar:', datosUsuario);
		await registrarUsuario(datosUsuario);
		clearErrors('correo');
	};

	return (
		// Formulario para registrar un cliente (Odontologo)
		<div className="container-fluid d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "70vh" }}>
			<form onSubmit={handleSubmit(registrar)} className="shadow p-3 mb-5 bg-body rounded">
				<h1 className="mb-4 text-center">Registrarse</h1>
				<hr />
				<br />
				<div className="mb-3">
					<input
						required
						type="text"
						className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
						placeholder="Nombre"
						{...register("nombre", {
							pattern: {
								value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
								message: "Ingrese un nombre válido",
							},
						})}
					/>
					{errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}

				</div>
				<div className="mb-3">
					<input
						required
						type="text"
						className={`form-control ${errors.segundoNombre ? 'is-invalid' : ''}`}
						placeholder="Segundo nombre"
						{...register("segundoNombre", {
							pattern: {
								value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
								message: "Ingrese un segundo nombre válido",
							}
						})}
					/>
					{errors.nombre && <div className="invalid-feedback">Campo requerido</div>}
				</div>

				<div className="mb-3">
					<input
						required
						type="text"
						className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
						placeholder="Apellido"
						{...register("apellido", {
							pattern: {
								value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
								message: "Ingrese un apellido válido",
							}
						})}
					/>
					{errors.apellido && <div className="invalid-feedback">Campo requerido</div>}
				</div>
				<div className="mb-3">
					<input
						required
						type="text"
						className={`form-control ${errors.segundoApellido ? 'is-invalid' : ''}`}
						placeholder="Segundo apellido"
						{...register("segundoApellido", {
							pattern: {
								value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
								message: "Ingrese un segundo apellido válido",
							}
						})}
					/>
					{errors.apellido && <div className="invalid-feedback">Campo requerido</div>}
				</div>
				<div className="mb-3">
					<input
						required
						type="email"
						className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
						placeholder="Email"
						{...register("correo", {
							required: "Campo requerido",
							pattern: {
								value: /^[a-zA-Z0-9._-]+@gmail\.com$/,
								message: "Ingrese una dirección de correo de Gmail válida",
							},
						})}
					/>
					{errors.correo && (
						<div className="invalid-feedback">{errors.correo.message}</div>
					)}
				</div>

				<div className="mb-3">
					<input
						required
						type="tel"
						className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
						placeholder="Número de telefono"
						{...register("telefono", {
							required: "Campo requerido",
							pattern: {
								value: /^[0-9]*$/,
								message: "Ingrese un número de teléfono válido",
							},
						})}
					/>
					{errors.telefono && (
						<div className="invalid-feedback">{errors.telefono.message}</div>
					)}
				</div>

				<div className="mb-3">
					<input
						required
						type="password"
						className={`form-control ${errors.contracenia ? 'is-invalid' : ''}`}
						placeholder="Contraseña"
						{...register("contrasenia", { required: true })}
					/>
					{errors.contracenia && <div className="invalid-feedback">Campo requerido</div>}
				</div>
				{/* <div className="mb-3">
					<input
						required
						type="password"
						className={`form-control ${errors.contracenia ? 'is-invalid' : ''}`}
						placeholder="Repite la contraseña"
						{...register("repiteContracenia", { required: true })}
					/>
					{errors.contracenia && <div className="invalid-feedback">Campo requerido</div>}
				</div> */}
				<hr />
				<div className="mb-3 suscripcion">
					<h5 className="mb-2 text-center">Costo de la suscripción al mes: 8.00 $</h5>
					<select
						name="tipoSuscripcion"
						id=""
						className="form-select"
						{...register("tipoSuscripcion", { required: true })}

					>
						<option value="">Elige un plan</option>
						<option value="1">Mensual</option>
						<option value="2">Trimestral</option>
						<option value="3">Anual</option>
					</select>
				</div>
				<div className="d-flex justify-content-center">
					<button className="btn btn-success" type="submit">Enviar</button>
				</div>

			</form>
		</div>
	);
};
