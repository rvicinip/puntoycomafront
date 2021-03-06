import React, {useState, useEffect, Fragment} from 'react';
// import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Button, Container, Modal, Row, Col, Card} from "react-bootstrap"
import { useAppContext } from "hooks/useAppContext";
import { render } from 'react-dom';
import "assets/css/vena.css";
import {homologateActivities, openInquest, listarRegistrosEncuesta, statusIndices, listActivitiesByUser, rememberInquest, getEmployes, generateTable} from "services/ServiciosBackend.js"
import swal from 'sweetalert';
import VerEncuesta from "components/Consultor/VerEncuesta.js"
import EncuestasTabla from "components/Consultor/EncuestasTabla.js"
import StateManager from 'react-select';


function ListaPersonal ()  {

    const { isOpenModalVerEncuesta, setIsOpenModalVerEncuesta,isOpenModalConsultarActividades, setIsOpenModalConsultarActividades, empresaConsultor, setEmpresaConsultor,  
    empresas, setEmpresas, formatearNivel, frecuencia, setFrecuencia, 
    empresa, empleado, tablas, diccionario, setDiccionario, token, setListaPersonal, listaPersonal,
    selectN1, selectN2, selectN3, selectN4, selectN5,
    inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
    listaSeleccion, setListaSeleccion, diccN1,diccN2,diccN3, diccN4,diccN5,
    setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
    setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
    setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
    placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
    actividadCascadaSeleccionada, setActividadCascadaSeleccionada, listaActividades, setListaActividades,
    tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia } = useAppContext();   

    const [columnas,setColumnas] = useState([])
    const [listaPersonalSesion,setListaPersonalSesion] = useState(listaPersonal)
    const [busqueda,setBusqueda] = useState("")
    const [encuestasTotal,setEncuestasTotal] = useState("")
    const [encuestasPendiente,setEncuestasPendiente] = useState(0)
    const [encuestasEnDesarrollo,setEncuestasEnDesarrollo] = useState(0)
    const [encuestasTerminado,setEncuestasTerminado] = useState(0)
    const [modal, setModal]=useState(null)

    var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',});   

    async function Recalcula() {
        let indicador = await CalcularValores(token,empresaConsultor.nit) ;
        console.log("ListaPersonal, useEffect refrescar cada 45 segundos", indicador) 
        return indicador }

    useEffect ( () => {
        async function Recalcula() {
            let indicador = await CalcularValores(token,empresaConsultor.nit) ;
            console.log("ListaPersonal, useEffect refrescar cada 45 segundos", indicador) 
            return indicador }
            
        let indicador = Recalcula()}, [])   


    useEffect ( () => {

        const interval = setInterval(()=>{
            let indicador = Recalcula()  
        },45000)    

    return()=>clearInterval(interval) }, )

    
    useEffect (() => {
        async function CargaListaPersonal() {
            const empleados= await getEmployes(token, empresaConsultor.nit);
            const listaPersonalActualizada = await empleados.data.data; 
            await setListaPersonal(listaPersonalActualizada);
            await setListaPersonalSesion(listaPersonalActualizada); 
        return listaDePersonal   } 
        const listaDePersonal=CargaListaPersonal()
        console.log("ListaPersonal, useEffect cambio en indicadores 86 listaPersonal",listaDePersonal)
        console.log("ListaPersonal, useEffect cambio en indicadores 87 indicadores de cambio", encuestasTotal, encuestasPendiente, encuestasEnDesarrollo, encuestasTerminado)         
        
        asignarColumnas()}, [encuestasTotal, encuestasPendiente, encuestasEnDesarrollo, encuestasTerminado]);


    async function CalcularValores(token, nit ) {
        const indices = await statusIndices(token, nit)
        const indicadores = await indices
        setEncuestasTotal(indicadores.Total);
        setEncuestasPendiente(indicadores.Pendiente);
        setEncuestasEnDesarrollo(indicadores.Desarrollo);
        setEncuestasTerminado(indicadores.Terminado);
        return  indicadores } 

    const miEstadoEncuesta = (estado, id_usuario) => {
    console.log("ListaPersonal 84 miEstadoEncuesta estado", estado, id_usuario)
    let variable="";
    switch (estado) {
        case "Pendiente":
            variable = <div><span className="badge" style={{backgroundColor: "#fa1825"}}>{estado}</span></div>;
            break;
        case "Desarrollo":
            variable = <div><span className="badge" style={{backgroundColor: "#ff9510"}}>{estado}</span></div>;
            break;
        case "Terminado":
            variable=<div><span className="badge" style={{backgroundColor: "#87cb16"}}>{estado}</span></div>;
            break;}
        return variable  } 
    
    const verJornada = (jornada) => {
        console.log("ListaPersonal 99: Jornada estado", jornada)
        let variable="";
        switch (jornada) {
            case "Diurna":
                variable = <div><span className="badge" style={{backgroundColor: "transparent", color: "black"}}><i className="far fa-sun"/></span></div>;
                break;
            case "Nocturna":
                variable = <div><span className="badge" style={{backgroundColor: "transparent", color: "black"}}><i className="fa fa-moon"/></span></div>;
                break;}
        return variable  }   

    // function enviarEmail(row) {        
    //     let mostrarEmail = " "
    //     console.log("ListaPersonal 133: row.email", row.email )
    //     if (row.email!=="") 
    //         return (<div><button className="enviaremailcrud" onClick={() => procesarEnvioEmail(row)} id={row.id_usuario} ><i className="fa fa-envelope"/></button></div>)
    //     else
    //         return (<div>{" "}</div>)};            
 
    function reabrirUsuario (row) {
        console.log("ListaPersonal/reabrirUsuario 1: row", row)
        if (row.estadoEncuesta === "Pendiente" || row.estadoEncuesta === "Desarrollo") {
            return (<div>{" "}</div>)}           
        else {
            return (<div><button className="abiertocrud" onClick={ () => procesarReabrirUsuario(row)} id={row.id_usuario}><i className="fa fa-unlock-alt"/></button></div>)}}   

    function duplicarEncuesta (row) {
        console.log("ListaPersonal/duplicarEncuesta 1: row", row)
        if (row.estadoEncuesta === "Pendiente" || row.estadoEncuesta === "Desarrollo") {
            return (<div>{" "}</div>)}           
        else {
            return (<div><button className="crearcrud" onClick={ () => procesarDuplicarEncuesta(row)} id={row.id_usuario}><i className="far fa-clone"></i></button></div>)}}           
        
 
    function verEncuesta(row) {
        console.log("ListaPersonal/verEncuesta 1: row", row)
        if (row.estadoEncuesta === "Terminado" || row.estadoEncuesta === "Desarrollo") {
            return (<div><button className="totalcrud" onClick={ () => procesarVerEncuesta(row)} id={row.id_usuario}><i className="far fa-eye"  ></i></button></div>)}            
  
        else {
            return (<div>{" "}</div>)}}    
            // return (<div><button className="crearcrud" onClick={ () => procesarDuplicarEncuesta(row)} id={row.id_usuario}><i className="far fa-clone"></i></button></div>)}}           

 
    async function procesarVerEncuesta (row) {


        console.log("ListaPersonal/procesarVerEncuesta 1: row", row)
        setIsOpenModalVerEncuesta(true)
        const fila=row
        console.log("ListaPersonal/procesarVerEncuesta 1: Peticion", fila, token, fila.id_usuario)
        const actividadesEncuesta = await listActivitiesByUser (token, fila.id_usuario);
        console.log("ListaPersonal/procesarVerEncuesta 2: Respuesta", actividadesEncuesta)
        // const actividadesEncuesta = [{
        //     cadena_de_valor: "Estrategia",
        //     ceno: "Critica",
        //     descripcion: "En las reapreciaciones anuales realizadas por el comit?? de Planeaci??n se revisa la Misi??n de acuerdo al entorno actual y a las condiciones de la Cooperativa en el momento de la revisi??n",
        //     empresa: "567654",
        //     encuesta: {
        //     FteUser: null,
        //     actividad: 463,
        //     cantidad: 20,
        //     estado: "A",
        //     frecuencia: null,
        //     fteAct: null},
        //     id: 411,
        //     jornada: null,
        //     nombreFrecuencia: "Dias",
        //     nombreUmedida: "Mes",
        //     tiempo: null,
        //     umedida: null,
        //     usuario: "1064029",
        //     valorAct: null,
        //     id: 463,
        //     id_actividad: "001001001001",
        //     mas: "Manual",
        //     nivel: 4,
        //     nombre: "Definici??n o revisi??n de misi??n",
        //     padre: "001001001",
        //     phva: null,
        //     seleccionado: true,
        //     tablaFrecuenciasFiltrada: [
        //        {id: 137, nombre: "Dia", tipo: 2, valor: 1, empresa: "567654", },
        //        {id: 138, nombre: "Semana", tipo: 2, valor: 5, empresa: "567654", },
        //        {id: 139, nombre: "Quincena", tipo: 2, valor: 10, empresa: "567654",},
        //        {id: 140, nombre: "Mes", tipo: 2, valor: 20, empresa: "567654", },
        //        {id: 141, nombre: "Bimestre", tipo: 2, valor: 40, empresa: "567654", },
        //        {id: 142, nombre: "Trimestre", tipo: 2, valor: 60, empresa: "567654", },
        //        {id: 143, nombre: "Semestre", tipo: 2, valor: 120, empresa: "567654", },
        //        {id: 144, nombre: "A??o", tipo: 2, valor: 240, empresa: "567654", }],
        //     tipo: "Admin",
        //     tipo_macroproceso: null,
        // }]
        const arregloActividades = await actividadesEncuesta.data.data;
        setListaSeleccion(arregloActividades)
        const variable=(<EncuestasTabla fila={row} />)
        setModal(variable)
    }           
 
           
    async function procesarDuplicarEncuesta (row) {
        console.log("ListaPersonal/procesarDuplicarEncuesta 1: row:", row);

        try {
            console.log("ListaPersonal procesarDuplicarEncuesta 2: row.id_usuario", row.id_usuario, token)
            const duplicarEncuesta = await homologateActivities(token, row.id_usuario)
            console.log("ListaPersonal procesarDuplicarEncuesta 3: envioEmail", duplicarEncuesta)
            swal("AVISO:\nEncuesta duplicada desde el cliente"+row.id_usuario);}
        catch (error) {
            swal(row.nombre+" no pudo homologarse\n"+error) } }      
            

    async function procesarReabrirUsuario(row) {
        console.log("************************************")
        console.log("ListaPersonal procesarReabrirUsuario 130: Reabriremos Usuario por ServiciosBackend creado para tal fin", row);

        try {
            console.log("ListaPersonal procesarReabrirUsuario 135: row.if_usuario", row.id_usuario)
            const reabrirEncuesta = await openInquest (token, {"usuario": row.id_usuario})
            console.log("ListaPersonal procesarReabrirUsuario 137: reabrirEncuenta", reabrirEncuesta)            
            let linea = await {
                cargo:row.cargo,
                centrocosto: row.centrocosto,
                clave: row.clave,
                codigo: row.codigo,
                email: row.email,
                empresa:row.empresa,
                estado: row.empresa,
                estadoEncuesta:"Desarrollo",
                id_usuario:row.id_usuario,
                jornada: row.jornada,
                nombre: row.nombre,
                perfil: row.perfil,
                salario: row.salario,
                tipocontrato: row.tipocontrario,}
            const arregloModificado = 
            listaPersonalSesion.map((item) => 
            (item.id_usuario === linea.id_usuario)
            ? linea
            : item
            );  
            const arregloModificado2 = 
            listaPersonal.map((item) => 
            (item.id_usuario === linea.id_usuario)
            ? linea
            : item
            );  
                        
            let indicadores= await CalcularValores(token, empresaConsultor.nit);
            console.log("ListaPersonal procesoReabrirUsuario 157: arregloModificado, linea", arregloModificado, linea)
            setListaPersonalSesion(arregloModificado);
            setListaPersonal(arregloModificado2);
            swal("AVISO:\nUsuario "+row.nombre+" Reabierto");}  
        catch (error) {
            console.log("ListaPersonal 178 Error ",error)
            swal(row.nombre+" no pudo ser reabierto\n"+error) } }  
        
    // async function procesarEnvioEmail (id_usuario) {
    //     console.log("ListaPersonal 164: Enviaremos email por ServiciosBackend creado para tal fin", id_usuario);
    
    //     console.log("@@@@@@@@@@@@@@@@@@@@@@@")
    //     console.log("ListaPersonal procesarEnvioEmail 167: Enviaremos email por ServiciosBackend", id_usuario);

    //     try {
    //         console.log("ListaPersonal procesarReabrirUsuario 133: row.if_usuario", id_usuario)
    //         const envioEmail = await rememberInquest(token, {usuario: id_usuario}) 
    //         console.log("ListaPersonal procesarEnvioEmail 172: envioEmail", envioEmail)
    //         swal("AVISO:\nEmail recordatorio enviado al cliente"+id_usuario);}
    //     catch (error) {
    //         swal(id_usuario+" no pudo ser reabierto\n"+error) } }  

            

    const DescargaConsultaEncuesta = async () => {


        try {

            const linkDeTabla = await generateTable (token, {empresa: empresaConsultor.nit})
            console.log("ListaPersonal procesarEnvioEmail 172: envioEmail", linkDeTabla)
            
            // setLinkTabla("https://es.wikipedia.org/wiki/Sociedade_Esportiva_Palmeiras#/media/Archivo:Palmeiras_logo.svg")
            swal("AVISO:\nDescargue Tabla ");}

        catch (error) {
            swal(empresaConsultor.nit+" no pudo ser descargado\n"+error) } }  

    
       

   const onChangeBusqueda = async e => {
        e.persist();
        setBusqueda(e.target.value);
        setListaPersonalSesion(filtrarElementos(e.target.value));}    

    const asignarColumnas = () => {
        setColumnas([

        {

            name: "Encuesta",
            cell: row => miEstadoEncuesta(row.estadoEncuesta,row.id_usuario),
            sortable: true,
            width: "70px",

        }, 
        {
            name: "Cedula",
            selector: "id_usuario", 
            sortable: true,
            width: "100px",
        },
        {
            name: "Nombre",
            selector: "nombre",
            width: "250px",

        },
        {
            name: "Cargo",
            selector: "cargo",
            width: "300px",
        },
        {
            name: "Salario ($)",
            cell: row => <div>{Intl.NumberFormat("es-CO").format(row.salario)}</div>,
            right: true,
            width: "100px",
        },   
        {
            name: "Jornada",
            selector: "jornada",
            width: "80px",
        },
        { 
            name: "Ver..",
            cell: row => verEncuesta(row),
            width: "50px",
        },   
        // { 
        //     name: "Email",
        //     cell: row => enviarEmail(row),
        //     width: "50px",
        // },
        { 
            name: "Reabrir",
            cell: row => reabrirUsuario(row),
            width: "50px",
        },   
        { 
            name: "Duplicar",
            cell: row => duplicarEncuesta(row),
            width: "50px",
        },     
     

        ])}


    const paginacionOpciones={
        rowsPerPageText: "Filas por P??gina",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  

    function filtrarElementos(busqueda) {
        console.log("ListaPersonal filtrarElementos 299: listaPersonal", listaPersonal)
        console.log("ListaPersonal filtrarElementos 300: listaPersonal[0]", listaPersonal[0])
        console.log("busqueda",busqueda)
        var search=listaPersonal.filter(item=>{
            if(item.id_usuario.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.jornada.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.estadoEncuesta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                Intl.NumberFormat("de-DE").format(item.salario).toString().includes(busqueda) ||
                item.email.toLowerCase().includes(busqueda))

                {return item;}});
        return (search); }  
        
  
    return(

    <>    
        <Container fluid>   
            <Row>
                <Col>
                    <Card>
                        <div className="tarjeta1a" style={{backgroundColor: "blue", color: "white"}}>Total Encuestas</div> 
                       <Card.Body>
                           <Row>
                                <h5 className="tarjeta1b" >{encuestasTotal}</h5>
                           </Row>
                       </Card.Body>
                    </Card>
                </Col>    
                <Col>
                    <Card>
                        <div className="tarjeta1a" style={{backgroundColor: "#fa1825", color: "white"}}>Pendientes</div> 
                       <Card.Body>
                           <Row>
                                <h5 className="tarjeta1b" >{encuestasPendiente}</h5>
                           </Row>
                       </Card.Body>
                    </Card>
                </Col>    
                <Col>
                    <Card>
                        <div className="tarjeta1a" style={{backgroundColor: "#ff9510", color: "white"}}>En Desarrollo</div> 
                       <Card.Body>
                           <Row>
                                <h5 className="tarjeta1b" >{encuestasEnDesarrollo}</h5>
                           </Row>
                       </Card.Body>
                    </Card>
                </Col>    
                <Col>
                    <Card>
                        <div className="tarjeta1a" style={{backgroundColor: "#87cb16", color: "white"}}>Terminados</div> 
                       <Card.Body>
                           <Row>
                            <h5 className="tarjeta1b" >{encuestasTerminado}</h5>
                           </Row>
                       </Card.Body>
                    </Card>
                </Col>    
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                        <Card.Title as="h4" className="Title" style={{backgroundColor:"transparent" }}>Participantes</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">

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
                                    <DataTable
                                        columns={columnas}
                                        data={listaPersonalSesion}
                                        pagination
                                        paginationComponentOptions={paginacionOpciones}
                                        fixedHeader
                                        fixedHeaderHeigth="600px"
                                        contextMessage={ {singular: 'empleado', plural: 'empleados', message: 'seleccionados'} }
                                        noDataComponent={<span>No se encontr?? ning??n elemento</span>}
                                    />
 
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {modal}
        </Container>
    </>
 
    )}

export default ListaPersonal
