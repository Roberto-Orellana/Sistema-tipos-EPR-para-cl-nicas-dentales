
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { CitasAgregar } from './CitasAgregar';
import './Citas.css'
import { CitasTable } from './CitasTable';
import { BsFillArrowLeftSquareFill,BsPlusSquareFill } from "react-icons/bs";


export const CitasPage = () => {
    const navigate = useNavigate();
    const atras = () => {
        navigate('../home')
    }

    const agregarCita = () =>{
        navigate('../agregar-cita')
    }

    return (
        <>
            <h1>Estas en Citas</h1>
            {/* Contenido de la página de Ventas */}

            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
                <BsPlusSquareFill onClick={agregarCita} className="agregar mt-3" />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='col-6'>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='container-flex row d-inline'>
                    <CitasTable />
                </div>

            </div>
        </>
    );
};

