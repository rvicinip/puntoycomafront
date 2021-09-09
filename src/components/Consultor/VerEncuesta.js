import React, { useState, useEffect, useRef, Fragment } from "react";
import DataTable from 'react-data-table-component';
import Select from "react-select";
import {useAppContext} from "hooks/useAppContext";
import {listActivitiesByUser, editarRegistroEncuesta} from "services/ServiciosBackend"
import {useForm} from "react-hook-form"
import {Row, Col, Modal, Button, Card} from "react-bootstrap";
import "assets/css/vena.css";
import swal from "sweetalert";

function VerEncuesta(fila) {


    //Incluir variables globales 
    const { formatearNivel, empresa, empleado, tablas, diccionario, token, setListaActividades, listaActividades,
        selectN1, selectN2, selectN3, selectN4, selectN5, tablaUnidadesTiempo, tablaUnidadesFrecuencia,
        inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
        isOpenModalVerEncuesta, setIsOpenModalVerEncuesta, diccN1,diccN2,diccN3, diccN4,diccN5,
        setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
        setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
        setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
        placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
        listaSeleccion, setListaSeleccion, isOpenmodalset} = useAppContext();
    
    const [columnas, setColumnas] = useState(null)   
    console.log("VerEncuesta/CargaListaSeleccion 1: Peticion", fila, token, fila.id_usuario)

    useEffect ( () => {
        console.log("VerEncuesta/CargaListaSeleccion 1: Peticion", fila, token, fila.id_usuario)
        asignarColumnas() 
    }, []); 
    
   
    const formatearIdActividad = (row) => {
        const variable=formatearNivel(row.id_actividad)
        return (<div> {variable}</div>) }    

    const asignarColumnas = () => {
        setColumnas([
        {
            name: "Id_Actividad",
            cell: row => formatearIdActividad(row),
            width: "150px",
        }, ])}
 
    
    const paginacionOpciones={
        rowsPerPageText: "Filas por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsTextItem: "Todos"}  

               
    return (
   <div>
 
        <div >

            <DataTable
                columns={columnas}
                data={listaSeleccion}
                pagination
                paginationComponentOptions={paginacionOpciones}
                fixedHeader
                fixedHeaderHeigth="600px"
                contextMessage={ {singular: 'empleado', plural: 'empleados', message: 'seleccionados'} }
                noDataComponent={<span>No se encontró ningún elemento</span>}
            />

        </div>

    </div>);
    
}

export default VerEncuesta;
