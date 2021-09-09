import React, { useState, useEffect } from "react";
import { Modal, Container, Col, Form, Card, Row, Button } from "react-bootstrap";
import Select from "react-select";
import {getInfoFull, getConsultors, getEmployes, obtenerEmpresaFull} from "services/ServiciosBackend";
import { useAppContext } from "hooks/useAppContext";

function SeleccionEmpresa() {

  const {
        setArchivosEnCarga, empresaConsultor, setEmpresaConsultor, empresas, setEmpresas, formatearNivel, frecuencia, setFrecuencia, layout, setLayout,
        empresa, empleado, tablas, diccionario, setDiccionario, token, setListaPersonal, listaPersonal,
        selectN1, selectN2, selectN3, selectN4, selectN5,
        inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
        diccN1,diccN2,diccN3, diccN4,diccN5,
        setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
        setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
        setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
        placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
        actividadCascadaSeleccionada, setActividadCascadaSeleccionada,
        tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia} = useAppContext();   

    const [isOpenModalSeleccionEmpresa, setIsOpenModalSeleccionEmpresa] = useState(true);
    const placeholderSeleccionEmpresa = "Seleccione Empresa..";
    var listaPersonalCargada = [];





    const manejarAperturaModalSeleccionEmpresa = () => {
        setIsOpenModalSeleccionEmpresa(true);  };

    const manejarCierreModalSeleccionEmpresa = () =>
        setIsOpenModalSeleccionEmpresa(false);

    const onChangeSeleccionEmpresa = (obj) => {
        console.log("Empresas",empresas)
        console.log("SeleccionEmpresa 53: obj", obj) 
        setEmpresaConsultor(obj);     };

    function UnidadFrecuencia(frecuencias,valorHoras) {
        var arreglo=[];
        for (var i=0; i<frecuencias.length; i+=1) {
        if (frecuencias[i].tipo==2)  
            arreglo.push( {
            id: frecuencias[i].id,
            nombre:frecuencias[i].nombre,
            tipo: frecuencias[i].tipo,
            valor: frecuencias[i].valor,
            empresa: frecuencias[i].empresa,
            unidad: frecuencias[i].unidad,
            ahoras: frecuencias[i].valor*valorHoras}) }
        return arreglo;}

    const onSeleccionEmpresa = async () => {
                
    try {
        
        console.log ("SeleccionEmpresa onSeleccionEmpresa 59: empresaConsultor", empresaConsultor);
        if (empresaConsultor === "")
            swal("ERROR:\nNo seleccionó empresa alguna. Proceda de nuevo");
        else   {   
            console.log("SeleccionEmpresa 63: empresas", empresas);

            let datos = {
            token: token,
            id_empresa: empresaConsultor.nit,};

            console.log("SeleccionEmpresa 69: obtenerEmpresaFull", datos.token, datos.id_empresa);

            const archivosCargados = await getInfoFull(token, empresaConsultor.nit)
            const estatusArchivos = await archivosCargados.data.data
            console.log("Login 195: archivosCargados", archivosCargados, archivosCargados.data)

            if (await archivosCargados.data.response==="ERROR")
                throw archivosCargados ; 
            setArchivosEnCarga(estatusArchivos);
            if (estatusArchivos.diccionario !== 'cargado' || estatusArchivos.empleado !== 'cargado' || estatusArchivos.frecuencia !== 'cargado'){
                swal ("ADVERTENCIA:\n Información de la empresa para poder realizar su proceso no se encuentra aún totalmente cargada. Favor proceda a preparar y cargar los archivos en la opcion CARGA/DESCARGA\nDiccionario: "+estatusArchivos.diccionario+"\nFrecuencia: "+estatusArchivos.frecuencia+"\nPersonal: "+estatusArchivos.empleado)
                if (empleado.perfil === "director") 
                    setLayout("/gerencia-nva");
                else {    
                    setLayout("/empresa-nva");}
                manejarCierreModalSeleccionEmpresa()}

            else   {

                const resData = await obtenerEmpresaFull(datos.token, datos.id_empresa);

                if (await resData.data.response === "ERROR") {

                    console.log("SeleccionEmpresa 74: Entro por try buscando el error")
                    switch (true) {

                    case (resData.data.message.includes("No se encontró el diccionario de la empresa")) :
                        console.log("SeleccionEmpresa 78: Entro por No se encontró el diccionario - empleado.perfil", empleado.perfil)                   
                        if (empleado.perfil === "director") 
                            setLayout("/gerencia-nva");
                        else {    
                            swal ("Entró en todo caso")
                            Layout("/empresa-nva");}
                        manejarCierreModalSeleccionEmpresa()
                        break;
                    case (resData.data.message.includes("No se encontraron frecuencias")) :
                        console.log("SeleccionEmpresa 87: Entro por No se encontraron frecuencias")
                        if (empleado.perfil === "director") 
                            setLayout("/gerencia-nva");
                        else    
                            Layout("/empresa-nva");
                        manejarCierreModalSeleccionEmpresa()
                        break;
                    case (resData.data.message.includes("No se encuentran empleados")) :
                        console.log("SeleccionEmpresa 95: Entro por No se encuentras empleados")                    
                        if (empleado.perfil === "director") 
                            setLayout("/gerencia-nva");
                        else    
                            Layout("/empresa-nva");
                            manejarCierreModalSeleccionEmpresa()    
                            break;            
                    default :
                        console.log("SeleccionEmpresa 103: entro por Lo tira hacia el catch")
                        throw await resData 
                        break;}}
                else {        
                
                    const frecuenciaSesion = await resData.data.data.frecuencia;
                    const diccionarioSesion = await resData.data.data.diccionario;
                    const listaPersonalCargada = await resData.data.data.empleado;
                    diccionarioSesion.sort(function(a,b) {
                        var textA = a.id_actividad.toLowerCase();
                        var textB = b.id_actividad.toLowerCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; })


                    let horas=frecuenciaSesion.filter((entrada) => entrada.nombre==="Dia" && entrada.tipo==1);
                    let valorHoras=horas[0].valor;
                    
                    const tablaUnidadesFrecuenciaSesion = UnidadFrecuencia(frecuenciaSesion,valorHoras);
                    const tablaUnidadesTiempoSesion= frecuenciaSesion.filter ((entrada) => entrada.tipo == 1);

                    listaPersonalCargada.sort(function(a,b) {
                    var textA = a.id_usuario.toLowerCase();
                    var textB = b.id_usuario.toLowerCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; }) 

                    console.log("SeleccionEmpresa 104: listaPersonalCargada-Correcto",listaPersonalCargada)

                    console.log("SeleccionEmpresa 106: listaPersonalCargada - Funcionando como arreglo")
                    const list = listaPersonalCargada.map(el => console.log("Elemento:", el.id_usuario, el))
                

                    // Cuando todo esté completo y esté listo entonces si se setean TODAS
                    // las variables de estado para evitar rerenders innecesarios
                    console.log ("SeleccionEmpresa 124 Layout", layout, empleado)
                    if (empleado.perfil === "director") 
                        setLayout("/gerencia");
                    else    
                        setLayout("/empresa");
                        setListaPersonal(listaPersonalCargada);
                        setFrecuencia(frecuenciaSesion);
                        setDiccionario(diccionarioSesion);
                        setTablaUnidadesTiempo(tablaUnidadesTiempoSesion);
                        setTablaUnidadesFrecuencia(tablaUnidadesFrecuenciaSesion);    
                        manejarCierreModalSeleccionEmpresa();

                }}}}

    catch (error) {

        switch (true) {

        case (resData === undefined):
            swal ("ERROR TABLAS:\n"+error);
            console.log ("ResData Por error no definido",resData);
            // setTimeout(() => {  window.location.href = "/"  }, 500);
            break;    

        case (resData.data.response === "ERROR"): 
                swal ("ERROR TABLAS:\n"+resData.data.message);
                console.log ("resData por error programado x software",resData);
                // setTimeout(() => {  window.location.href = "/"  }, 500);}}
            break;

        case (personal === undefined):
            swal ("ERROR TABLAS:\n"+error);
            console.log ("ResData Por error no definido",personal);
            // setTimeout(() => {  window.location.href = "/"  }, 500);
            break;    

        case (personal.data.response === "ERROR"):
            swal ("ERROR TABLAS:\n"+personal.data.message)
            console.log ("personal por error programado x software",personal);
            // setTimeout(() => {  window.location.href = "/"  }, 500);
            break;

        default:
        swal ("OTRO Error;\n"+error)  
        break;  }}};

    // manejarAperturaModalSeleccionEmpresa();
    return (
    <React.Fragment>
        <Modal
        size="sm"
        show={isOpenModalSeleccionEmpresa}
        onHide={manejarCierreModalSeleccionEmpresa}>
        <Modal.Header closeButton>
            <Modal.Title>Selección Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Select
                    className="select"
                    placeholder={placeholderSeleccionEmpresa}
                    name={empresaConsultor}
                    options={empresas}
                    onChange={onChangeSeleccionEmpresa}
                    getOptionName={(option) => option.nit}
                    getOptionLabel={(option) => option.nombre}
                />    
            </div>                    
        </Modal.Body>
        <Modal.Footer>
            <Button
                variant="secondary"
                onClick={manejarCierreModalSeleccionEmpresa}
            >
                Cerrar
            </Button>
            <Button
                variant="primary"
                onClick={onSeleccionEmpresa}
            >
                Seleccionar
            </Button>
        </Modal.Footer>
    </Modal>
    
    </React.Fragment>
    );
}

export default SeleccionEmpresa;
