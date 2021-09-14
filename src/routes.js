// Componente: routes.js
// Autor: Reinaldo Vicini
// Fecha: 2021/09/14
// Descripcion: 
// Parametros:  
//
 
import CambioClave from "components/Login/CambioClave.js";
import TerminarSesion from "components/Login/TerminarSesion.js";
import AnalisisVentas from "components/Empresa/AnalisisVentas.js";
import CorreosPromocion from "components/Empresa/CorreosPromocion.js";
import EfectividadCampana from "components/Empresa/EfectividadCampana.js"
import OfertasyPromos from "components/Empresa/OfertasyPromos.js";
import PatronesConsumo from "components/Empresa/PatronesConsumo.js";
import Redencion from "components/Empresa/Redencion.js"
import SeguimientoCliente from "components/Empresa/SeguimientoCliente.js"
import SMSPromocion from "components/Empresa/TablaFrecuenciasConsultor.js"
import SubirFacturas from "components/Empresa/SubirFacturas.js"
import SubirIncentivos from "components/Empresa/SubirIncentivos.js"
import Usuarios from "components/Empresa/Usuarios.js"




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