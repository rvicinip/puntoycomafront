import React  from "react";
import { Switch, Route } from "react-router-dom";

import { useAppContext } from "hooks/useAppContext";

import routes from "routes.js";
import Sidebar from "components/Menu/Sidebar.js";
import Login from "components/Login/Login.js";
import { Container, Col, Row, Card } from "react-bootstrap";

function Layout() {
  // Carga de Variables de contexto

  const {
    layout,
    setLayout,
    setEmpleado,
    setPerfil,
    empresa,
    setEmpresa,
    empleado,
    token,
    sidebarImage,
    setSidebarImage,
    sidebarBackground,
    setSidebarBackground,
    empresaConsultor,
    setEmpresaConsultor,
  } = useAppContext();
    

  // Info de empresa

// Retomar el token que esta en el Storage


  while (token === "") {

  //  Revisar que todo está completo para que pueda salir
    return <Login />
  } 


  // Construir las rutas de navegacion de los clientes

  const getRoutes = (routes, layout) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      if (prop.layout === layout && prop.tablero) {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };

 // Construir el arreglo de rutas validas desde routes con el layout del usuario
const rutasFiltradas = routes.filter((ruta) => ruta.layout == layout);

let empresaaPintar = "Bienvenido al sistema BPM"
if (empresaConsultor !== "" && empresaConsultor !== undefined) {
    empresaaPintar=empresaConsultor.nombre;
    console.log("Layout 1: empresaConsultor", empresaConsultor)}
else {
    if (empresa.nombre === undefined)
        empresaaPintar="Bienvenido al Sistema BPM"
    else    {
    console.log("Layout 2: empresa.nombre", empresa.nombre)
    empresaaPintar="Proceso Empresa "+empresa.nombre;}}
return (
    <React.Fragment>

        <div className="wrapper">

            <Sidebar
            empleado={empleado.nombre}
            routes={rutasFiltradas}
            image={sidebarImage}
            background={sidebarBackground}
            />
            <div className="main-panel">
                <div >
                    <Card>
                        <div className="tarjeta1a" style={{backgroundColor: "#e73e47", color: "white"}}>{empresaaPintar}</div> 
                    </Card> 
                </div>
                <div className="content">
                    <Switch>{getRoutes(routes, layout)}</Switch>
                </div>    
                <div
                        className="close-layer"
                        onClick={() =>
                        document.documentElement.classList.toggle("nav-open")
                        }
                        />
            </div>
        </div>


    </React.Fragment>
);
}

export default Layout;


