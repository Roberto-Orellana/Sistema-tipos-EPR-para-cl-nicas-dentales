import { Navigate, Outlet } from 'react-router-dom';
import { useContextUsuario } from '../context/usuarioContext';

export const PrivateRoute = () => {

	const { estaAutenticado, cargando } = useContextUsuario();

	if (cargando) return <h1>Cargando...</h1>

	return (
		!estaAutenticado && !cargando ? (
		  <Navigate to="/login" replace />
		) : (
		  <Outlet />
		)
	  );
};
