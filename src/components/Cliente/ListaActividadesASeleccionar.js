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
import {deleteActivity, seleccionarOpcionEncuesta, listDictionaryWithInquest, openInquest, listarRegistrosEncuesta, statusIndices, listActivitiesByUser, rememberInquest, getEmployes, generateTable} from "services/ServiciosBackend.js"
import swal from 'sweetalert';
import CierreTomasTiempo from "components/Cliente/CierreTomasTiempo.js"



function ListaActividadesASeleccionar ()  {

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

    // // );
    const [columnas,setColumnas] = useState([])
    // const [listaEncuestasesion,setListaEncuestasSesion] = useState(listaEncuestas)
    const [busqueda,setBusqueda] = useState("")
    const [openModal, setOpenModal] = useState(false)



    
    useEffect (() => {
        async function CargaListaActividades() {

            try {
       
                const actividadesEncuesta = await listDictionaryWithInquest(token);
                const temp = await actividadesEncuesta
                console.log("ListaActividadesASeleccionars procesarSeleccionActividad 68: actividadesEncuesta", actividadesEncuesta)
                console.log("ListaActividadesASeleccionars cargaListaEncuentas 69: actividadesEncuesta.data.data", actividadesEncuesta.data.data)
                const arreglo = actividadesEncuesta.data.data

  
                }

                    
            catch(error) {
                swal("ERROR:\n"+error)
            }}
    
        CargaListaActividades()
        asignarColumnas()}, [listaActividades]);



    
    // Variables de Manejo de Apertura y Cierre de la linea de captura de Tiempos


    
    const seleccionActividad = (row) => {

        let variable="";
        if (row.nivel !== empresa.niveles ) {
            variable= (<div>{" "}</div>)}           
        else {
            if (!row.seleccionado)
                variable = (<div><button className="botoncheckbox"  onClick={ () => procesarSeleccionActividad(row)} ><i className="far fa-square"/></button></div>);  

            else

                variable = (<div><button className="botoncheckbox"  onClick={ () => procesarSeleccionActividad(row)} ><i className="far fa-check-square"/></button></div>)}
        return (<div>{variable}</div>)}                    

    const procesarSeleccionActividad = async (row) => {
        console.log("ListaActividadesASeleccionar/procesarSeleccionActividad !0!: row",row)
        row.seleccionado = !(row.seleccionado)

//  Nuevo codigo 
        try{

            if (row.seleccionado) {
                console.log("ListaActividadesASeleccionar/procesarSeleccionActividad !1!; seleccionarOpcionEncuesta Peticion",token, row.id )
                const encuestaAgregar = await  seleccionarOpcionEncuesta(token, {actividad: row.id});
                console.log("ListaActividadesASeleccionar/procesarSeleccionActividad !2! seleccionarOpcionEncuesta Respuesta",encuestaAgregar.data.data) 
                if (await encuestaAgregar.data.response==="ERROR")
                    throw await encuestaAgregar;
                console.log("ListaActividadesASeleccionar/procesarSeleccionActividad !3!: seleccionarOpcionEncuesta Respuesta",encuestaAgregar.data.data) }

            else {
                console.log("ListaActividadesASeleccionar/procesarSeleccionActividad !4!: eliminarRegistroEncuesta Peticion",token, row.id);
                const encuestaBorrar = await deleteActivity(token, row.id);
                console.log("ListaActividadesASeleccionar/procesarSeleccionActividad !5!: eliminarRegistroEncuesta Respuesta ", encuestaBorrar);
                if ( await encuestaBorrar.data.response==="ERROR")
                    throw await encuestaBorrar; }


// FinNuevoCodigo        

            const arregloModificado=listaActividades.map (actividad =>
                (actividad.id_actividad===row.id_actividad)
                ? row
                : actividad)
            setListaActividades(arregloModificado)
            // );        
             }

        catch (error) {
        // response es ERROR
            console.log ("ListaActividadesASeleccionar/procesarSeleccionActividad !6!:  eliminarRegistroEncuesta Error",error);
            swal ("ERROR:\n"+error)}}
           
            
    const formatearNombre = (row) => {
        const descripcion = row.descripcion
        let tnombre = row.nombre
        let variable=null
        const nivelActividad = row.id_actividad.length/3
        switch (empresa.niveles) {
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


        // console.log("ListaActividadesASeleccionar 113: indentado.length",indentado.length)

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
    const onChangeBusqueda = async e => {
        e.persist();
        setBusqueda(e.target.value);
        setListaActividades(filtrarElementos(e.target.value));}    

    const asignarColumnas = () => {
        setColumnas([

        {
            name: "Sel",
            cell: row => seleccionActividad(row),
            width: "30px",
        },

        {
            name: "Id_Actividad",
            cell: row => formatearIdActividad(row),
            width: "150px",
        },
        
        {
            name: "Nombre Actividad",
            cell: row => formatearNombre(row),
            width: "500px",
        },
        {
            name: "Descripcion Actividad",
            cell: row => formatearDescripcion(row),
            width: "300px",
        },
        ])}

  
    const paginacionOpciones={
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  



    function filtrarElementos(busqueda) {
        console.log("busqueda",busqueda)
        var search=listaPersonal.filter(item=>{
            if(item.id_actividad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) )

                {return item;}});
        return (search); }  

        
   
    return(

    <>    
        <Container fluid>   

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4" className="Title" style={{backgroundColor:"transparent" }}>Captura Tiempos</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                    <Row>
                                        <Col xs={3}>
                                            <input 
                                                type="text"
                                                placeholder="Buscar.."
                                                className="textField"
                                                name="busqueda"
                                                value={busqueda}
                                                onChange={onChangeBusqueda}
                                            />
                                            <button 
                                                type="button"
                                                className="btnBuscar" >
                                                <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                        </Col>
                                        <Col xs={9}/>
                                    </Row>
                                    <DataTable
                                        columns={columnas}
                                        data={listaActividades}
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

export default ListaActividadesASeleccionar
