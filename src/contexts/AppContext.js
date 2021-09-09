// Componente: AppContext.js
// Autor: Reinaldo Vicini
// Fecha: 2021/02/17
// Descripcion: Contexto de variables globales
// Parametros:
//

import React, { useEffect, useState } from "react";
import image3 from "assets/img/full-screen-image-3.jpg";

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {

  const [listaActividades, setListaActividades] = useState([]);
  const [perfiles, setPerfiles] = useState([
    { perfil: "client", layout: "/cliente" },
    { perfil: "director", layout: "/gerencia" },
    { perfil: "consult", layout: "/empresa" },
  ]);
  const [coloresAvatar,setColoresAvatar] = useState(["DarkSeaGreen","Gold","DarkOrchid","Green","Khaki","LightCoral","aquamarine","beige","lavenderBlush"]);
  const [archivosEnCarga,setArchivosEnCarga] =useState({})
  const [isOpenModalBorrarEmpresa, setIsOpenModalBorrarEmpresa] = useState(false);
  const [isOpenModalAgregarEmpresa, setIsOpenModalAgregarEmpresa] = useState(false);
  const [isOpenModalConsultarActividades, setIsOpenModalConsultarActividades] = useState(false);
  const [listaEmpresasSesion,setListaEmpresasSesion]=useState([]);
  const [listaConsultores,setListaConsultores]=useState([]);
  const [listaPersonal,setListaPersonal] = useState([]);
  const [empresas, setEmpresas] = useState();
  const [empresaConsultor, setEmpresaConsultor] = useState("");
  const [layout, setLayout] = useState("");
  const [empresa, setEmpresa] = useState({});
  const [empleado, setEmpleado] = useState({nombre:" "});
  const [token, setToken] = useState("");
  const [perfil, setPerfil] = useState("");
  const [sidebarImage, setSidebarImage] = useState(image3);
  const [sidebarBackground, setSidebarBackground] = useState("red");
  const [diccionario, setDiccionario] = useState([]);
  const [frecuencia, setFrecuencia] = useState([]);
  const [selectN1, setSelectN1] = useState(null);
  const [selectN2, setSelectN2] = useState(null);
  const [selectN3, setSelectN3] = useState(null);
  const [selectN4, setSelectN4] = useState(null);
  const [selectN5, setSelectN5] = useState(null);
  const [diccN1, setDiccN1] = useState([]);
  const [diccN2, setDiccN2] = useState(null);
  const [diccN3, setDiccN3] = useState(null);
  const [diccN4, setDiccN4] = useState(null);
  const [diccN5, setDiccN5] = useState(null);
  const [inhabilitarDropdownN2, setInhabilitarDropdownN2] = useState(true);
  const [inhabilitarDropdownN3, setInhabilitarDropdownN3] = useState(true);
  const [inhabilitarDropdownN4, setInhabilitarDropdownN4] = useState(true);
  const [inhabilitarDropdownN5, setInhabilitarDropdownN5] = useState(true);
  let tablas = ["Macroproceso", "Proceso", "Actividad","Tarea","Subtarea"];
  const placeholderN1 = "Seleccione ".concat(tablas[0], "...");
  const placeholderN2 = "Seleccione ".concat(tablas[1], "...");
  const placeholderN3 = "Seleccione ".concat(tablas[2], "...");
  const placeholderN4 = "Seleccione ".concat(tablas[3], "...");
  const placeholderN5 = "Seleccione ".concat(tablas[4], "...");
  const [tablaUnidadesTiempo, setTablaUnidadesTiempo] = useState([])
  const [tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia] = useState([])
  const [actividadCascadaSeleccionada, setActividadCascadaSeleccionada] = useState(null)
  const [listaSeleccion, setListaSeleccion] = useState([])
  const [isOpenModalVerEncuesta, setIsOpenModalVerEncuesta] = useState(false)

    function formatearNivel(nivel) {
        var tempid_actividad = nivel.substring(0, 3);
        var nroNiveles = nivel.length / 3;
        var j;

        for (j = 1; j < nroNiveles; j++) {
        tempid_actividad = tempid_actividad + "-" + nivel.substr(j * 3, 3);
        }
        return tempid_actividad;
    }

        const urlBack = "http://servicio.vena.com.co";


    return (
        <AppContext.Provider
        value={{
            isOpenModalVerEncuesta: isOpenModalVerEncuesta,
            setIsOpenModalVerEncuesta: setIsOpenModalVerEncuesta,
            listaSeleccion: listaSeleccion,
            setListaSeleccion: setListaSeleccion,
            archivosEnCarga: archivosEnCarga,
            setArchivosEnCarga:setArchivosEnCarga,
            coloresAvatar: coloresAvatar,
            isOpenModalAgregarEmpresa: isOpenModalAgregarEmpresa,
            setIsOpenModalAgregarEmpresa: setIsOpenModalAgregarEmpresa,
            isOpenModalBorrarEmpresa: isOpenModalBorrarEmpresa,
            setIsOpenModalBorrarEmpresa : setIsOpenModalBorrarEmpresa,
            isOpenModalConsultarActividades: isOpenModalConsultarActividades,
            setIsOpenModalConsultarActividades: setIsOpenModalConsultarActividades,
            listaEmpresasSesion,listaEmpresasSesion,
            setListaEmpresasSesion,setListaEmpresasSesion,    
            listaConsultores: listaConsultores,
            setListaConsultores: setListaConsultores,
            listaPersonal: listaPersonal,   
            setListaPersonal, setListaPersonal,  
            empresas: empresas,
            setEmpresas: setEmpresas,
            empresaConsultor: empresaConsultor, 
            setEmpresaConsultor: setEmpresaConsultor,
            formatearNivel: formatearNivel,
            actividadCascadaSeleccionada: actividadCascadaSeleccionada,
            setActividadCascadaSeleccionada: setActividadCascadaSeleccionada,
            tablaUnidadesFrecuencia: tablaUnidadesFrecuencia,
            setTablaUnidadesFrecuencia: setTablaUnidadesFrecuencia,        
            tablaUnidadesTiempo: tablaUnidadesTiempo,
            setTablaUnidadesTiempo: setTablaUnidadesTiempo,
            listaActividades: listaActividades,
            setListaActividades: setListaActividades,
            urlBack: urlBack,
            empresaConsultor: empresaConsultor,
            setEmpresaConsultor: setEmpresaConsultor,
            diccionario: diccionario,
            setDiccionario: setDiccionario,
            frecuencia: frecuencia,
            setFrecuencia: setFrecuencia,
            tablas: tablas,
            perfiles: perfiles,
            layout: layout,
            setLayout: setLayout,
            empresa: empresa,
            setEmpresa: setEmpresa,
            empleado: empleado,
            setEmpleado: setEmpleado,
            token: token,
            setToken: setToken,
            perfil: perfil,
            setPerfil: setPerfil,
            sidebarImage: sidebarImage,
            setSidebarImage: setSidebarImage,
            sidebarBackground: sidebarBackground,
            setSidebarBackground: setSidebarBackground,
            selectN1: selectN1,
            setSelectN1: setSelectN1,
            selectN2: selectN2,
            setSelectN2: setSelectN2,
            selectN3: selectN3,
            setSelectN3: setSelectN3,
            selectN4: selectN4,
            setSelectN4: setSelectN4,
            selectN5: selectN5,
            setSelectN5: setSelectN5,
            diccN1: diccN1,
            setDiccN1: setDiccN1,
            diccN2: diccN2,
            setDiccN2: setDiccN2,
            diccN3: diccN3,
            setDiccN3: setDiccN3,
            diccN4: diccN4,
            setDiccN4: setDiccN4,
            diccN5: diccN5,
            setDiccN5: setDiccN5,
            inhabilitarDropdownN2: inhabilitarDropdownN2,
            setInhabilitarDropdownN2: setInhabilitarDropdownN2,
            inhabilitarDropdownN3: inhabilitarDropdownN3,
            setInhabilitarDropdownN3: setInhabilitarDropdownN3,
            inhabilitarDropdownN4: inhabilitarDropdownN4,
            setInhabilitarDropdownN4: setInhabilitarDropdownN4,
            inhabilitarDropdownN5: inhabilitarDropdownN5,
            setInhabilitarDropdownN5: setInhabilitarDropdownN5,
            placeholderN1: placeholderN1,
            placeholderN2: placeholderN2,
            placeholderN3: placeholderN3,
            placeholderN4: placeholderN4,
            placeholderN5: placeholderN5,
        }}
        >
        {children}
        </AppContext.Provider>
    );
    };
