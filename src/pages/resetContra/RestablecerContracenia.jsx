
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const RestablecerContraceña = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const cancelar = () => {
        navigate('../login')
    };

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await fetch('https://proeyctodeindustria.xyz/restablecer-contrasenia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: data.correo }),
            });

            // if (!response.ok) {
            //     throw new Error(`Error: ${response.status}`);
            // }

            const result = await response.json();

            // Puedes acceder a los datos de la respuesta si es necesario
            console.log(result);

            // Luego, navegas a la página con los resultados
            navigate('../codigo', { state: { formData: data } });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center " style={{ minHeight: "60vh", maxWidth: '500px' }}>
            <form onSubmit={handleSubmit(onSubmit, { resetOnSubmit: false })} className="shadow p-3 mb-5 bg-body rounded">
                <h1 className="mb-4 text-center">Restablecer contraceña</h1>
                <hr />
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    required
                    {...register("correo", { required: true })}
                />
                <p>
                    Enviaremos un código de verificación de cuatro dígitos a tu correo electrónico.
                    Por favor, revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.</p>
                <div className=" d-flex justify-content-center">
                    <button className="btn btn-secondary me-2" onClick={cancelar}>cancelar</button>
                    <button className="btn btn-success" >Enviar</button>
                </div>
            </form>

        </div>
    );

};
