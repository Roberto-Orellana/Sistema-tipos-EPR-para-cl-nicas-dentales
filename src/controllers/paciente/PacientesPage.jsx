import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import '../paciente/Pacientes.css'
import { PacientesTable } from './PacientesTable';
import { BsFillArrowLeftSquareFill, BsPlusSquareFill } from "react-icons/bs";

export const PacientesPage = () => {
    const navigate = useNavigate();

    const agregarPaciente = () => {
        navigate("../agregar-paciente");
    };

    const atras = () => {
        navigate('../home')
    }


    return (
        <>
            <h1 className="mt-4">Lista de Pacientes</h1>
            <div className='container-fluid d-flex justify-content-between'>
                <BsFillArrowLeftSquareFill onClick={atras} className='atras mt-3' />
                <BsPlusSquareFill onClick={agregarPaciente} className="agregar mt-3" />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='container-flex row d-inline '>
                    <div className='col'>
                        <PacientesTable />
                    </div>
                </div>
            </div>
        </>
    );
};
