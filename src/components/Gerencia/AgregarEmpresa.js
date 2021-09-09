import React, {useState, useEffect, Fragment} from 'react'
import { useAppContext } from "hooks/useAppContext";
import {Button, Container, Modal, Row, Col, Card, Form} from "react-bootstrap"
import {getCompaniesAll, createCompany} from "services/ServiciosBackend.js"

function AgregarEmpresa() {

    const { formatearNivel, empresa, empleado, tablas, diccionario, token, setlistaEmpresasSesion, listaEmpresasSesion,
        selectN1, selectN2, selectN3, selectN4, selectN5, setEmpresas, empresas,
        inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
        diccN1,diccN2,diccN3, diccN4,diccN5,
        setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
        setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
        setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
        placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
        actividadCascadaSeleccionada, setActividadCascadaSeleccionada,
        tablaUnidadesTiempo, tablaUnidadesFrecuencia} = useAppContext();
      
    

    const[nit, setNIT] = useState("");
    const[nombre, setNombre] = useState("");    
    const[niveles, setNiveles] = useState("");     
    const[ready, setReady] = useState(false);   
    const[isOpenModalAgregarEmpresa, setIsOpenModalAgregarEmpresa] = useState(true)
    
   
    
    const manejarCierreModalAgregarEmpresa = () => {
        setIsOpenModalAgregarEmpresa(false);
        setNIT("");
        setNombre("");
        
    }

    const onChangeNIT = (e) => {

        setNIT(e.target.value);
        if (nit === "") setReady(false);
        else setReady(true);
    };
    
    // Cambios en los valores del campo
    // Contrasena
    
    const onChangeNombre= (e) => {
    
        setNombre(e.target.value);
        if (nombre === "") setReady(false);
        else setReady(true);
    
    };

    const onChangeNiveles= (e) => {
    
        setNiveles(e.target.value);
        if (nombre === "") setReady(false);
        else setReady(true);
    
    };

    const onSubmitAgregarEmpresa = async () => {
        // Se envia el conjunto de parametros para agregar un nuevo registro
        // a la lista de empresas

        // Sort datos
    

        let empresas = listaEmpresasSesion;


        try {
            const empresaEsUnica=empresas.filter((entrada) => entrada.nit=== nit);
        
            if (empresaEsUnica.length > 0) {
                swal("ERROR:\nEmpresa ya existe. No puede ser agregada");
                manejarCierreModalAgregarEmpresa();}

            else {

                console.log("AgregarEmpresa 80; agregarnuevaempresa Peticion",token, nit, nombre, niveles)
                const nuevaEmpresa = await createCompany (token, {"nit": nit, "nombre": nombre, "niveles": niveles});
                console.log("Agregarempresa 82: seleccionarOpcionEncuesta Respuesta",nuevaEmpresa) ;
                if (nuevaEmpresa.data.response==="ERROR")
                    throw await nuevaEmpresa;
                console.log("Agregarempresa 176: seleccionarOpcionEncuesta Respuesta",nuevaEmpresa.data.data) 
       
                swal("AVISO:\nEmpresa Agregada Exitosamente. Por favor procesa a agregar sus datos en la opcion CARGA/DESCARGA y sus asociar sus consultores en CONSULTORES")
                manejarCierreModalAgregarEmpresa();
                console.log("Login 90: obtenerEmpresa Peticion",token);
    
                let resGerente = await getCompaniesAll(token);
                console.log("Login 99: Gerente ObtenerEmpresas Respuesta ",resGerente.data, resGerente);
        
                if (await resGerente.data.response==="ERROR")
                    throw resGerente.data ; 
        
                else {    
                console.log("Paso por aqui", resGerente.data.data)    
                let empresasClasificadas = resGerente.data.data
                empresasClasificadas.sort(function(a,b) {
                    var textA = a.nombre.toLowerCase();
                    var textB = b.nombre.toLowerCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; })
                setEmpresas(empresasClasificadas)}}}


        catch (error){ 
            manejarCierreModalAgregarEmpresa()
            if ( await nuevaEmpresa === undefined ) {
                setTimeout(() => { console.log("AgregarEmpresa 103: ") }, 25); 
                swal ("OTRO Error;\n"+error)             
            }

            else {   
                if (await nuevaEmpresa.data.response === "OK") {
                    console.log("AgregarEmpresa 109: Estuvo todo bien y está en el catch pero hay un error? ",error)}


                else {
                    // response es ERROR
                    console.log("AgregarEmpresas 114: Empresa devolvio error del backend", nuevaEmpresa)
                    swal ("ERROR:\n"+nuevaEmpresa.data.message)
                    console.log ("Autenticacion por error programado x software",nuevaEmpresa); }}}}

  

    return (
        <React.Fragment>
            <Modal
                show={isOpenModalAgregarEmpresa}
                onHide={manejarCierreModalAgregarEmpresa}
            >
                <Modal.Header closeButton={true}>
                <Modal.Title className="titulomodal">Agregar Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                    <label>NIT Empresa Cliente</label>
                    <Form.Control
                    placeholder="NIT/RUT de Empresa Cliente"
                    type="text"
                    id="nit"
                    nombre="nit"
                    value={nit}
                    onChange={onChangeNIT}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <label>Nombre Empresa</label>
                    <Form.Control
                    placeholder="Nombre de Empresa Cliente"
                    type="text"
                    id="nombre"
                    nombre="nombre"
                    value={nombre}
                    onChange={onChangeNombre}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <label>Niveles Diccionario</label>
                    <Form.Control
                    placeholder="Numero niveles Diccionario"
                    type="text"
                    id="niveles"
                    nombre="niveles"
                    value={niveles}
                    onChange={onChangeNiveles}
                    ></Form.Control>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={manejarCierreModalAgregarEmpresa}
                >
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onSubmitAgregarEmpresa}>
                    Crear Empresa
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
             
export default AgregarEmpresa
