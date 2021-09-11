// Componente: routes.js
// Autor: Reinaldo Vicini
// Fecha: 2021/01/14
// Descripcion: 
// Parametros:  
//
 


import CambioClave from "components/Login/CambioClave.js";
import TerminarSesion from "components/Login/TerminarSesion.js";

import CierreRegistrarActividades from "components/Cliente/CierreRegistrarActividades.js";
import ListaActividadesASeleccionar from "components/Cliente/ListaActividadesASeleccionar.js";
import ListaTomasTiempo from "components/Cliente/ListaTomasTiempo.js"

import ListaActividades from "components/Consultor/ListaActividades.js";
import ListaPersonal from "components/Consultor/ListaPersonal.js";
import SeleccionEmpresa from "components/Consultor/SeleccionEmpresa.js"
import SubirArchivos from "components/Consultor/SubirArchivos.js"
import TablaFrecuenciasConsultor from "components/Consultor/TablaFrecuenciasConsultor.js"

import AgregarEmpresa from "components/Gerencia/AgregarEmpresa.js"
import ListaConsultores from "components/Gerencia/ListaConsultores.js"




var routes = [ 
{
    path: "/diccionario",
    layout: "/cliente", 
    name: "Seleccion Actividades",
    icon: "nc-icon nc-paper-2",
    tablero: true,
    component: ListaActividadesASeleccionar
},
{
    path: "/diccionario",
    layout: "/cliente", 
    name: "Seleccion Actividades",
    icon: "nc-icon nc-paper-2",
    tablero: true,
    component: ListaActividadesASeleccionar
},
{
    path: "/actividades",
    layout: "/cliente",
    name: "Registro Tiempos",
    icon: "nc-icon nc-chart-bar-32",
    tablero: true,
    component: ListaTomasTiempo
},
{
    path: "/cierre",
    layout: "/cliente",
    name: "Cerrar Proceso",
    icon: "nc-icon nc-cloud-upload-94",
    tablero: true,
    component: CierreRegistrarActividades,
},
{
    path: "/cambio-clave",
    layout: "/cliente",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,    
    component: CambioClave
},
{
    path: "/logoff",
    layout: "/cliente",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion,
},
{
    path: "/seleccionempresacliente",
    layout: "/empresa",
    name: "Seleccionar Empresa",
    icon: "nc-icon nc-single-02",
    tablero: true,
    component: SeleccionEmpresa 
},
{
    path: "/subirarchivoscliente",
    layout: "/empresa",
    name: "Carga/Descarga",
    icon: "nc-icon nc-attach-87",
    tablero: true,
    component: SubirArchivos
},
{
    path: "/crud",
    layout: "/empresa",
    name: "Participantes",
    icon: "nc-icon nc-vector",
    tablero: true,
    component: ListaPersonal
},
{
    path: "/diccionario",
    layout: "/empresa",
    name: "Diccionario",
    tablero: true,
    icon: "nc-icon nc-paper-2",
    component: ListaActividades
},
{
    path: "/frecuencias",
    layout: "/empresa",
    name: "Tabla Frecuencias",
    //mini: "FR",
    tablero: true,
    icon: "nc-icon nc-time-alarm",
    component:  TablaFrecuenciasConsultor
},  

{
    path: "/cambio-clave",
    layout: "/empresa",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CambioClave
},

{
    path: "/logoff",
    layout: "/empresa",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion
},

{
    path: "/seleccionempresacliente",
    layout: "/empresa-nva",
    name: "Seleccionar Empresa",
    icon: "nc-icon nc-single-02",
    tablero: true,
    component: SeleccionEmpresa 
},

{
    path: "/subirarchivoscliente",
    layout: "/empresa-nva",
    name: "Carga/Descarga",
    icon: "nc-icon nc-attach-87",
    tablero: true,
    component: SubirArchivos
},

{
    path: "/cambio-clave",
    layout: "/empresa-nva",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CambioClave
},

{
    path: "/logoff",
    layout: "/empresa-nva",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion
},

{
    path: "/seleccionempresacliente",
    layout: "/empresa-auth",
    name: "Seleccionar Empresa",
    icon: "nc-icon nc-single-02",
    tablero: true,
    component: SeleccionEmpresa 
},

{
    path: "/cambio-clave",
    layout: "/empresa-auth",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CambioClave
},

{
    path: "/logoff",
    layout: "/empresa-auth",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion
},


{
    path: "/seleccionempresa",
    layout: "/gerencia",
    name: "Cambiar Empresa",
    icon: "nc-icon nc-tap-01",
    tablero: true,
    component: SeleccionEmpresa 
},


{
    path: "/consultores-vena",
    layout: "/gerencia",
    name: "Consultores",
    icon: "nc-icon nc-circle-09",
    tablero: true,
    component: ListaConsultores
},

{
    path: "/subirarchivoscliente",
    layout: "/gerencia",
    name: "Carga/Descarga",
    icon: "nc-icon nc-attach-87",
    tablero: true,
    component: SubirArchivos
},


{
    path: "/crud",
    layout: "/gerencia",
    name: "Participantes",
    icon: "nc-icon nc-vector",
    tablero: true,
    component: ListaPersonal
},
{
    path: "/diccionario",
    layout: "/gerencia",
    name: "Diccionario",
    tablero: true,
    icon: "nc-icon nc-paper-2",
    component: ListaActividades
},
{
    path: "/frecuencias",
    layout: "/gerencia",
    name: "Tabla Frecuencias",
    //mini: "FR",
    tablero: true,
    icon: "nc-icon nc-time-alarm",
    component:  TablaFrecuenciasConsultor

},  
{
    // path: "/cierre-empresa",
    // layout: "/gerencia",
    // name: "Cierre Empresa",
    // icon: "nc-icon nc-check-2",
    // tablero: true,
    // component: Dashboard
},

{
    path: "/cambio-clave",
    layout: "/gerencia",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CambioClave
},

{
    path: "/logoff",
    layout: "/gerencia",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion
},


{
    path: "/nvaempresa",
    layout: "/gerencia-auth",
    name: "Nueva Empresa",
    icon: "nc-icon nc-simple-add",
    tablero: true,
    component: AgregarEmpresa 
},

{
    path: "/seleccionempresa",
    layout: "/gerencia-auth",
    name: "Abrir Empresa",
    icon: "nc-icon nc-bank",
    tablero: true,
    component: SeleccionEmpresa 
},


{
    path: "/cambio-clave",
    layout: "/gerencia-auth",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CambioClave
},

{
    path: "/logoff",
    layout: "/gerencia-auth",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion
},

{
    path: "/seleccionempresa",
    layout: "/gerencia-nva",
    name: "Cambiar Empresa",
    icon: "nc-icon nc-tap-01",
    tablero: true,
    component: SeleccionEmpresa 
},


{
    path: "/subirarchivoscliente",
    layout: "/gerencia-nva",
    name: "Carga/Descarga",
    icon: "nc-icon nc-attach-87",
    tablero: true,
    component: SubirArchivos
},

{
    path: "/consultores-vena",
    layout: "/gerencia-nva",
    name: "Consultores",
    icon: "nc-icon nc-circle-09",
    tablero: true,
    component: ListaConsultores
},

{
    path: "/cambio-clave",
    layout: "/gerencia-nva",
    name: "Cambio Contraseña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CambioClave
},

{
    path: "/logoff",
    layout: "/gerencia-nva",
    name: "Terminar Sesión",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: TerminarSesion
},


];
export default routes;