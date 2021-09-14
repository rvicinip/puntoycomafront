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
    path: "/subirfactura",
    layout: "/empresa",
    name: "Subir Facturas",
    icon: "nc-icon nc-button-power",
    tablero: true,
    component: SubirFacturas
},
{
    path: "/subirincentivos",
    layout: "/empresa",
    name: "Subir Incentivos",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: SubirIncentivos
},


{
    path: "/ofertaspromociones",
    layout: "/empresa",
    name: "Ofertas y Promos",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: OfertasyPromos
},

{
    path: "/correospromo",
    layout: "/empresa",
    name: "Enviar correos promocion",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: CorreosPromocion
},

{
    path: "/smspromo",
    layout: "/empresa",
    name: "Enviar SMS promo",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: SMSPromocion
},
{
    path: "/efectividadcampana",
    layout: "/empresa",
    name: "Enviar Efectividad Campaña",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: EfectividadCampana
},
{
    path: "/patronesconsumo",
    layout: "/empresa",
    name: "Patrones Consumo",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: PatronesConsumo
},
{
    path: "/analisisventas",
    layout: "/empresa",
    name: "Analisis Ventas",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: AnalisisVentas
},
{
    path: "/usuarios",
    layout: "/empresa",
    name: "Usuarios y Roles",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: Usuarios
},

{
    path: "/seguimientocliente",
    layout: "/empresa",
    name: "Seguimiento Clientes",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: SeguimientoCliente
},

{
    path: "/redenciones",
    layout: "/empresa",
    name: "Sistema Redención",
    icon: "nc-icon nc-lock-circle-open",
    tablero: true,
    component: Redencion
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


];
export default routes;