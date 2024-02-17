
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const NuevaContra = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const onSubmit = async (data) => {

        try {
            const response = await fetch('https://proeyctodeindustria.xyz/actualizar-contrasenia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: data.correo, contrasenia: data.nuevacontrasenia }),
            });
            const result = await response.json();
            // navigate('../login', { state: { formData: data } });

            console.log(JSON.stringify({ correo: data.correo, contrasenia: data.nuevacontrasenia }))
            console.log(result)
            setError(result)
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
                navigate('../login')
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);


    return (
        <div className="container d-flex justify-content-center align-items-center " style={{ minHeight: "60vh", maxWidth: '500px' }}>
            <form onSubmit={handleSubmit(onSubmit, { resetOnSubmit: false })} className="shadow p-3 mb-5 bg-body rounded">
                {error && (<p className="alert alert-success text-center">{error.message}</p>)}
                <h1 className="mb-4 text-center">Restablecer Contraceña</h1>
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
                    placeholder="Nueva Contraseña"
                    className="form-control mb-3"
                    required
                    {...register("nuevacontrasenia", { required: true })}
                />
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success" >Enviar</button>
                </div>

            </form>

        </div>
    );

};
