import React, {useState, useEffect, Fragment} from 'react';
// import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card} from "react-bootstrap"
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "hooks/useAppContext";
import { obtenerFrecuencias,deletefrecuency } from "services/ServiciosBackend.js"
import { render } from 'react-dom';


function TablaFrecuenciasConsultor ()  {

    const { empresaConsultor, setEmpresaConsultor, empresas, setEmpresas, formatearNivel, frecuencia, setFrecuencia, 
    empresa, empleado, tablas, diccionario, setDiccionario, token, setListaPersonal, listaPersonal,
    selectN1, selectN2, selectN3, selectN4, selectN5,
    inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
    diccN1,diccN2,diccN3, diccN4,diccN5,
    setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
    setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
    setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
    placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
    actividadCascadaSeleccionada, setActividadCascadaSeleccionada,
    tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia } = useAppContext();   

    // const Button = () => (
    // <button type="button">Descargar</button>
    // );


    // const CustomTitle = ({ row }) => (
    // <div>
    //     {}
    //     <div>{row.title}</div>
    //     <div>
    //     <div data-tag="allowRowEvents" style={{ color: 'grey', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
    //         {}
    //         {row.plot}
    //     </div>
    //     </div>
    // </div>
    // );
    const [columnas,setColumnas] = useState([])

   
    useEffect( () =>  {
        // cargarFrecuencia()
        asignarColumnas()}, []);

    async function cargarFrecuencia () {
        try {
            console.log("TablaFrecuenciasConsultor cargarFrecuencias 1 Peticion:  token",token,"\nempresaConsultor.nit",empresaConsultor.nit )
            const cargaFrecuencia=await obtenerFrecuencias(token, empresaConsultor.nit)
            // console.log("ablaFrecuenciasConsultor cargarFrecuencias 1 Respuesta cargaFrecuencia",cargaFrecuencia, cargaFrecuencia.data.response )

            if (await cargaFrecuencia.data.response === "ERROR") {
                throw (cargaFrecuencia)}
            const dataFrecuencia=cargaFrecuencia.data.data
            // dataFrecuencia.sort(function(a,b) {
            //     var textA = a.id();
            //     var textB = b.id();
            //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; }) 
            setFrecuencia(dataFrecuencia)}
        catch(error) {
            swal("ERROR:\nTabla Frecuencias no pudo ser cargada.\n"+error);}}
        
    function borrarFrecuencia(row) {
        return (<div><button className="eliminarcrud" onClick={ () => procesarBorrarFrecuencia(row)} id={row.id}><i className="fa fa-trash" style={{ariaHidden: "true", color: "white"}} ></i></button></div>)}    

        
    async function procesarBorrarFrecuencia(row) {
        try {
            const deletedFrequency= await deletefrecuency (token, row.id)
            console.log("TablaFrecuenciasConsultor procesarBorrarFrecuencia 1: deletedActividad", deletedFrequency, deletedFrequency.data.response,deletedFrequency.data.message)
            if (deletedFrequency.data.response === "ERROR") {
                throw (deletedFrequency)}
            swal("AVISO:\nEntrada Tabla Frecuencias "+row.nombre+" ha sido borrada de esta Base de Datos");
            cargarFrecuencia()}

        catch (error) {
            swal("ERROR:\nEntrada Tabla Frecuencias "+row.nombre+" no ha sido borrada de esta Base de Datos.\n"+deletedFrequency.data.message);}}
    
        

    const onChangeBusqueda = async e => {
        e.persist();
        setBusqueda(e.target.value);}


    const asignarColumnas = () => {
        setColumnas([
          {   
            name: "Nombre",
            selector: "nombre",
            grow: 3,
          },
          {
            name: "Tipo",
            selector: "tipo",
            grow: 1,
          },
          {
            name: "Valor",
            selector: "valor",
            grow: 2,
          },
          { 
            name: "Borrar",
            cell: row => borrarFrecuencia(row),
            width: "50px",
        },  
        //   {
        //     name: "Unidad",
        //     selector: "unidad",
        //     sortable: false,
        //     grow: 2,
        // },    
        ])}

    const paginacionOpciones={
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  



  
    return(
    <Container fluid>
        <Row>
            <Col xs={3}/>
            <Col xs={6}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h4" className="Title" style={{backgroundColor:"transparent" }}>Tabla Frecuencias</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <DataTable
                                columns={columnas}
                                data={frecuencia}
                                pagination
                                paginationComponentOptions={paginacionOpciones}
                                fixedname
                                fixednameHeigth="600px"
                                noDataComponent={<span>No se encontró ningún elemento</span>}
                                /> 
                            </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={3}/>
        </Row>
    </Container>)

    // storiesOf('Custom Cells', module)
    // .add('Example 1', BasicTable);
}

export default TablaFrecuenciasConsultor




// ////////////////

// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// 37
// 38
// 39
// 40
// 41
// 42
// 43
// 44
// 45
// 46
// 47
// 48
// 49
// 50
// 51
// 52
// 53
// 54
// 55
// 56
// 57
// 58
// 59
// 60
// 61
// 62
// 63
// 64
// 65
// 66
// 67
// 68
// 69
// 70
// 71
// 72
// 73
// 74
// 75
// 76
// 77
// 78
// 79
// 80
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { storiesOf } from '@storybook/react';
// import DataTable from '../../../src/index';

// const columns = [
//   {
//     name: 'First Name',
//     selector: 'first_name',
//     sortable: true,
//   },
//   {
//     name: 'Last Name',
//     selector: 'last_name',
//     sortable: true,
//   },
//   {
//     name: 'Email',
//     selector: 'email',
//     sortable: true,
//   },
// ];

// const AdvancedPaginationTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalRows, setTotalRows] = useState(0);
//   const [perPage, setPerPage] = useState(10);

//   const fetchUsers = async page => {
//     setLoading(true);

//     const response = await axios.get(
//       `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`,
//     );

//     setData(response.data.data);
//     setTotalRows(response.data.total);
//     setLoading(false);
//   };

//   const handlePageChange = page => {
//     fetchUsers(page);
//   };

//   const handlePerRowsChange = async (newPerPage, page) => {
//     setLoading(true);

//     const response = await axios.get(
//       `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`,
//     );

//     setData(response.data.data);
//     setPerPage(newPerPage);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers(1);
  
//   }, []);

//   return (
//     <DataTable
//       title="Users"
//       columns={columns}
//       data={data}
//       progressPending={loading}
//       pagination
//       paginationServer
//       paginationTotalRows={totalRows}
//       selectableRows
//       onChangeRowsPerPage={handlePerRowsChange}
//       onChangePage={handlePageChange}
//     />
//   );
// };

// storiesOf('Pagination', module)
//   .add('Server-Side Using Hooks', () => <AdvancedPaginationTable />);
//     setData(response.data.data);
//     setTotalRows(response.data.total);
//     setLoading(false);
//   };

//   const handlePageChange = page => {
//     fetchUsers(page);
//   };

//   const handlePerRowsChange = async (newPerPage, page) => {
//     setLoading(true);

//     const response = await axios.get(
//       `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`,
//     );

//     setData(response.data.data);
//     setPerPage(newPerPage);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers(1);
  
//   }, []);

//   return (
//     <DataTable
//       title="Users"
//       columns={columns}
//       data={data}
//       progressPending={loading}
//       pagination
//       paginationServer
//       paginationTotalRows={totalRows}
//       selectableRows
//       onChangeRowsPerPage={handlePerRowsChange}
//       onChangePage={handlePageChange}
//     />
//   );
// };

// storiesOf('Pagination', module)
//   .add('Server-Side Using Hooks', () => <AdvancedPaginationTable />);
//   .add('Server-Side Using Hooks', () => <AdvancedPaginationTable />);




