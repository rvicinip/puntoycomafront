
import React, {useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Form, Button, Container, Row, Col, Card, Modal} from "react-bootstrap"
import { useAppContext } from "hooks/useAppContext";
import "assets/css/vena.css";
import {createUser, getConsultors,  getEmployes, addCompaniesConsultor, deleteConsultor} from "services/ServiciosBackend.js"
import AgregarConsultor from "components/Gerencia/AgregarConsultor.js"
import swal from 'sweetalert';



function ListaConsultores ()  {

    const { listaConsultores, setListaConsultores, isOpenModalConsultarActividades, setIsOpenModalConsultarActividades, empresaConsultor, setEmpresaConsultor,  
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

    const [columnas,setColumnas] = useState([])
    const [listaConsultoresSesion,setListaConsultoresSesion] = useState(listaPersonal)
    const [busqueda,setBusqueda] = useState("")
    const [cambios,setCambios] = useState(true)

    const [isOpenModalAgregarConsultor, setIsOpenModalAgregarConsultor] = useState(false)

    const manejarCierreModalAgregarConsultor = () => {
        setIsOpenModalAgregarConsultor(false)


    }
    const [nit, setNit] = useState("")
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [salario, setSalario] = useState("")
    const [jornada, setJornada] = useState("")
    const [cargo, setCargo] = useState("")
    const [tipocontrato, setTipocontrato] = useState("")

 
    useEffect ( () => {
       CargaListaConsultores()
       asignarColumnas()
  
    }, [])      


    useEffect (() => {
        if (cambios){
            CargaListaConsultores();
            setCambios(false);  
            asignarColumnas();}}, );

    async function CargaListaConsultores() {

        console.log("ListaConsultores useEffect CargaListaConsultores 41 Peticion", token, empresaConsultor.nit)
        const consultores = await getConsultors (token, empresaConsultor.nit) 
        const consultoresAsignados = await consultores.data.data.consultores


        // Filtrar los empleados de la consultora para seleccionar los asignados como consultores

        const empleados= await getEmployes(token, empleado.empresa);
        const listaEmpleados = await empleados.data.data; 
        const listaEmpleadosConsultores= await listaEmpleados.filter(empleado => empleado.perfil ==="consult")

        // Asignar Estados de Asignado o NoAsignado a consultores dependiendo si están o no asignados
        // a esta empresa cliente
        let arreglo=[]
        for (let i=0;i<listaEmpleadosConsultores.length;i++){
            let consultor=listaEmpleadosConsultores[i];
            const consultorChequeadoEnProyecto = consultoresAsignados.filter(consultorAsignado => consultorAsignado.id_usuario === consultor.id_usuario)
            let variable = ""
            if (consultorChequeadoEnProyecto.length>0)
                variable = "Asignado";
            else
                variable = "NoAsignado";  
            arreglo.push({cargo: consultor.cargo,
            centrocosto: consultor.centrocosto,
            clave: consultor.clave,
            codigo: consultor.codigo,
            email: consultor.estado,
            estadoEncuesta: consultor.estadoEncuesta,
            id_usuario: consultor.id_usuario,
            jornada: consultor.jornada,
            nombre: consultor.nombre,
            perfil: consultor.perfil,
            salario: consultor.salario,
            tipocontrato: consultor.tipocontrato,
            estadoAsignacion: variable})
        }
        console.log("ListaConsultores 64 arreglo", arreglo)
        
        setListaConsultores(arreglo);
        setListaConsultoresSesion(arreglo);
        return } 


    function mostrarAsignacionConsultor(row) {

            let variable="";
            switch (row.estadoAsignacion) {
                case "NoAsignado":
                    variable=<div><span className="badge" style={{backgroundColor: "#fa1825"}}>NoAsignado</span></div>;
                    break;
                case "Asignado":
                    variable=<div><span className="badge" style={{backgroundColor: "#87cb16"}}>Asignado</span></div>;
                    break;}
                return variable  } 
 
    function cambiarEstadoConsultor(row) {
    return (<div>
        <button className="enviaremailcrud" onClick={() => procesarCambiarEstadoConsultor(row)} id={row.id_usuario} ><i className="fas fa-people-arrows"></i></button></div>)};            
        
    
    async function procesarCambiarEstadoConsultor(row) {


       console.log("ListaConsultores procesarAsignarConsultor 130: Cambiaremos el estado del Consultor", row);


        try {

            if (row.estadoAsignacion === "NoAsignado") {
                // Si el consultor no ha sido asignado entonces se Asigna
                console.log("ListaConsultores procesarAsignarConsultor 112: NoAsignado, peticion Asignar", token,empresaConsultor.nit,row.id_usuario)
                const asignarConsultor = await addCompaniesConsultor (token, {empresa: empresaConsultor.nit, id_usuario: row.id_usuario})

                console.log("ListaConsultores procesarAsignarConsultor 114: Respuesta asignarConsultor", asignarConsultor) 
                if (asignarConsultor.data.response==="ERROR"){
                    swal("ERROR:\n"+asignarConsultor.data.message+" "+row.nombre);}
                else    {
                    CargaListaConsultores()
                    swal("AVISO:\nConsultor "+row.nombre+" asignado al proyecto");}}  

            else {
                //Si el consultor está asignado se desasigna
                console.log("ListaConsultores procesarAsignarConsultor 135: Asignado, peticion Desasignar", token,empresaConsultor.nit,row.id_usuario)
                const desasignarConsultor = await deleteConsultor (token, empresaConsultor.nit, row.id_usuario)
                console.log("ListaConsultores procesarAsignarConsultor 137: deleteConsultor", desasignarConsultor) 
                if (desasignarConsultor.data.response==="ERROR"){
                    swal("ERROR:\n"+desasignarConsultor.data.message);}
                else    {
                    CargaListaConsultores()
                    swal("AVISO:\nConsultor "+row.nombre+" desasignado al proyecto");}}}

        catch (error) {
            console.log("ListaConsultores 113 Error ",error)
            swal("ERROR:\n"+row.nombre+" error en asignacion\n"+error+" row.nombre")  } }  

    const onAgregarConsultor = async () => {

            setIsOpenModalAgregarConsultor(true);
    }

    const onChangeBusqueda = async e => {
        e.persist();
        setBusqueda(e.target.value);
        setListaConsultoresSesion(filtrarElementos(e.target.value));}    

    const onChangeNvoNIT= (e) => {
        setNit(e.target.value);}
     
    const onChangeNvoNombre= (e) => {
        setNombre(e.target.value); }     
  
    const onChangeNvoEmail= (e) => {
        setEmail(e.target.value);}
      
    const onChangeNvoSalario= (e) => {
        setSalario(e.target.value); }  
  
    const onChangeNvoJornada= (e) => {
        setJornada(e.target.value);}
    
    const onChangeNvoCargo= (e) => {
        setCargo(e.target.value); } 
          
    const onChangeNvoTipocontrato= (e) => {
        setTipocontrato(e.target.value); } 
   
    const onSubmitAgregarConsultor = async (e) => {

        e.preventDefault();
        // Validaciones principales
        // Cedula: campo obligatorio
        // Nombre: Campo obligatorio
        // email: campo obligatorio
        // 
        if (nit.length===0 || nombre.length===0 || email.length === 0 || !email.includes("@") || salario<=0) {
            swal("ERROR:\n Campos Obligatorios no pueden estar en blanco o ser invalidos")
            setIsOpenModalAgregarConsultor(false) }

        else    {

            try{
                console.log("Empleado", empleado)
                setIsOpenModalAgregarConsultor(false) 
                const nitCaptura="C".concat(nit)
                const parametros= {
                    id_usuario: nitCaptura, 
                    nombre: nombre, 
                    empresa: empleado.empresa, 
                    clave: nit,
                    email: email,
                    salario: salario,
                    jornada:jornada,
                    cargo: cargo,
                    tipocontrato: tipocontrato};

                console.log("ListaConsultores onSubmitAgregarConsultor 204: peticion Crear.. token: ", token,"\nparametros: ",parametros)
                const usuario = await createUser(token, parametros);
                const verusuario = await usuario;
                console.log("ListaConsultores onSubmitAgregarConsultor 207: peticion Crear.. token: ", token,"\nparametros: ",parametros)
                if (usuario.data.response==="ERROR")
                    swal("ERROR:\n"+usuario.data.message);

                else   
                    CargaListaConsultores()
                    swal("AVISO:\nConsultor "+nombre+" agregado al registro de consultores. \nLos consultores deben usar para ingresar al sistema la letra 'C' seguida de su documento de identidad"); }

            catch (error) {
                console.log("ListaConsultores 215 Error Catch",error)
                swal("ERROR:\n"+nombre+" no pudo ser creado\n"+error)  } } } 


    const asignarColumnas = () => {
        setColumnas([
  
        {

            name: "Asignar/Desasignar",
            cell: row => cambiarEstadoConsultor(row),
            sortable: true,
            grow: 1,

        },         

        { 
            name: "Estado",
            cell: row => mostrarAsignacionConsultor(row),
            sortable: true,
            grow: 1,
        },

        {
            name: "Cedula",
            selector: "id_usuario", 
            sortable: true,
            grow: 2,
        },
        {
            name: "Nombre",
            selector: "nombre",
            grow: 2,

        },
        {
            name: "Cargo",
            selector: "cargo",
            grow: 1,
            className: 'width-10'
        },
        
     

        ])}


    const paginacionOpciones={
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  

    function filtrarElementos(busqueda) {
        console.log("busqueda",busqueda)
        var search=listaConsultores.filter(item=>{
            if (item.id_usuario.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.estadoAsignacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLowerCase()) ||
                item.email.toLowerCase().includes(busqueda))
                {return item;}});
        return (search); }  
        
  
    return(

    <>    
        <Container fluid>   

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                        <Card.Title as="h4" className="Title" style={{backgroundColor:"transparent" }}>Asignacion Consultores</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <Row>
                                    <Col>
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
                                    <Col style={{textAlign: "right"}}>
                                        <Button
                                            variant="primary"
                                            onClick={onAgregarConsultor}
                                        >
                                            Nuevo Consultor
                                        </Button>
                                    </Col>
                                    </Row>

                                    <DataTable
                                        columns={columnas}
                                        data={listaConsultoresSesion}
                                        pagination
                                        paginationComponentOptions={paginacionOpciones}
                                        fixedHeader
                                        fixedHeaderHeigth="600px"
                                        contextMessage={ {singular: 'empleado', plural: 'empleados', message: 'seleccionados'} }
                                        noDataComponent={<span>No se encontró ningún elemento</span>}
                                    />
 
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
       

        <Modal
                show={isOpenModalAgregarConsultor}
                onHide={manejarCierreModalAgregarConsultor}
            >
                <Modal.Header closeButton={true}>
                <Modal.Title className="titulomodal">Agregar Consultor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                <Form.Group>
                    <label>Identificación Consultor</label>
                    <Form.Control
                    placeholder="Cédula del Consultor"
                    type="text"
                    id="nit"
                    nombre="nit"
                    value={nit}
                    onChange={onChangeNvoNIT}
                    ></Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                    <label>Correo Electrónico</label>
                    <Form.Control
                    placeholder="Dirección email"
                    type="email"
                    id="email"
                    nombre="email"
                    value={email}
                    onChange={onChangeNvoEmail}
                    ></Form.Control>
                </Form.Group>    
                </Col>
                </Row>
                <Form.Group>
                    <label>Nombre Consultor</label>
                    <Form.Control
                    placeholder="Nombre Nuevo Consultor"
                    type="text"
                    id="nombre"
                    nombre="nombre"
                    value={nombre}
                    onChange={onChangeNvoNombre}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <label>Salario</label>
                    <Form.Control
                    placeholder="Salario"
                    type="salario"
                    id="salario"
                    nombre="salario"
                    value={salario}
                    onChange={onChangeNvoSalario}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <label>Jornada</label>
                    <Form.Control
                    placeholder="Clase de jornada"
                    type="jornada"
                    id="jornada"
                    nombre="jornada"
                    value={jornada}
                    onChange={onChangeNvoJornada}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <label>Cargo</label>
                    <Form.Control
                    placeholder="Descripción del cargo"
                    type="cargo"
                    id="cargo"
                    nombre="cargo"
                    value={cargo}
                    onChange={onChangeNvoCargo}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <label>Tipo de contrato</label>
                    <Form.Control
                    placeholder="Tipo Contrato"
                    type="tipocontrato"
                    id="tipocontrato"
                    nombre="tipocontrato"
                    value={tipocontrato}
                    onChange={onChangeNvoTipocontrato}
                    ></Form.Control>
                </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={manejarCierreModalAgregarConsultor}
                >
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onSubmitAgregarConsultor}>
                    Crear
                </Button>
                </Modal.Footer>
            </Modal>
    </>
 
    )}

export default ListaConsultores

