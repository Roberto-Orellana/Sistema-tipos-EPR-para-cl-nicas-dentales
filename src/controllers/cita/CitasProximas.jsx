import React, { useState, useEffect } from 'react';
import { listarCitasCercanas } from '../../api/citas';

export const CitasProximas = () => {
  const [citasProximas, setCitasProximas] = useState([]);
  const [mensajeSinCitas, setMensajeSinCitas] = useState('');

  function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (!isNaN(date)) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
    } catch (error) {
        // Manejar errores, por ejemplo, si la fecha no es válida
    }

    // En caso de error o fecha no válida, regresa una cadena vacía o el valor original
    return "";
}


  useEffect(() => {
    const obtenerCitasProximas = async () => {
      try {
        const response = await listarCitasCercanas(); // Llamada a la API sin parámetros

        if (response.data && response.data.length > 0) {
          setCitasProximas(response.data);
          setMensajeSinCitas('');
        } else {
          setMensajeSinCitas('No hay citas para esta semana');
        }
      } catch (error) {
        console.error('Error al obtener las citas cercanas:', error);
        setMensajeSinCitas('Hubo un error al cargar las citas.');
      }
    };

    obtenerCitasProximas();
  }, []);

  return (
    <div className="citas-proximas">
      <h2>Citas Próximas</h2>
      {Array.isArray(citasProximas) && citasProximas.length ? (
        <ul className="lista-citas">
          {citasProximas.map(cita => (
            <li key={cita.id}>
              <p>Fecha programada: {formatDate(cita.fecha_reservacion)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='recordatorio-mensaje'>{mensajeSinCitas}</p>
      )}
    </div>
  );
};

