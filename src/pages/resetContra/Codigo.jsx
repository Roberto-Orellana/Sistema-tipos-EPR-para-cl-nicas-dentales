
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Codigo = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state.formData;
    const [error, setError] = useState('');
    console.log(error)
    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://proeyctodeindustria.xyz/restablecer-contrasenia-codigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: formData.correo, codigo: parseInt(data.codigo) }),
            });

            const result = await response.json();

            if (result.message === true) {
                navigate('../nueva-contrasenia');
            } else {
                setError(result)
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="container d-flex justify-content-center align-items-center " style={{ minHeight: "60vh", maxWidth: '500px' }}>
            <form onSubmit={handleSubmit(onSubmit, { resetOnSubmit: false })} className="shadow p-3 mb-5 bg-body rounded">
                {error && (<p className="alert alert-danger text-center">{error.message}</p>)}
                <h1 className="mb-4 text-center">Restablecer contraceña</h1>
                <hr />
                <br />
                <input
                    type="text"
                    placeholder="Ingrese el código"
                    className="form-control mb-3"
                    required
                    {...register("codigo", { required: true })}
                />

                <div className="d-flex justify-content-center">
                    <button className="btn btn-success" >Verificar</button>
                </div>
            </form>
        </div>
    );

};
