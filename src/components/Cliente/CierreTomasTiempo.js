import React, { useState, useEffect, useHistory  } from "react";
// import {useHistory} from "react-router-dom";
import {cerrarEncuesta} from "services/ServiciosBackend"
import {useAppContext} from "hooks/useAppContext";

import {
    Modal,
    Button,
} from "react-bootstrap";
import "assets/css/vena.css";


function CierreTomasTiempos(props) {

    const history = useHistory
    const { perfil, empresa, setEmpresa, empleado, setEmpleado, setLayout, setPerfil, setFrecuencia, tablas, 
        diccionario, token, setToken, listaActividades, setTablaUnidadesTiempo,setTablaUnidadesFrecuencia} = useAppContext();



    const [isOpenModalCierreTomasTiempo, setIsOpenModalCierreTomasTiempo] = useState(props.abrirModal);

    const manejarAperturaModalCierreTomasTiempo = () =>
      setIsOpenModalCierreTomasTiempo(true);
      
    const manejarCierreModalCierreTomasTiempo = () =>
      setIsOpenModalCierreTomasTiempo(false);
     
   
    useEffect(() => {
        setIsOpenModalCierreTomasTiempo(!isOpenModalCierreTomasTiempo)
    }, []);
    

    const onCierreTomasTiempo = async () => {
    // Se envia el conjunto de parametros para agregar un nuevo registro


    const actividades = listaActividades.filter(item => item.encuesta.cantidad === 0)
    if (actividades.length >0) {
        swal("Aún se encuentran actividades pendientes por su captura de tiempos. Termine su trámite para poder cerrar su proceso. Muchas gracias. ")
        manejarCierreModalCierreTomasTiempo ();}

    else {    


        try {
            manejarCierreModalCierreTomasTiempo ();
            console.log("CierreRegistrarActividad 44: Peticion cerrarEncuesta", token);
            const cierreencuesta = await cerrarEncuesta(token);

            if ( cierreencuesta.data.response==="ERROR"){
                throw await encuestaBorrar};

            swal("Gracias por su cooperación. Cualquier inquietud favor contactar a uno de nuestros consultores ")
            setToken("")
            setLayout("");
            setEmpresa("");
            setEmpleado("");
            setPerfil("");
            setEmpresaConsultor("");
            setDiccionario("");
            setFrecuencia("");
            setTablaUnidadesTiempo("");
            setTablaUnidadesFrecuencia("");
            setTimeout(() => {  window.location.href = "/"  }, 500);
            return (null)
            }  

  
    
        catch (error){


            manejarCierreModalCierreTomasTiempo ();  

            if ( await cierreencuesta === undefined ) {
                setTimeout(() => { console.log("CierreRegistrarActividad 63: Linea Error de comunicacion. Vuelve a probar") }, 25); 
                swal ("OTRO Error;\n"+error)              }

            else {   

                if (await cierreencuesta.data.response === "OK") {
                    console.log("CierreRegistrarActividad 69: Estuvo todo bien y está en el catch")   
                    setTimeout(() => {  window.location.href = "/"  }, 500);
                    return (null)}


                else {
                    // response es ERROR
                    console.log("CierreTomasTiempos 74: Encuesta devolvio error del backend", cierreencuesta)
                    swal ("ERROR CIERRE:\n"+cierreencuesta.data.message)
                    console.log ("autenticacion por error programado x software",cierreencuesta); }}}}}

    return (
        <React.Fragment>
        <div className="acomodarmodal">
        <Modal
            
            show={isOpenModalCierreTomasTiempo}
            onHide={manejarCierreModalCierreTomasTiempo}
        >
            <Modal.Header
            className="d-flex justify-content-center text-center"
            closeButton={true}
            >
            <Modal.Title className="titulomodal">Cierre del Proceso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div
                className="container fluid p-2 mt-3"
                style={{ border: "1px solid black", borderRadius: 5 }}
            >
                <div
                className="row justify-content-center"
                style={{ width: "100%" }}
                >
                <div className="CierreTomasTiempo">
                    <p className="lh-2 text-center pt-2" style={{ color: "blue" }}>
                    ATENCION!
                    </p>
                    <p className="cierre-registro">
                    Gracias por su Cooperación!
                    Aceptar indica que su proceso de captura de información
                    ha culminado exitosamente. 
                    Tenga en cuenta que al seleccionar <b>Finalizar Proceso</b> no podrá 
                    cambiar ningún dato. Oprima <b>Cancelar</b> si desea seguir modificando sus datos
                    </p>
                </div>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={manejarCierreModalCierreTomasTiempo}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={onCierreTomasTiempo}>
                Finalizar Proceso
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
        </React.Fragment>
    );
}

export default CierreTomasTiempos;
