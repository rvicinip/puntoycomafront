
import React, {useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {Form, Button, Container, Row, Col, Card, Modal} from "react-bootstrap"
import { useAppContext } from "hooks/useAppContext";
import "assets/css/vena.css";
import {servicioLeerLista, servicioGrabarLista} from "services/ServiciosBackend.js"
import AgregarConsultor from "components/Gerencia/AgregarConsultor.js"
import swal from 'sweetalert';



function ListaDataTable{

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



    // Variables DataTable
    const [listaDesplegableSesion,setListaDesplegableSesion] = useState(listaDesplegable)
    const [columnas,setColumnas] = useState([])
    const [opcionesPaginacion, setOpcionesPaginacion] = useState(null)
    const [busqueda,setBusqueda] = useState("")
 


    const [modalAbierto, setModalAbierto] = useState(false)
    const cerrarModal = () => {
        modalAbierto(false)}

    // Variable Captura    
    const [campo1, setCampo1] = useState("")
    const [campo2, setCampo2] = useState("")
    const [campo3, setCampo3] = useState("")
    const [campo4, setCampo4] = useState("")
    const [campo5, setCampo5] = useState("")


    
    useEffect ({

        // grabacion despues de pintar


    }, [listaDesplegada])

    useEffect ({

        const columnasTabla = 
        [

        {   name: "Asignar/Desasignar",
            cell: row => cambiarEstadoVariable(row, nuevoValor),
            sortable: true,
            width: "10px" },         

        {   name: "Estado",
            cell: row => mostrarAsignacionConsultor(row),
            sortable: true,
            width: "10px" },

        {   name: "Cedula",
            selector: "id_usuario", 
            sortable: true,
            width: "10px",},

        {   name: "Nombre",
            selector: "nombre",
            width: "10px",},

        {   name: "Cargo",
            selector: "cargo",
            width: "10px",
            className: 'width-10'} ];

        setColumnas(columnasTabla);

        const opcionesPaginacion =
        {   rowsPerPageText: "Filas por Página",
            rangeSeparatorText: "de",
            selectAllRowsItem: true,
            selectAllRowsTextItem: "Todos"};

        setPaginacionOpciones(opcionesPaginacion);


        // Consumir API de CargaArreglo

    }, [])
    
    function modificarValorFila (row) {

        switch (true) {
            case (capturarVariable (row)) {
            // CapturarVariable?
            //Actualizar el arreglo

            }   
    
            case (capturarSelectVariable (row)) {
            //CapturarSelectVariable
            //ActualizarArreglo
            }

            case (cambiarValorVariable (row)){
            //CambiarValorVariable
            //
            } }

        row.campocambiado1 = nuevovalor1
        row.campocambiado2 = nuevovalor2

        const arregloModificado=[];
        listaDesplegada.map (fila =>
            arregloModificado.push(
                (fila.clave === row.clave)
                ? row
                : fila))

        setListaDesplegada(arregloModificado)
        }


    }


    function agregarFila (nuevaRow) {
        const nuevaFila = {

        }
        const arregloModificado=[];
        listaDesplegada.map (fila => 
            arregloModificado.push(
                (fila.clave===row.clave)
                ? nuevaFila
                : fila);
        setListaDesplegada(arregloModificado);    

    }

    function borrarFila (row) {
        const arregloModificado=[];
        listaDesplegada.map (fila => 
            arregloModificado.push(
                (fila.clave!==row.clave)
                ? nuevaFila
                : fila);
        setListaDesplegada(arregloModificado);        

    }

 

    function formatearVariable (row) {
        //Desarrollar funcion de formateo
        //Actualizar Arreglo
    }


    const onChangeCampo = (e) => {
        setCampo(e.target.value);}


        function asignacionColumnas() {

}





    function filtrarElementos(busqueda) {
        console.log("busqueda",busqueda)
        var search=listaDesplegable.filter(item=>{
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
                                        data={listaDesplegadaSesion}
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
                show={modalAbierto}
                onHide={cerrarModal}
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

export default ListaDataTable





    
// useEffect ( async () => {

        
//     if (cambios){
//         await CargaListaConsultores();
//         setCambios(false);  
//         asignarColumnas();}}, []);

// async function CargaListaConsultores() {

//     console.log("ListaConsultores useEffect CargaListaConsultores 41 Peticion", token, empresaConsultor.nit)
//     const consultores = await getConsultors (token, empresaConsultor.nit) 
//     const consultoresAsignados = await consultores.data.data.consultores


//     // Filtrar los empleados de la consultora para seleccionar los asignados como consultores

//     const empleados= await getEmployes(token, empleado.empresa);
//     const listaEmpleados = await empleados.data.data; 
//     const listaEmpleadosConsultores= await listaEmpleados.filter(empleado => empleado.perfil ==="consult")

//     // Asignar Estados de Asignado o NoAsignado a consultores dependiendo si están o no asignados
//     // a esta empresa cliente
//     let arreglo=[]
//     for (let i=0;i<listaEmpleadosConsultores.length;i++){
//         let consultor=listaEmpleadosConsultores[i];
//         const consultorChequeadoEnProyecto = consultoresAsignados.filter(consultorAsignado => consultorAsignado.id_usuario === consultor.id_usuario)
//         let variable = ""
//         if (consultorChequeadoEnProyecto.length>0)
//             variable = "Asignado";
//         else
//             variable = "NoAsignado";  
//         arreglo.push({cargo: consultor.cargo,
//         centrocosto: consultor.centrocosto,
//         clave: consultor.clave,
//         codigo: consultor.codigo,
//         email: consultor.estado,
//         estadoEncuesta: consultor.estadoEncuesta,
//         id_usuario: consultor.id_usuario,
//         jornada: consultor.jornada,
//         nombre: consultor.nombre,
//         perfil: consultor.perfil,
//         salario: consultor.salario,
//         tipocontrato: consultor.tipocontrato,
//         estadoAsignacion: variable})
//     }
//     console.log("ListaConsultores 64 arreglo", arreglo)
    
//     setListaConsultores(arreglo);
//     setListaConsultoresSesion(arreglo);
//     return } 


// function mostrarAsignacionConsultor(row) {

//         let variable="";
//         switch (row.estadoAsignacion) {
//             case "NoAsignado":
//                 variable=<div><span className="badge" style={{backgroundColor: "#fa1825"}}>NoAsignado</span></div>;
//                 break;
//             case "Asignado":
//                 variable=<div><span className="badge" style={{backgroundColor: "#87cb16"}}>Asignado</span></div>;
//                 break;}
//             return variable  } 

// function cambiarEstadoConsultor(row) {

// return (<div>
//     <button className="enviaremailcrud" onClick={() => procesarCambiarEstadoConsultor(row)} id={row.id_usuario} ><i className="fas fa-people-arrows"></i></button></div>)};            
    

// async function procesarCambiarEstadoConsultor(row) {

//     console.log("ListaConsultores procesarAsignarConsultor 130: Cambiaremos el estado del Consultor", row);
//     CambiarArreglo()
// }  

// const onAgregarConsultor = async () => {

//         setIsOpenModalAgregarConsultor(true);
// }

// const onChangeBusqueda = async e => {
//     e.persist();
//     setBusqueda(e.target.value);
//     setListaPersonalSesion(filtrarElementos(e.target.value));}    

// const onChangeNvoNIT= (e) => {
//     setNit(e.target.value);}
 
// const onChangeNvoNombre= (e) => {
//     setNombre(e.target.value); }     

// const onChangeNvoEmail= (e) => {
//     setEmail(e.target.value);}
  
// const onChangeNvoSalario= (e) => {
//     setSalario(e.target.value); }  

// const onChangeNvoJornada= (e) => {
//     setJornada(e.target.value);}

// const onChangeNvoCargo= (e) => {
//     setCargo(e.target.value); } 
      
// const onChangeNvoTipocontrato= (e) => {
//     setTipocontrato(e.target.value); } 

// const onSubmitAgregarConsultor = async (e) => {

//     e.preventDefault();
//     // Validaciones principales
//     // Cedula: campo obligatorio
//     // Nombre: Campo obligatorio
//     // email: campo obligatorio
//     // 
//     if (nit.length===0 || nombre.length===0 || email.length === 0 || !email.includes("@") || salario<=0) {
//         swal("ERROR:\n Campos Obligatorios no pueden estar en blanco o ser invalidos")
//         setIsOpenModalAgregarConsultor(false) }

//     else    {

//         try{
//             setCambios(true)
//             console.log("Empleado", empleado)
//             setIsOpenModalAgregarConsultor(false) 
//             const nitCaptura="C".concat(nit)
//             const parametros= {
//                 id_usuario: nitCaptura, 
//                 nombre: nombre, 
//                 empresa: empleado.empresa, 
//                 clave: nit,
//                 email: email,
//                 salario: salario,
//                 jornada:jornada,
//                 cargo: cargo,
//                 tipocontrato: tipocontrato};

//             console.log("ListaConsultores onSubmitAgregarConsultor 204: peticion Crear.. token: ", token,"\nparametros: ",parametros)
//             const usuario = await createUser(token, parametros);
//             const verusuario = await usuario;
//             console.log("ListaConsultores onSubmitAgregarConsultor 207: peticion Crear.. token: ", token,"\nparametros: ",parametros)
//             if (usuario.data.response==="ERROR")
//                 swal("ERROR:\n"+usuario.data.message);

//             else    
//                 swal("AVISO:\nConsultor "+nombre+" agregado al registro de consultores. \nLos consultores deben usar para ingresar al sistema la letra 'C' seguida de su documento de identidad"); }

//         catch (error) {
//             console.log("ListaConsultores 215 Error Catch",error)
//             swal("ERROR:\n"+nombre+" no pudo ser creado\n"+error)  } } } 


