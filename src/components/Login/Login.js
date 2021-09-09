import React, { useState, useEffect } from "react";
import { useHistory, BrowserRouter as Router } from "react-router-dom";
import swal from "sweetalert";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";
import "assets/css/vena.css";

import { getInfoFull, getCompaniesAll, getCompaniesConsultor, autorizarCliente, obtenerEmpresa, obtenerDatos, listDictionaryWithInquest } from "services/ServiciosBackend";
import * as storage from "services/ManejadorStorage";
import { useAppContext } from "hooks/useAppContext";

import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";


function Login() {

const { setArchivosEnCarga, perfiles, setEmpresa, setEmpresas, setEmpleado, 
    setDiccionario, setToken, setListaActividades,
    setTablaUnidadesFrecuencia, setTablaUnidadesTiempo,
    layout, setLayout, setPerfil, setFrecuencia} = useAppContext();
const history = useHistory();

//  State para iniciar sesión
const [cedula, setCedula] = useState("");
const [contrasena, setContrasena] = useState("");
const [ready, setReady] = useState(false);


useEffect(() => {
    if (cedula === "" || contrasena === "") setReady(false);
    else setReady(true);
});

// Asigna los valores en el cambio del objeto
// Cedula

const onChangeCedula = (e) => {
    let cedulaArreglada = e.target.value.toUpperCase()
    setCedula(cedulaArreglada);
    console.log ("Login 46: e.target.value.toUpperCase()", cedulaArreglada)
    if (cedula === "") setReady(false);
    else setReady(true);
};

// Cambios en los valores del campo
// Contrasena

const onChangeContrasena = (e) => {

    setContrasena(e.target.value);
    if (contrasena === "") setReady(false);
    else setReady(true);

};


function UnidadFrecuencia(frecuencias,valorHoras) {
    var arreglo=[];
    for (var i=0; i<frecuencias.length; i+=1) {
    if (frecuencias[i].tipo==2)  
        arreglo.push(
        {
        id: frecuencias[i].id,
        nombre:frecuencias[i].nombre,
        tipo: frecuencias[i].tipo,
        valor: frecuencias[i].valor,
        empresa: frecuencias[i].empresa,
        unidad: frecuencias[i].unidad,
        ahoras: frecuencias[i].valor*valorHoras})
    }

    return arreglo;
}

let tokenSesion = "";
let empresaSesion={}
let empleadoSesion={};
let listaActividadesCargada=[];
let perfilSesion={};
let layoutSesion="";
let idEmpresaSesion="";
let frecuenciaSesion=[];
let diccionarioSesion=[];
let tablaUnidadesTiempoSesion=[];
let tablaUnidadesFrecuenciaSesion=[];


// Procesamiento una vez se le da
// Submit al formulario

const validateLogin = async (e) => {
    // Paramos al formulario para que no pase derecho y
    // podamos realizar las validaciones

    e.preventDefault();

// Validar que no haya campos vacios

    try {
        if (!ready)  {
            swal("ERROR:\nAmbos campos son obligatorios");
            return
        }   

        console.log("Login 110: autorizarCliente Peticion",cedula, contrasena);


        let data = {
            id_usuario: cedula,
            clave: contrasena,
        };

        const autorizado = await autorizarCliente(data);

        if (await autorizado.data.response==="ERROR")
            throw autorizado;
        
        console.log("Login 122: DataRecibida # 1", await autorizado)
        empleadoSesion= await autorizado.data.data;
        tokenSesion=    await autorizado.data.token;
        perfilSesion =  empleadoSesion.perfil;
        idEmpresaSesion= await autorizado.data.data.empresa;

        console.log("Login: DataRecibida # 2", autorizado)
        console.log("Login: Perfiles", autorizado.data.data.perfil, perfiles)
        const miPerfil= perfiles.find (perfil => perfil.perfil === perfilSesion);
        layoutSesion = miPerfil.layout;
        console.log("Login: perfilSesion, layoutSesion", perfilSesion, layoutSesion), empleadoSesion.perfil
 
        switch (perfilSesion) {
            case ("consult") : {
                setToken(tokenSesion);
                setEmpleado(empleadoSesion);

                console.log("Login 140: obtenerEmpresa Peticion",tokenSesion);
                let resConsult = await getCompaniesConsultor(tokenSesion);
                console.log("Login 150: ObtenerEmpresa Respuesta ",resConsult.data)  
                
                if (await resConsult.data.response==="ERROR"){
                    swal("ERROR:\nConsultor no tiene empresas asociadas") 
                    setToken("")}
        
                else {   
                    setPerfil(perfilSesion);
                    setLayout("/empresa-auth"); 
                    let empresasClasificadas = resConsult.data.data
                    empresasClasificadas.sort(function(a,b) {
                        var textA = a.nombre.toLowerCase();
                        var textB = b.nombre.toLowerCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; })
                    setEmpresas(empresasClasificadas)}

                break;}
            case ("director")     : {
                setToken(tokenSesion);
                setEmpleado(empleadoSesion);
                setPerfil(perfilSesion);
                setLayout("/gerencia-auth");
                console.log("Login 164: Gerente obtenerEmpresa Peticion",tokenSesion);
    
                let resGerente = await getCompaniesAll(tokenSesion);
        
                if (await resGerente.data.response==="ERROR")
                    throw await resGerente.data;
        
                else {    
                    console.log("Login 173: Gerente ObtenerEmpresas Respuesta ",resGerente.data, resGerente.data.data)
                    let empresasClasificadas = await resGerente.data.data
                    empresasClasificadas.sort(function(a,b) {
                        var textA = a.nombre.toLowerCase();
                        var textB = b.nombre.toLowerCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; })
                    setEmpresas(empresasClasificadas)}
                break;}

            case ("client") : {
            //  Si el perfil es consultor, entonces debe escoger la empresa en que va a trabajar         
                console.log("Login 186: Cliente obtenerEmpresa Peticion",tokenSesion, idEmpresaSesion);

                let res = await obtenerEmpresa(tokenSesion, idEmpresaSesion);

                if (await res.data.response==="ERROR")
                    throw res ; 

                console.log("Login 193: Cliente obtenerEmpresa ",res.data)
                empresaSesion = await res.data.data

                const archivosCargados = await getInfoFull(tokenSesion, idEmpresaSesion)
                const estatusArchivos = await archivosCargados.data.data
                console.log("Login 198: archivosCargados", archivosCargados, archivosCargados.data)

                if (await archivosCargados.data.response==="ERROR")
                    throw archivosCargados ; 
                setArchivosEnCarga(estatusArchivos) ;
                if (estatusArchivos.diccionario !== 'cargado' || estatusArchivos.empleado !== 'cargado' || estatusArchivos.frecuencia !== 'cargado')
                    swal ("ADVERTENCIA:\n Información de la empresa para poder realizar su proceso no se encuentra aún totalmente cargada. Favor consulte con el consultor asociado o con su supervisor directo");
                
                else   {
                
                    let datos = {
                    token: tokenSesion,
                    id_empresa: idEmpresaSesion,};

                    console.log("Login 212: Cliente obtenerDatos Peticion", datos.token, datos.id_empresa); 

                    const resData = await obtenerDatos(datos.token, datos.id_empresa);

                    if (await resData.data.response==="ERROR")
                        throw await resData;

                    frecuenciaSesion  = await resData.data.frecuencia;
                    diccionarioSesion = await resData.data.diccionario;
                    diccionarioSesion.sort(function(a,b) {
                        var textA = a.id_actividad.toLowerCase();
                        var textB = b.id_actividad.toLowerCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; }) 
            

                    let horas=frecuenciaSesion.filter((entrada) => entrada.nombre==="Dia" && entrada.tipo==1);
                    let valorHoras=horas[0].valor;
                    
                    tablaUnidadesFrecuenciaSesion = UnidadFrecuencia(frecuenciaSesion,valorHoras);
                    tablaUnidadesTiempoSesion= frecuenciaSesion.filter ((entrada) => entrada.tipo == 1);

                    console.log ("Login 233: Cliente frecuenciaSesion",frecuenciaSesion); 
                    console.log ("Login 234: Cliente diccionarioSesion",diccionarioSesion); 
                    console.log ("Login 235: Cliente tablaUnidadesFrecuenciaSesion",tablaUnidadesFrecuenciaSesion);                         
                    console.log ("Login 236: Cliente tablaUnidadesTiempoSesion",tablaUnidadesTiempoSesion); 

                    const actividadesEncuesta = await listDictionaryWithInquest(tokenSesion)
                    const listaActividadesCargada = await actividadesEncuesta.data.data
                    console.log ("Login 240: Cliente listaActividadesCargada",listaActividadesCargada); 


                    listaActividadesCargada.sort(function(a,b) {
                    var textA = a.id_actividad.toLowerCase();
                    var textB = b.id_actividad.toLowerCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; }) 

                    console.log("Login 250: Cliente listaActividadesCargada-Correcto",listaActividadesCargada)

                    console.log ("Login 258 Cliente Todo bien. Grabar")

                    setToken(tokenSesion);
                    setEmpleado(empleadoSesion);
                    setEmpresa(empresaSesion); 
                    setListaActividades(listaActividadesCargada);
                    setPerfil(perfilSesion);
                    setLayout(layoutSesion);
                    setFrecuencia(frecuenciaSesion);
                    setDiccionario(diccionarioSesion);
                    setTablaUnidadesTiempo(tablaUnidadesTiempoSesion);
                    setTablaUnidadesFrecuencia(tablaUnidadesFrecuenciaSesion) }
                break;}}}


    catch (error) {

            console.log("Login catch error",error)
            if (error.data.message !== undefined)
                swal ("ERROR\n"+error.data.message);
            setToken("")  }  }

return (
    <React.Fragment>
    <div
        className="full-page"
        data-color="#e73e47"
        data-image={require("assets/img/vena.png").default}
    >
        <div className="content align-items-center">
            <Col className="mx-auto" lg="4" md="8">
                <Card >
                    <div className="tarjetalogin">
                        <Card.Header >
                            <Row>
                                <Col/>
                                <Col>
                                    <a href="https://venaycia.com/" >
                                    <img
                                        className="logologin"
                                        alt="..."
                                        src={require("assets/img/vena-sidebar.png").default}
                                        />
                                    </a>                   
                                    {/* <h5 className="text-center">Login BPM</h5> */}
                                </Col>
                                <Col/>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form className="form" >
                                <Form.Group>
                                    <label>Usuario</label>
                                    <Form.Control
                                        placeholder="Su Número de Cédula o Identificación"
                                        id="cedula"
                                        nombre="cedula"
                                        type="text"
                                        value={cedula}
                                        onChange={onChangeCedula}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <label>Contraseña</label>
                                    <Form.Control
                                        placeholder="Su contraseña"
                                        type="password"
                                        id="contrasena"
                                        nombre="contrasena"
                                        value={contrasena}
                                        onChange={onChangeContrasena}>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="ml-auto mr-auto">
                            <Row>
                                <Col/>
                                <Col>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        onClick={validateLogin}
                                        >
                                        Ingresar
                                    </Button>
                                </Col>
                                <Col/>
                            </Row>
                        </Card.Footer>
                        </div>
                </Card>
              
            </Col>
        </div>
    </div>
    </React.Fragment>
);
}

export default Login;