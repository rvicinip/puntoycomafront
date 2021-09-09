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
import {editarRegistroEncuesta, listDictionaryWithInquest} from "services/ServiciosBackend.js"
import swal from 'sweetalert';
import CierreTomasTiempo from "components/Cliente/CierreTomasTiempo.js"




function ListaTomasTiempo ()  {

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
    tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia,
    listaSeleccion, setListaSeleccion } = useAppContext();   

  
    
    // Variable de manejo de la linea de Captura
    const [cantidadTiempo, setCantidadTiempo] = useState("")
    const [selectUnTpo, setSelectUnTpo] = useState(null);
    const [selectFrecTpo, setSelectFrecTpo] = useState(null);
    const [diccFrecTpo, setDiccFrecTpo] = useState([]);
    const [tablaFrecuenciasCaptura,setTablaFrecuenciasCaptura] = useState([])
    const [cambio, setCambio] = useState(true)
    const [columnas,setColumnas] = useState([])
    const [busqueda,setBusqueda] = useState("")

    useEffect (() => {
        async function CargaListaSeleccion() {

            try {

                    let arreglo, arreglo1 =[];
                    const actividadesEncuesta = await listDictionaryWithInquest(token);
                    arreglo = await actividadesEncuesta.data.data;
                    let i=0;
                    for (i=0; (i<arreglo.length); i++) {

                        if (arreglo[i].seleccionado){
                            let fila = arreglo[i]
                            arreglo[i].tablaFrecuenciasFiltrada = 
                            tablaUnidadesFrecuencia.filter
                            (elemento => elemento.ahoras >= elemento.valor*arreglo[i].encuesta.cantidad)
                            arreglo1.push(arreglo[i])}} 
                    console.log("PRIMERAVEZ! ListaTomasTiempo procesarSeleccionActividad (1) listaSeleccion", listaSeleccion)         
                    setListaSeleccion(arreglo1)
                    console.log("PRIMERAVEZ! ListaTomasTiempo procesarSeleccionActividad (2) arreglo1", arreglo1) } 
                 
            catch(error) {
                swal("ERROR:\n"+error)
            }}
            CargaListaSeleccion()    
            asignarColumnas()
        }, []);

        useEffect (() => {
 
            asignarColumnas()
            }, [listaSeleccion]);        
    

    
    // Variables de Manejo de Apertura y Cierre de la linea de captura de Tiempos

    const miEstadoEncuesta = (row) => {
        
        let variable="";
        if (row.encuesta.cantidad>0 && row.encuesta.umedida !== "" && row.encuesta.frecuencia !== "")
            variable = <div><span className="badge" style={{backgroundColor: "#66b032"}}>Grabado</span></div>;
        else
            variable = <div><span className="badge" style={{backgroundColor: "#ff0000"}}>Pendiente</span></div>;

        return variable  } 
    
 
    const procesarSeleccionActividad = async (row) => {
        console.log("ListaTomasTiempos/procesarSeleccionActividad 140: listaSeleccion[0]",listaSeleccion[0])
        row.seleccionado = !(row.seleccionado)
        const arregloModificado=listaSeleccion.map (actividad =>
            (actividad.id_actividad===row.id_actividad)
            ? row
            : actividad)

        setListaSeleccion(arregloModificado)
        console.log("ListaTomasTiempos/procesarSeleccionActividad 148: listaSeleccion[0]",arregloModificado)
        // );        
        return }
         
            
    const formatearNombre = (row) => {
        const descripcion = row.descripcion
        let tnombre = row.nombre
        let variable=null
        const nivelActividad = row.id_actividad.length/3
        // console.log("ListaSeleccionaSeleccionar 123: ", row.id_actividad, empresa.niveles, nivelActividad)

        return (<Fragment>
                    <div className="estiloN5 paddingN1">
                        {row.nombre}
                    </div>
                    <ReactTooltip place="top" type="dark" effect="float"/>
                </Fragment>)   } 
  

    const formatearIdActividad = (row) => {
        const variable=formatearNivel(row.id_actividad)
        const longvariable= variable.length
        const longblancos=19-longvariable
        const blancos=" ".repeat (longblancos)
        return (<div> {variable}</div>) }    
    



    const placeholderNombreUMedida = "Unidad";
    const [placeholderNombreUFrecuencia,setPlaceholderNombreUFrecuencia] = useState("Frec");


       
    async function Grabar (row) {

        console.log("ListaTomasTiempo/Grabar 174: row", row)
        if (row.encuesta.cantidad>0 && row.encuesta.umedida !== "" && row.encuesta.frecuencia !== "") {

            const actividadEditadaaGrabar = {
                id: row.encuesta.id,
                actividad: row.encuesta.actividad,
                usuario: empleado.id_usuario,
                cantidad: row.encuesta.cantidad,
                umedida: row.encuesta.umedida,
                frecuencia: row.encuesta.frecuencia }

            console.log ("ListaTomasTiempo/Grabar 181: actividadEditadaaGrabar", actividadEditadaaGrabar)

            try {
                console.log("ListaTomasTiempo/Grabar 184: editarRegistroEncuesta Peticion",token, actividadEditadaaGrabar,row)      
                const retorno = await editarRegistroEncuesta(token, actividadEditadaaGrabar);
                if (await retorno.data.response==="ERROR")
                    throw await retorno;
                console.log("ListaTomasTiempo/Grabar 188 editarRegistroEncuesta Response", retorno)}


            catch (error){
                console.log("ListaTomasTiempo/Grabar 197: retorno",retorno,"error", error)      
                swal("ERROR:\n"+error)}}}  


    function ActualizarArreglo(row) {
        console.log("listaTomasTiempo/ActualizarArreglo $1$: listaSeleccion", listaSeleccion, "\nrow",row )
        const arregloModificado=listaSeleccion.map (actividad =>
            (actividad.id_actividad===row.id_actividad)
            ? row
            : actividad)

        setListaSeleccion(arregloModificado)
        console.log("listaTomasTiempo/ActualizarArreglo $2$: arregloModificado", arregloModificado )}

    function capturaCantidadTiempo (row) {
        return(
        <Form.Group>
        <Form.Control
            className="cantidadtiempo"
            // placeholder={row.encuesta.cantidad}
            type="text"
            nombre="cantidadTiempo"
            defaultValue={row.encuesta.cantidad}
            onBlur={(e) => onBlurCantidadTiempo(e, listaSeleccion, row)}
            // onBlur={onBlurCantidadTiempo}
        ></Form.Control>
        </Form.Group>)
    }

    function capturaUnidadTiempo (row) {
        return(
            <Select
                className="select selectvena"
                placeholder={placeholderNombreUMedida}
                options={tablaUnidadesTiempo}
                defaultValue={tablaUnidadesTiempo.filter(unit => (unit.id === row.encuesta.umedida))}
                onChange={(obj) => onChangeNombreUMedida(obj, listaSeleccion, row)}
                getOptionName={(option) => option.nombre}
                getOptionLabel={(option) => option.nombre}
            />  )  }

    function capturaFrecuencia (row) {
        return(
            <Select
                className="select selectvena"
                placeholder={placeholderNombreUFrecuencia}
                // defaultValue={colourOptions[2]}
                // isDisabled={row.inhabilitarDropdownFrecTpo}
                options={row.tablaFrecuenciasFiltrada}
                defaultValue={tablaUnidadesFrecuencia.filter(unit => unit.id === row.encuesta.frecuencia)}
                onChange={(obj) => onChangeNombreUFrecuencia(obj, listaSeleccion, row)}
                getOptionName={(option) =>  option.nombre}
                getOptionLabel={(option) => option.nombre}
            />  )  }       
        
    const onBlurCantidadTiempo = async (e, listaSeleccion, row) => {
        e.preventDefault();
        console.log("ListaTomasTiempo (onBlurCantidadTiempo) &1&: Captura Teclado: ", e, "\nrow", row, "\nListaSeleccion", listaSeleccion );
        const valor = e.target.value;
        row.encuesta.cantidad=valor;
        row.encuesta.umedida=""
        row.encuesta.frecuencia=""
        console.log("ListaTomasTiempo (onBlurCantidadTiempo) &2&: Captura Teclado: ", valor, row,"listaSeleccion",listaSeleccion,row.id_actividad);
        // setBloqueoSelectUmedida(false)
        ActualizarArreglo(row)
        Grabar(row)}

    const  onChangeNombreUMedida = async (obj, listaSeleccion, row) => {

        console.log("ListaTomasTiempo (onChangeNombreUMedida) +1+: Cambio en Unidad Medida Tiempo", obj, row);
        row.encuesta.nombreUMedida=obj.nombre
        row.encuesta.umedida=obj.id
        row.tablaFrecuenciasFiltrada = tablaUnidadesFrecuencia.filter(elemento => elemento.ahoras >= obj.valor*row.encuesta.cantidad)
        row.inhabilitarDropdownFrecTpo = false
        console.log("ListaTomasTiempo (onChangeNombreUMedida) +2+: Cambio en Unidad Medida Tiempo", obj, row);
        console.log("ListaTomasTiempo (onChangeNombreUMedida) +3+: Filtrar TablasFrecuencia: tablaUnidadesFrecuencia", tablaUnidadesFrecuencia,row.encuesta.cantidad, obj.valor, row.encuesta.cantidad*obj.valor)

        ActualizarArreglo(row)
        Grabar(row)}


    const onChangeNombreUFrecuencia = async (obj, listaSeleccion, row) => {
        console.log("ListaTomasTiempo/onChangeNombreUFrecuencia ¿1¿: obj ", obj, "row",row);
        row.encuesta.nombreUFrecuencia=obj.nombre
        row.encuesta.frecuencia=obj.id
        console.log("ListaTomasTiempo/onChangeNombreUFrecuencia ¿2¿: obj ", obj, "row",row);
        ActualizarArreglo(row)
        Grabar(row)}

    const onChangeBusqueda = async e => {
        e.persist();
        setBusqueda(e.target.value);
        setListaEncuestasSesion(filtrarElementos(e.target.value));}    

    const asignarColumnas = () => {
        setColumnas([

        {

            name: "Estado",
            cell: row => miEstadoEncuesta(row),
            sortable: true,
            width: "100px",

        }, 
 
        {
            name: "Id_Actividad",
            cell: row => formatearIdActividad(row),
            width: "150px",
        },
        
        {
            name: "Nombre Actividad",
            cell: row => formatearNombre(row),
            width: "300px",
        },
        {
            name: "Cantidad",
            cell: row => capturaCantidadTiempo(row),
            right: true,
            width: "160px",
        }, 
        {
            name: "Unidad",
            cell: row => capturaUnidadTiempo(row),
            right: true,
            width: "150px",
        }, 
        {
            name: "Frecuencia",
            cell: row => capturaFrecuencia(row),
            right: true,
            width: "150px",
        }, 



        ])}

  
    const paginacionOpciones={
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  



    function filtrarElementos(busqueda) {
        console.log("busqueda",busqueda)
        var search=listaSeleccion.filter(item=>{
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
                                        keyField="id"
                                        columns={columnas}
                                        data={listaSeleccion}
                                        dense
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

export default ListaTomasTiempo
