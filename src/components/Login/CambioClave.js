// Componente: CambioClave.js
// Autor: Reinaldo Vicini
// Fecha: 2021/02/02
// Descripcion:
// Pide la nueva contraseña y la confirmación
// Parametros:
//

import React, { useState, useEffect, useRef, useHistory } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useAppContext } from "hooks/useAppContext";
import { changePasswordCliente } from "services/ServiciosBackend";
import "assets/css/vena.css";

// react-bootstrap components
import { Button, Form, Modal } from "react-bootstrap";

function CambioClave() {
  //  State para iniciar sesión

    const { empleado, token, setToken} = useAppContext();
    const [ready, setReady] = useState(false);
    const [anteriorContrasena, setAnteriorContrasena] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmaContrasena, setConfirmaContrasena] = useState("");

    const [
        isOpenModalCambioContrasena,
        setIsOpenModalCambioContrasena,
    ] = useState(false);

    useEffect(() => {
        manejarAperturaModalCambioContrasena();
    }, []);

    const manejarAperturaModalCambioContrasena = () =>
        setIsOpenModalCambioContrasena(true);

    const manejarCierreModalCambioContrasena = () =>
        setIsOpenModalCambioContrasena(false);

    const onChangeAnteriorContrasena = (e) => {
        setAnteriorContrasena(e.target.value);
        if (anteriorContrasena === "") setReady(false);
        else setReady(true);
        console.log("Anterior Contrasena", e.target.value);
        setAnteriorContrasena(e.target.value);
    };

    const onChangeNuevaContrasena = (e) => {
        setNuevaContrasena(e.target.value);
        if (nuevaContrasena === "") setReady(false);
        else setReady(true);
        
        console.log("Nueva Contrasena", e.target.value);
        setNuevaContrasena(e.target.value);
    };

    const onChangeConfirmaContrasena = (e) => {

        setConfirmaContrasena(e.target.value);
        if (confirmaContrasena === "") setReady(false);
        else setReady(true);
        console.log("Confirma Contrasena", e.target.value);
        setConfirmaContrasena(e.target.value);
    };

    const onSubmitCambioContrasena = async (e) => {

        e.preventDefault();

        console.log("CambioClave 73 confimaContrasena, nuevaContrasena", confirmaContrasena, nuevaContrasena)
        console.log("CambioClave 74 e", e)

 
        console.log("CambioClave 77 confimaContrasena, nuevaContrasena", confirmaContrasena, nuevaContrasena)
    
        if (confirmaContrasena !== nuevaContrasena) {
            swal("Error:\n"+"Debe entrar dos veces su nueva contraseña");}  

        if (anteriorContrasena === nuevaContrasena) {
            swal("ERROR: Ha solicitado cambiar contraseña. Su contraseña nueva debe ser distinta a la anterior. En caso contrario puede cancelar la operación" )
            noHayDatosCompletos = false;}

        try {

            let data = {
                id_usuario: empleado.id_usuario,
                clave: anteriorContrasena,
                nueva_clave: confirmaContrasena,};

            let noHayDatosCompletos=false;

            console.log("CambioClave 95: changePasswordCliente Petición", token, data);
            const cambioContrasena = await changePasswordCliente(token, data);
            console.log("CambioClave 97: changePasswordCliente Response", cambioContrasena.data, cambioContrasena.data.response);
            console.log("CambioClave 98: Cambiocontrasena",cambioContrasena.data.response,  )

            if (cambioContrasena!==undefined) {

                swal("Aviso:\n"+"Cambio de contraseña exitoso");    
                setAnteriorContrasena("");
                setNuevaContrasena("");
                setConfirmaContrasena("");
                manejarCierreModalCambioContrasena(); }}
              

        catch (error) {
            mensaje = cambioContrasena.data.message
            manejarCierreModalNuevaActividad();
            switch (true) {
            case cambioContrasena===undefined:
                setTimeout(() => { console.log("CierreRegistrarActividad 61: Linea Error de comunicacion. Vuelve a probar") }, 200); 
                swal("ERROR:\nERROR: Error de comunicación reintente por favor nuevamente")
                break;                
            case mensaje.search("nueva debe ser diferente de la actual")>-1:
                swal("ERROR:\n"+mensaje);
                break;             
            case mensaje.search("Usuario autenticado no corresponde")>-1: 
                swal("ERROR:\n"+mensaje);
                break;                         
            case mensaje.search("Error de base de datos de usuario")>-1: 
                swal("ERROR:\n"+mensaje);
            default:
                swal("OTRO ERROR:\n"+mensaje);   
                break; }}}
 

  return (
    <React.Fragment>
        <Modal
            show={isOpenModalCambioContrasena}
            onHide={manejarCierreModalCambioContrasena}
        >
            <Modal.Header closeButton={true}>
            <Modal.Title className="titulomodal">Cambio Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group>
                <label>Contraseña anterior</label>
                <Form.Control
                placeholder="Su contraseña anterior"
                type="password"
                id="anteriorContrasena"
                nombre="anteriorContrasena"
                value={anteriorContrasena}
                onChange={onChangeAnteriorContrasena}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <label>Contraseña nueva</label>
                <Form.Control
                placeholder="Su nueva contraseña"
                type="password"
                id="nuevaContrasena"
                nombre="nuevaContrasena"
                value={nuevaContrasena}
                onChange={onChangeNuevaContrasena}
                ></Form.Control>
            </Form.Group>
            <Form.Group>
                <label>Confirme Contraseña</label>
                <Form.Control
                placeholder="Confirme su nueva contraseña"
                type="password"
                id="confirmaContrasena"
                nombre="confirmaContrasena"
                value={confirmaContrasena}
                onChange={onChangeConfirmaContrasena}
                ></Form.Control>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button
                variant="secondary"
                onClick={manejarCierreModalCambioContrasena}
            >
                Cancelar
            </Button>
            <Button variant="primary" onClick={onSubmitCambioContrasena}>
                Cambiar Contraseña
            </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
    );
}

export default CambioClave;
