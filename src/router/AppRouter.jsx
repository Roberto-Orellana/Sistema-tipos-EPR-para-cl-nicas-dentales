import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { HomePage } from '../pages/HomePage'
import { ModuloProveedor } from '../pages/Proveedor';
import { PrivateRoute } from './PrivateRoute';
import { UsuarioProvider } from '../context/usuarioContext';
import { DetalleProveedores } from '../controllers/proveedor/DetalleProveedor';
import { AgregarProveedor } from '../controllers/proveedor/AgregarProveedor';
import { PacientesPage } from '../controllers/paciente/PacientesPage';
import { EditarProveedor } from '../controllers/proveedor/EditarProveedor';
import { CitasPage } from '../controllers/cita/CitasPage';
import { InventarioProductosPage } from '../controllers/inventario/InventarioProductosPage';
import { VentasPage } from '../controllers/ventas/VentasPage';
import { RegistroPage } from '../controllers/registros/RegistroPage';
import { PacientesEditar } from '../controllers/paciente/PacientesEditar';
import { PacientesAgregar } from '../controllers/paciente/PacientesAgregar';
import { InventarioAgregarProducto } from '../controllers/inventario/InventarioAgregarProducto';
import { CitasAgregar } from '../controllers/cita/CitasAgregar';
import { InventarioEditarProducto } from '../controllers/inventario/InventarioEditarProducto';
import { InventarioAgregarServicio } from '../controllers/inventario/InventarioAgregarServicio';
import { InventarioEditarServicio } from '../controllers/inventario/InventarioEditarServicio';
import { InventarioServiciosPage } from '../controllers/inventario/InventarioServiciosPage';
import { InventarioHub } from '../controllers/inventario/InventarioHub';
import { RestablecerContraceña } from '../pages/resetContra/RestablecerContracenia';
import { Codigo } from '../pages/resetContra/Codigo';
import { NuevaContra } from '../pages/resetContra/NuevaContra';
import RegistrosCitas from '../controllers/registros/RegistrosCitas';

export const AppRouter = () => {
	return (
		<>
			<UsuarioProvider>
				<Routes>
					<Route path='/' element={<Navbar />}>
						<Route index element={<LandingPage />} />
						<Route path='login' element={<LoginPage />} />
						<Route path='registrarse' element={<RegisterPage />} />
						<Route path='landing' element={<LandingPage />} />
						<Route path='restablecer-contrasenia' element={<RestablecerContraceña />} />
						<Route path='codigo' element={<Codigo />} />
						<Route path='nueva-contrasenia' element={<NuevaContra />} />



						{/* Aquí todas las rutas privadas */}
						<Route element={<PrivateRoute />}>
							<Route path={'home'} element={<HomePage />} />
							{/* Rutas de proveedor */}
							<Route path={'proveedores'} element={<ModuloProveedor />} />
							<Route path={'detalle-proveedor'} element={<DetalleProveedores />} />
							<Route path={'agregar-proveedor'} element={<AgregarProveedor />} />
							<Route path={'actualizar-proveedor/:id'} element={<EditarProveedor />} />
							{/* Fin rutas proveedor */}
							{/* Rutas de citas */}
							<Route path={'citas'} element={<CitasPage />} />
							<Route path={'agregar-cita'} element={<CitasAgregar />} />
							{/* Fin rutas citas */}
							{/* Rutas de pacientes */}
							<Route path={'pacientes'} element={<PacientesPage />} />
							<Route path={'agregar-paciente'} element={<PacientesAgregar />} />
							<Route path={'actualizar-paciente/:id'} element={<PacientesEditar />} />
							{/* Rutas de venta */}
							<Route path={'venta'} element={<VentasPage />} />
							{/* Rutas de inventario */}
							<Route path={'inventario'} element={<InventarioHub />} />
							<Route path={'productos'} element={<InventarioProductosPage />} />
							<Route path={'agregar-producto'} element={<InventarioAgregarProducto />} />
							<Route path={'actualizar-producto/:id'} element={<InventarioEditarProducto />} />
							<Route path={'servicios'} element={<InventarioServiciosPage />} />
							<Route path={'agregar-servicio'} element={<InventarioAgregarServicio />} />
							<Route path={'actualizar-servicio/:id'} element={<InventarioEditarServicio />} />
							{/* Rutas de registro */}
							<Route path={'bitacoras'} element={<RegistroPage />} />
							<Route path={'registroscitas'} element={<RegistrosCitas />} />
						</Route>
					</Route>
				</Routes>
			</UsuarioProvider>
		</>
	);
};

