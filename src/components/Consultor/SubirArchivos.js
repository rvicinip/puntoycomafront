import React, {useState, useEffect, Suspense} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {loadDictionary, loadFrecuency, loadEmployes, generateTable} from 'services/ServiciosBackend.js';
import { useAppContext } from 'hooks/useAppContext';
import { Badge, Container, Card, Row, Col, Button } from 'react-bootstrap';
import "assets/css/upload.css"


function SubirArchivos() {

const { setArchivosEnCarga, archivosEnCarga, listaConsultores, setListaConsultores, isOpenModalConsultarActividades, setIsOpenModalConsultarActividades, empresaConsultor, setEmpresaConsultor,  
    empresas, setEmpresas, formatearNivel, frecuencia, setFrecuencia, urlBack,
    empresa, empleado, tablas, diccionario, setDiccionario, token, setListaPersonal, listaPersonal,
    selectN1, selectN2, selectN3, selectN4, selectN5, layout, setLayout,
    inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
    diccN1,diccN2,diccN3, diccN4,diccN5,
    setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
    setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
    setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
    placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
    actividadCascadaSeleccionada, setActividadCascadaSeleccionada, listaActividades, setListaActividades,
    tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia } = useAppContext();       


const [capturaDiccionario,setCapturaDiccionario] = useState("");
const [cargaDiccionario, setCargaDiccionario] = useState(false);
const [cargaFrecuencia, setCargaFrecuencia] = useState(false);
const [cargaPersonal, setCargaPersonal]       = useState(false);
const [dataLink, setDataLink] = useState("");
const [botonDescarga,setBotonDescarga]=useState(false)

useEffect ( async () => {

    try {
            console.log("SubirArchivos 35: archivosEnCarga",archivosEnCarga)
            console.log("SubirArchivos 36; BajarLink Peticion",token, empresaConsultor.nit);

            const enlaceDescarga = await generateTable (token, {'empresa': empresaConsultor.nit});
            console.log("SubirArchivos 39: BajarLink Peticion", enlaceDescarga, urlBack,urlBack+enlaceDescarga)
            const definicionBotonDescarga=(<p className="titulo-descarga">No hay nada para descargar</p>)
            if (enlaceDescarga.data.response==="ERROR"){
                setBotonDescarga(definicionBotonDescarga)
                throw await enlaceDescarga;}
            setDataLink(urlBack+enlaceDescarga.data.data)
            const aBajar=urlBack+enlaceDescarga.data.data
            definicionBotonDescarga=(<Button className="tarjeta1a" href={`${aBajar}`} style={{paddingTop: 10, paddingBottom: 10, backgroundColor: "#f6ab3d", color: "white", fontWeight: "bold"}}>
            Tabla Desnormalizada</Button> )
            setBotonDescarga(definicionBotonDescarga)

            }



    catch (error){ 

        if ( await enlaceDescarga === undefined ) {
            setTimeout(() => { console.log("SubirArchivos 57: Linea Error de comunicacion. Vuelve a probar") }, 25); 
            swal ("OTRO Error;\n"+error)             
        }

        else {   
            if (await enlaceDescarga.data.response === "OK") {
                console.log("SubirArchivos 63: Estuvo todo bien y está en el catch")}


            else {
                // response es ERROR
                console.log("SubirArchivos 68 Empresa devolvio error del backend", enlaceDescarga)
                // swal ("ERROR:\n"+enlaceDescarga.data.message)
                console.log ("SubirArchivos 70 Autenticacion por error programado x software",enlaceDescarga); }}}},[])

    const subirDiccionario = e => {
        console.log("SubirArchivos 73: Este es el objeto con url capturado e", e)
        setCapturaDiccionario(e) }

    async function insertarDiccionario() {
        if (capturaDiccionario === "") {
            swal ("ERROR:\n Archivo no fué seleccionado.")
        }
        else {

            let nombreArchivo = capturaDiccionario[0].name;
            let archivo=nombreArchivo.split(".");
            const extensionArchivo = archivo[archivo.length-1];
            console.log("SubirArchivos 85: archivo", archivo,"Extension: ",archivo[archivo.length-1])
            if (extensionArchivo !== "xls")
                swal ("ERROR:\n El archivo Diccionario a cargar debe tener extensión .xls y debe cumplir con las normas indicadas en el Instructivo");
            else {
                console.log("cargaDiccionario 89: Peticion loadDictionary",empresaConsultor.nit, capturaDiccionario[0].name)
                const cargaDiccionario= await loadDictionary(token, empresaConsultor.nit, capturaDiccionario[0])
                .then (response => {
                    console.log("cargaDiccionario 92: Respuesta loadDiccionario, cargaDiccionario", cargaDiccionario, response); 
                    if (response !=="ERROR"){
                        swal ("EXITO!\n"+response.data) 
                        setArchivosEnCarga({diccionario:"cargado",frecuencia:archivosEnCarga.frecuencia, empleado:archivosEnCarga.empleado})
                        setCargaDiccionario(true)
                        if (cargaFrecuencia && cargaPersonal)   
                            setLayout("/empresa")}})
                .catch(error => {
                    swal("ERROR:\nArchivo Diccionario no pudo ser cargado. Posiblemente su formato difiere de la estructura permitida. Favor consultar con el Instructivo.");
             })}}}

       

            const desplegarInstructivoDiccionario = () => {
                swal(`Carga del Archivo Diccionario de Actividades:\n
                Para la carga del diccionario es importante tomar en cuenta lo siguiente:
                1. El archivo debe ser del tipo xls. Es decir, Excel 97-2003. Otro formato no será aceptado.
                2. La primera línea llamada 'de encabezados' corresponde a los nombres de los campos a importar.
                3. Cada campo de la línea de encabezados debe estar en letras minúsculas.
                4. Hay campos importables obligatorio y hay cambios opcionales.
                5. Los campos permitidos en el archivo Diccionario son los siguientes donde (*) significa que el campo es obligatorio y
                   no pueden quedar en blanco:
                    (*) id_actividad
                    (*) nombre
                    (*) nivel 
                    (*) padre
                        descripcion
                        mas 
                        ceno
                        tipo
                        cadena_de_valor
                        tipo_macroproceso
                        phva
                6. NO es importante el orden de los campos, pero si que sus cabeceras coincidan completamente con las enunciadas anteriormente
                7. Si el archivo incluye campos distintos a los enunciados, ellos no serán tomados en cuenta.
                8. Mientras todos los errores dentro del archivo no estén solventados no subirá.`)}                                   

                const desplegarInstructivoFrecuencia = () => {
                    swal(`Carga del Archivo Tabla de Frecuencias:\n
                    Para la carga del diccionario es importante tomar en cuenta lo siguiente:
                    1. El archivo debe ser del tipo xls. Es decir, Excel 97-2003. Otro formato no será aceptado.
                    2. La primera línea llamada 'de encabezados' corresponde a los nombres de los campos a importar.
                    3. Los campos permitidos en el archivo Tabla de Frecuencias son los siguientes donde (*) significa que el campo es obligatorioy
                    no pueden quedar en blanco:
                        (*) nombre
                        (*) tipo
                        (*) valor 
                            unidad
                    6. El archivo debe tener unos campos mínimos, es decir, que son obligatorios y otros opcionales.
                    7. NO es importante el orden de los campos, pero si que sus cabeceras coincidan completamente con las enunciadas anteriormente
                    8. Mientras todos los errores dentro del archivo no estén solventados no subirá.`)}   

                    const desplegarInstructivoPersonal = () => {
                        swal(`Carga del Archivo Listado de Personal:\n
                        Para la carga del diccionario es importante tomar en cuenta lo siguiente:
                        1. El archivo debe ser del tipo xls. Es decir, Excel 97-2003. Otro formato no será aceptado.
                        2. La primera línea llamada 'de encabezados' corresponde a los nombres de los campos a importar.
                        3. Cada campo de la línea de encabezados debe estar en letras minúsculas.
                        4. Hay campos importables obligatorio y hay cambios opcionales.
                        5. Los campos permitidos en el archivo Listado de Personal son los siguientes donde (*) significa que el campo es obligatorio y
                           no pueden quedar en blanco:
                            (*) id_usuario
                            (*)	clave
                            (*) nombre
                            (*) salario
                            (*) jornada	
                            (*) cargo
                            (*)	tipocontrato
                            	tipo
                                email
                        6. NO es importante el orden de los campos, pero si que sus cabeceras coincidan completamente con las enunciadas anteriormente
                        7. Si el archivo incluye campos distintos a los enunciados, ellos no serán tomados en cuenta.
                        8. Mientras todos los errores dentro del archivo no estén solventados no subirá.`)}   

                const [capturaFrecuencia,setCapturaFrecuencia] = useState("")


    const subirFrecuencia = e => {
        console.log("Este es el parametro", e)
        setCapturaFrecuencia(e) }

    async function insertarFrecuencia() {
        if (capturaFrecuencia === "" ) {
            swal ("ERROR:\n Archivo no fué seleccionado.")}
        else     {
            let nombreArchivo = capturaFrecuencia[0].name;
            let archivo=nombreArchivo.split(".");
            const extensionArchivo = archivo[archivo.length-1];
            console.log("SubirArchivos 179: archivo", archivo,"Extension: ",archivo[archivo.length-1])
            if (extensionArchivo !== "xls")
                swal ("ERROR:\n El archivo Frecuencias a cargar debe tener extensión .xls y debe cumplir con las normas indicadas en el Instructivo");
            else {
                console.log("capturaFrecuencia 183 Peticion:",empresaConsultor.nit, capturaFrecuencia, capturaFrecuencia[0].name)
                const cargaFrecuencia= await loadFrecuency(token, empresaConsultor.nit, capturaFrecuencia[0])
                .then(response => {
                    console.log("capturaFrecuencias 186: loadDiccionario", response, "\nresponse.data", response.data, "\nresponse.data.data", response.data.data); 
                    if (response !=="ERROR"){
                        swal ("EXITO CARGA FRECUENCIAS\n"+response.data) 
                        setArchivosEnCarga({diccionario:archivosEnCarga.diccionario,frecuencia:"cargado", empleado:archivosEnCarga.empleado})
                        setCargaFrecuencia(true)
                        if (cargaPersonal && cargaDiccionario)   
                            setLayout("/empresa")}})
                .catch(error => {
                    swal("ERROR:\nArchivo Frecuencia no pudo ser cargado. Posiblemente su formato difiere de la estructura permitida. Favor consultar con el Instructivo."+error);
                    ;})}}}

    const [capturaPersonal,setCapturaPersonal] = useState("")

    const subirPersonal = e => {
        console.log("subirPersonal 200: e", e)
        setCapturaPersonal(e) }

    async function insertarPersonal() {
        
        if (capturaPersonal === "") {
            swal ("ERROR:\n Archivo no fué seleccionado.")}
        else {
            let nombreArchivo = capturaPersonal[0].name;
            let archivo=nombreArchivo.split(".");
            const extensionArchivo = archivo[archivo.length-1];
            console.log("SubirArchivos 211: archivo", archivo,"Extension: ",archivo[archivo.length-1])
            if (extensionArchivo !== "xls")
                swal ("ERROR:\n El archivo Personal a cargar debe tener extensión .xls y debe cumplir con las normas indicadas en el Instructivo");
            else {           
                console.log("capturaPersonal 215 Peticion:",empresaConsultor.nit, capturaPersonal, capturaPersonal[0].name)
                const cargaPersonal= await loadEmployes(token, empresaConsultor.nit, capturaPersonal[0])
                console.log ("SubirArchivos capturaPersonal 217", cargaPersonal)
                if (cargaPersonal.data.response === "ERROR"){
              
                    swal("ERROR: ARCHIVO NO PUDO SER CARGADO!\n"+cargaPersonal.data.message);}

                else {
                    console.log("SubirArchivos 223: CORRECTO archivo", cargaPersonal)
                    setCargaPersonal(true)
                    setArchivosEnCarga({diccionario:archivosEnCarga.diccionario,frecuencia:archivosEnCarga.frecuencia, empleado:"cargado"})
                    swal("CARGA EXITOSA\n"+cargaPersonal.data.data)
                    if (cargaFrecuencia && cargaDiccionario)   
                           setLayout("/empresa")}}}}


                // .then(response => {

                //     // console.log("capturarPersonal 138: loadEmployes",response);
                //     if (response !=="ERROR"){
                //         swal ("EXITO CARGA LISTA PERSONAL\n"+response.data);
                //         setCargaPersonal(true)
    
                // .catch(error => {
                //     console.log("capturarPersonal 138: loadEmployes",error);
                //     swal ("ERROR:\nArchivo Personal no pudo ser cargado. Posiblemente su formato difiere de la estructura permitida. Favor consultar con el Instructivo.");
                // }
      
    return (
    <>    
        <Container fluid>   
            <Row>
                <Col md="12">
                    <Card>
                        <Card.Header>
                        <Card.Title as="h4">Carga de Archivos</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <br/>
                            <Row >
                                <Col md="1"/>  
                                <Col md="2">  
                                    <p className="titulo-descarga">Diccionario Actividades</p> 
                                </Col>  
                                <Col md="5">
                                    <input type="file" name="dicc" onChange={(e)=>subirDiccionario(e.target.files)} className="upload-box" />
                                </Col> 
                                <Col md="1">   
                                    <button className="boton-instructivo" onClick={() => desplegarInstructivoDiccionario()}>Instructivo</button>
                                </Col>   
                                <Col md="2">
                                    <button className="boton-descarga" onClick={() => insertarDiccionario()}>{(archivosEnCarga.diccionario==="cargado") ? "Recargar" : "Subir Archivo"}</button>
                                </Col>   
                            </Row>
                                <br/>
                            <Row>
                                <Col md="1"/>  
                                <Col md="2">  
                                    <p className="titulo-descarga">Tabla Frecuencias</p> 
                                </Col>                             
                                <Col md="5">
                                    <input type="file" name="frec" onChange={(e)=>subirFrecuencia(e.target.files)}  className="upload-box"/>
                                </Col>
                                <Col md="1">   
                                    <button className="boton-instructivo" onClick={() => desplegarInstructivoFrecuencia()}>Instructivo</button>
                                </Col>   
                                <Col md="2">   
                                    <button className="boton-descarga" onClick={() => insertarFrecuencia()}>{(archivosEnCarga.frecuencia==="cargado") ? "Recargar" : "Subir Archivo"}</button>
                                </Col>  
                                <Col md="1"/>   

 
                            </Row>
                                <br/>                           
                            <Row>
                                <Col md="1"/>  
                                <Col md="2">  
                                    <p className="titulo-descarga">Lista Personal</p> 
                                </Col>                             
                                <Col md="5">
                                    <input type="file" name="pers" onChange={(e)=>subirPersonal(e.target.files)}  className="upload-box"/>
                                </Col>
                                <Col md="1">   
                                    <button className="boton-instructivo" onClick={() => desplegarInstructivoPersonal()}>Instructivo</button>
                                </Col>  
                                <Suspense fallback={<h5>Cargando archivo...</h5>}>
                                <Col md="2">                               
                                    <button className="boton-descarga" onClick={() => insertarPersonal()}>{(archivosEnCarga.empleado==="cargado") ? "Recargar" : "Subir Archivo"}</button>
                                </Col>
                                </Suspense> 
                                <Col md="1"/>
                            </Row>   
                            <br/>    
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Link de Descarga de Archivo</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <br/>
                            <Row >
                                <Col md="5"/>  
                                <Col md="6">
                                    {botonDescarga}                       
{/* 
                                    <a href={`${dataLink}`} >Tabla Desnormalizada</a> */}

                                </Col> 
                                <Col md="1"/>
                            </Row>
                            <br/>
                        </Card.Body>
                    </Card>     
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default SubirArchivos



