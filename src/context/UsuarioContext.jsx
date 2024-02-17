// import { createContext, useContext, useEffect, useState } from "react";
// import { registrar, login, verificarToken } from "../api/registro";
// import Cookies from 'js-cookie'

// export const UsuarioContext = createContext();


// export const useContextUsuario = () => {
//     const context = useContext(UsuarioContext);

//     if (!context) {
//         throw new Error('Sirgió un error en el context');
//     }
//     return context;
// }


// export const UsuarioProvider = ({ children }) => {

//     const [usuario, setUsuario] = useState(null);
//     const [estaAutenticado, setEstaAutenticado] = useState(false);
//     const [errorBack, setErrorBack] = useState({});
//     const [cargando, setCargando] = useState(true)

//     const registrarUsuario = async (usuario) => {
//         try {
//             const res = await registrar(usuario);
//             console.log(usuario)
//             setUsuario(res.data);
//             console.log(res.data);
//             setEstaAutenticado(true)
//         } catch (error) {
//             setErrorBack(error.response.data);
//         }
//     };

//     const loginUsuario = async (usuario) => {
//         try {
//             const res = await login(usuario);
//             setUsuario(res.data);
//             setEstaAutenticado(true)
//         } catch (error) {
//             setErrorBack(error.response.data);
//             // console.log(error)
//         }
//     };

//     const salirUsuario = async () => {
//         Cookies.remove('token');
//         setEstaAutenticado(false);
//         setUsuario(null);
//     };

//     useEffect(() => {
//         async function VT() {
//             const cookies = Cookies.get();

//             if (!cookies.token) {
//                 setEstaAutenticado(false);
//                 setCargando(false);
//                 return setUsuario(null);
//             }
//             try {
//                 const res = await verificarToken(cookies.token);
//                 if (!res.data) { return setEstaAutenticado(false) }

//                 setEstaAutenticado(true);
//                 setUsuario(res.data);
//                 setCargando(false)
//             } catch (error) {
//                 setEstaAutenticado(false)
//                 setCargando(false);
//                 setUsuario(null);
//             }
//         }

//         VT()
//     }, [])

//     useEffect(() => {
//         if (errorBack) {
//             const timer = setTimeout(() => {
//                 setErrorBack({});
//             }, 4000);
//             return () => clearTimeout(timer);
//         }
//     }, [errorBack]);

//     return (
//         <>
//             <UsuarioContext.Provider value={{
//                 usuario,
//                 registrarUsuario,
//                 loginUsuario,
//                 salirUsuario,
//                 estaAutenticado,
//                 errorBack,
//                 cargando
//             }}>
//                 {children}
//             </UsuarioContext.Provider>
//         </>
//     );
// }

// export default UsuarioContext;

import { createContext, useContext, useEffect, useState } from "react";
import { registrar, login, verificarToken } from "../api/registro";
import Cookies from 'js-cookie'

export const UsuarioContext = createContext();


export function useContextUsuario() {
    const context = useContext(UsuarioContext);

    if (!context) {
        throw new Error('Sirgió un error en el context');
    }
    return context;
}


export const UsuarioProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    const [errorBack, setErrorBack] = useState({});
    const [cargando, setCargando] = useState(true)
    const [suscripcion, setSuscripcion] = useState(false);

    const registrarUsuario = async (usuario) => {
        try {
            const res = await registrar(usuario);
            console.log(usuario)
            setUsuario(res.data);
            setEstaAutenticado(true)
        } catch (error) {
            setErrorBack(error.response.data);
        }
    };

    const loginUsuario = async (usuario) => {
        try {
            const res = await login(usuario);
            setUsuario(res.data);
            console.log(res.data)
            setEstaAutenticado(true)
            setSuscripcion(res.data.suscripcionValida);
        } catch (error) {
            setErrorBack(error.response.data);
            setSuscripcion(false);
            // console.log(error.response.data)
        }
    };

    const salirUsuario = async () => {
        Cookies.remove('token');
        setEstaAutenticado(false);
        setUsuario(null);
    };

    useEffect(() => {
        async function VT() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setEstaAutenticado(false);
                setCargando(false);
                return setUsuario(null);
            }
            try {
                const res = await verificarToken(cookies.token);
                if (!res.data) { return setEstaAutenticado(false) }

                setEstaAutenticado(true);
                setUsuario(res.data);
                setCargando(false)
            } catch (error) {
                setEstaAutenticado(false)
                setCargando(false);
                setUsuario(null);
            }
        }

        VT()
    }, [])

    useEffect(() => {
        if (errorBack) {
            const timer = setTimeout(() => {
                setErrorBack({});
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [errorBack]);


    return (
        <>
            <UsuarioContext.Provider value={{
                usuario,
                registrarUsuario,
                loginUsuario,
                salirUsuario,
                estaAutenticado,
                suscripcion,
                errorBack,
                cargando
            }}>
                {children}
            </UsuarioContext.Provider>
        </>
    );
}

export default UsuarioContext;