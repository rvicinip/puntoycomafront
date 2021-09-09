import React, {useEffect} from "react"
import {useHistory} from "react-router-dom";
import {removeToken} from "services/ManejadorStorage";
import swal from 'sweetalert';
import {useAppContext} from "hooks/useAppContext";


function TerminarSesion() {

    useEffect ( () => {
        setToken("");
        setLayout("");
        setEmpresa("");
        setEmpleado("");
        setEmpresaConsultor("");
        setDiccionario("");
        setFrecuencia("");
        setTablaUnidadesTiempo("");
        setTablaUnidadesFrecuencia("");
    },[])

    // let history=useHistory()

    const {setToken, setLayout,setEmpresa, setEmpleado, perfil, setPerfil, setEmpresaConsultor, setDiccionario, setFrecuencia,
            setTablaUnidadesTiempo,setTablaUnidadesFrecuencia} = useAppContext();
    console.log("Terminar Sesión")
    if (perfil === "client")
        swal("Gracias por participar en el proyecto. Lo esperamos de nuevo");
    setPerfil("");
    setTimeout(() => {  window.location.href = "/"  }, 500);
    return (null)}
     

export default TerminarSesion
