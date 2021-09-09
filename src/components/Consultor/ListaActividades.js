import React, {useState, useEffect, Fragment} from 'react';
// import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from "react-select";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Button, Container, Form, Modal, Row, Col, Card} from "react-bootstrap"
import ReactTooltip from "react-tooltip"
import { useAppContext } from "hooks/useAppContext";
import { render } from 'react-dom';
import "assets/css/vena.css";
import {obtenerDiccionario, deleteActividad, seleccionarOpcionEncuesta, listDictionaryWithInquest, openInquest, listarRegistrosEncuesta, statusIndices, listActivitiesByUser, rememberInquest, getEmployes, generateTable} from "services/ServiciosBackend.js"
import swal from 'sweetalert';
import CierreTomasTiempo from "components/Cliente/CierreTomasTiempo.js"



function ListaActividades ()  {

    const { isOpenModalConsultarActividades, setIsOpenModalConsultarActividades, empresaConsultor, setEmpresaConsultor,  
    empresas, setEmpresas, formatearNivel, frecuencia, setFrecuencia, 
    empresa, empleado, tablas, diccionario, setDiccionario, token, setListaPersonal, listaPersonal,
    selectN1, selectN2, selectN3, selectN4, selectN5,
    inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
    diccN1,diccN2,diccN3, diccN4,diccN5,
    setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
    setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
    setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
    placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
    actividadCascadaSeleccionada, setActividadCascadaSeleccionada, listaActividades, setListaActividades,
    tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia } = useAppContext();   

    const icono1 = () => (<i className="fa fa-plus"></i>) 
    const icono2 = () => (<i class="fa fa-pencil-square-o" aria-hidden="true"></i>) 
    
    const [cantidad, setCantidad] = useState(0);
    const [selectUnTpo, setSelectUnTpo] = useState(null);
    const [selectFrecTpo, setSelectFrecTpo] = useState(null);
    const [diccFrecTpo, setDiccFrecTpo] = useState([]);
    
    // Variables de Trabajo de la linea de Captura de Grabacion Tiempos
    const placeholderCantTpo = "Ocurrencias";
    const placeholderUnTpo = "Unidad";
    const placeholderFrecTpo = "Frecuencia";
    
    // Variable de manejo de la linea de Captura
    const [inhabilitarDropdownFrecTpo, setInhabilitarDropdownFrecTpo] = useState(true);
    const [nivelFormateado, setNivelFormateado] = useState("");
    const [valorAnterior, setValorAnterior] = useState("");

    const [diccionarioActividades,setDiccionarioActividades] = useState(diccionario)// // );
    const [columnas,setColumnas] = useState([])
    // const [listaEncuestasesion,setListaEncuestasSesion] = useState(listaEncuestas)
    const [busqueda,setBusqueda] = useState("");
    const [cambios,setCambios] = useState(true);
    const [openModal, setOpenModal] = useState(false);



    useEffect(() => {
        // cargarActividades()
        asignarColumnas()
    }, [])   

      async function cargarActividades () {
        try {
            console.log("ListaActividades cargarActividades 1 Peticion:  token",token,"\nempresaConsultor.nit",empresaConsultor.nit )
            const cargaDiccionario=await obtenerDiccionario(token, empresaConsultor.nit)
            // console.log("ListaActividades cargarActividades 1 Respuesta cargaDiccionario",cargaDiccionario, cargaDiccionario.data.response )

            if (cargaDiccionario.data.response === "ERROR") {
                throw (cargaDiccionario)}
            const dataDiccionario=cargaDiccionario.data.data
            dataDiccionario.sort(function(a,b) {
                var textA = a.id_actividad.toLowerCase();
                var textB = b.id_actividad.toLowerCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; }) 
            setDiccionarioActividades(dataDiccionario)
            setDiccionario(dataDiccionario)}
        catch(error) {
            swal("ERROR:\nLista Actividades no pudo ser cargada.\n"+error);}}

            
    const formatearNombre = (row) => {
        const descripcion = row.descripcion
        console.log("ListaActividades 1: row",row, "\nempresaConsultor:", empresaConsultor)
        let tnombre = row.nombre
        let variable=null
        const nivelActividad = row.id_actividad.length/3
        switch (empresaConsultor.niveles) {
            case 1 : {
            variable = 
            (<div className="estiloN5 paddingN1">
               {row.nombre}
            </div>)
            break;}

            case 2 : {
            switch (true){
                case nivelActividad == 1 :
                    variable = (<div className="estiloN1 paddingN1">{tnombre()}</div>)
                    break;
                case nivelActividad === 2 :
                    variable = 
                    (<div className="estiloN5 paddingN2">
                       {row.nombre}
                    </div>)
                    break;}
            break;}
            case 3 : {
                switch (true){
                    case nivelActividad == 1 :
                        variable = (<div className="estiloN1 paddingN1">{tnombre.toUpperCase()}</div>)
                        break;
                    case nivelActividad === 2 :
                        variable = 
                        (<div className="estiloN2 paddingN2">
                           {row.nombre}
                        </div>)
                        break;
                    case nivelActividad === 3 :
                        variable = 
                        (<div className="estiloN5 paddingN3">
                              {row.nombre}
                        </div>)
                        }
                break;}
            case 4 : {
                switch (true){
                    case nivelActividad == 1 :
                        variable = (<div className="estiloN1 paddingN1"><Row><Col>{tnombre}</Col></Row></div>)
                        break;
                    case nivelActividad === 2 :
                        variable = 
                        (<div className="estiloN2 paddingN2">
                           {row.nombre}
                        </div>)
                        break;
                    case nivelActividad === 3 :
                        variable = 
                        (<div className="estiloN3 paddingN3">
                              {row.nombre}
                        </div>)
                        break;
                    case nivelActividad === 4 :
                        variable = 
                        (<div className="estiloN5 paddingN4">
                              {row.nombre}
                        </div>)
                        break; }
                break;}

            case 5 : {
                switch (true){
                    case nivelActividad == 1 :
                        variable = (<div className="estiloN1 paddingN1"><Row><Col>{tnombre}</Col></Row></div>)
                        break;
                    case nivelActividad === 2 :
                        variable = 
                        (<div className="estiloN2 paddingN2">
                           {row.nombre}
                        </div>)
                        break;
                    case nivelActividad === 3 :
                        variable = 
                        (<div className="estiloN3 paddingN3">
                              {row.nombre}
                        </div>)
                        break;
                    case nivelActividad === 4 :
                        variable = 
                        (<div className="estiloN4 paddingN4">
                              {row.nombre}
                        </div>)
                        break; 
                    case nivelActividad === 5 :
                        variable = 
                        (<div className="estiloN5 paddingN5">
                                {row.nombre}
                        </div>)
                        break;                    }
                break;}}      


        // console.log("ListaActividades 113: indentado.length",indentado.length)

        // const nNombre = ({indentado}{tnombre});
        // const nNombre = tnombre;
    return (<Fragment>
 
               {variable}

                <ReactTooltip place="top" type="dark" effect="float"/>
            </Fragment>)   } 
  
    const formatearDescripcion = (row) => {
        const descripcion1=row.descripcion;
        let dDescripcion=" ";
        if (descripcion1 === null) {
            dDescripcion = "   ";}
        else  {  
            dDescripcion= descripcion1.substr(0,100);}
        return (<div>{dDescripcion}</div>)} 

    const formatearIdActividad = (row) => {
        const variable=formatearNivel(row.id_actividad)
        const longvariable= variable.length
        const longblancos=19-longvariable
        const blancos=" ".repeat (longblancos)
        return (<div> {variable}</div>)   
    } 
    
    function borrarActividad(row) {
        return (<div><button className="eliminarcrud" onClick={ () => procesarBorrarActividad(row)} id={row.id}><i className="fa fa-trash" style={{ariaHidden: "true", color: "white"}} ></i></button></div>)}    

        
    async function procesarBorrarActividad(row) {
        try {
            const deletedActividad = await deleteActividad (token, row.id)
            console.log("ListaActividades procesarBorrarActividad 1: deletedActividad", deletedActividad, deletedActividad.data.response,deletedActividad.data.message)
            if (deletedActividad.data.response === "ERROR") {
                throw (deletedActividad)}
            swal("AVISO:\nActividad "+row.nombre+" ha sido borrada de esta Base de Datos");
            cargarActividades()}

        catch (error) {
            swal("ERROR:\nActividad "+row.nombre+" no ha sido borrada de esta Base de Datos.\n"+deletedActividad.data.message);}}



    const asignarColumnas = () => {
        setColumnas([

        {
            name: "Id_Actividad",
            cell: row => formatearIdActividad(row),
            width: "150px",
        },
        
        {
            name: "Nombre Actividad",
            cell: row => formatearNombre(row),
            width: "350px",
        },
        {
            name: "Descripcion Actividad",
            cell: row => formatearDescripcion(row),
            width: "350px",
        },
        { 
            name: "Borrar",
            cell: row => borrarActividad(row),
            width: "50px",
        },    
        ])}

  
    const paginacionOpciones={
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  


        
   
    return(

    <>    
        <Container fluid>   

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4" className="Title" style={{backgroundColor:"transparent" }}>Diccionario Actividades</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
 
                                    <DataTable
                                        columns={columnas}
                                        data={diccionarioActividades}
                                        pagination
                                        paginationComponentOptions={paginacionOpciones}
                                        fixedHeader
                                        fixedHeaderHeigth="600px"
                                        contextMessage={ {singular: 'actividad', plural: 'actividades', message: 'seleccionadas'} }
                                        noDataComponent={<span>No se encontró ningún elemento</span>}
                                    />
 
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    </>
 
    )}

export default ListaActividades
