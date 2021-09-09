import React, { useEffect, useState, Fragment } from "react";
import { useTable, usePagination } from "react-table";
import swal from "sweetalert";
import { useAppContext } from "hooks/useAppContext";
import { Modal, Button, Container, Card, Row, Col } from 'react-bootstrap';



function EncuestasTabla(fila) {

    const { isOpenModalVerEncuesta, setIsOpenModalVerEncuesta,isOpenModalConsultarActividades, setIsOpenModalConsultarActividades, empresaConsultor, setEmpresaConsultor,  
        empresas, setEmpresas, formatearNivel, frecuencia, setFrecuencia, 
        empresa, empleado, tablas, diccionario, setDiccionario, token, setListaPersonal, listaPersonal,
        selectN1, selectN2, selectN3, selectN4, selectN5,
        inhabilitarDropdownN1,inhabilitarDropdownN2,inhabilitarDropdownN3, inhabilitarDropdownN4,inhabilitarDropdownN5,
        listaSeleccion, setListaSeleccion, diccN1,diccN2,diccN3, diccN4,diccN5,
        setSelectN1, setSelectN2, setSelectN3, setSelectN4, setSelectN5,
        setInhabilitarDropdownN1,setInhabilitarDropdownN2,setInhabilitarDropdownN3,setInhabilitarDropdownN4,setInhabilitarDropdownN5,
        setDiccN1,setDiccN2,setDiccN3, setDiccN4,setDiccN5,
        placeholderN1,placeholderN2,placeholderN3,placeholderN4,placeholderN5,
        actividadCascadaSeleccionada, setActividadCascadaSeleccionada, listaActividades, setListaActividades,
        tablaUnidadesTiempo, setTablaUnidadesTiempo, tablaUnidadesFrecuencia, setTablaUnidadesFrecuencia } = useAppContext();   
    
    const [personaje, setPersonaje] = useState(null)
    useEffect (() => {
        console.log ("Entra a useEffect fila", fila        )
        const persona = definirPersonaje(fila)
        setPersonaje(persona)
    }, [])

  // Carga de Variables de contexto

    const manejarAperturaModalVerEncuesta = () => {
        setIsOpenModalVerEncuesta(true);}

    const manejarCierreModalVerEncuesta = () =>  {
        setIsOpenModalVerEncuesta(false); }

    const data = listaSeleccion;


    function definirPersonaje(fila) {
        const nombre=fila.nombre
        const cargo=fila.cargo
        return (
            <div>
                {nombre}<br/>
                {cargo}
            </div>

        )
    }
    
    const formatearNombre = (row) => {
        const descripcion = row.diccionario.descripcion
        let tnombre = row.diccionario.nombre
        let variable=null
        const nivelActividad = row.diccionario.id_actividad.length/3
        // console.log("ListaSeleccionaSeleccionar 123: ", row.id_actividad, empresa.niveles, nivelActividad)

        return (<Fragment>
                    <div className="estiloN5 paddingN1">
                        {row.diccionario.nombre}
                    </div>
                </Fragment>)   } 
    
    const formatearCantidad = (row) => {
        console.log("EncuestasTabla/formatearUMedida row",row)
        const cantidad=row.encuesta.cantidad
        return (<div style={{ textAlign: "center" }}>{cantidad}</div>)
    }

    const formatearUMedida = (row) => {
        console.log("EncuestasTabla/formatearUMedida row",row)
        const nombreUmedida=row.umedida
        return (<div style={{ textAlign: "center" }}>{nombreUmedida}</div>)
    }

    const formatearFrecuencia = (row) => {
        console.log("EncuestasTabla/formatearFrecuencia row",row)

       const nombreFrecuencia=row.frecuencia
        return (<div style={{ textAlign: "center" }}>{nombreFrecuencia}</div>)
    }





    const columns = React.useMemo(
        () => [
        {
            Header: "Actividad",
            accessor: d0 => formatearNivel(d0.diccionario.id_actividad), 
            width: "10px",
        },
        {
            Header: "Nombre",
            accessor: d0 => formatearNombre(d0),
            width: "150px",
        },
        {
            Header: "Cantidad",
            accessor: d0 => formatearCantidad(d0),
            width: "50px",
        },
        {
            Header: "Unidad",
            accessor: d0 => formatearUMedida(d0),
            width: "50px",
        },
        {
            Header: "Frecuencia",
            accessor: d0 => formatearFrecuencia(d0),
            width: "50px",
        },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable({ columns, data }, usePagination);

  const { pageIndex } = state;

    return (
        <div>
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isOpenModalVerEncuesta}
            onHide={manejarCierreModalVerEncuesta}>
            <Modal.Header >
                <Modal.Title>{(row) => definirPersonaje(row)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                      <Card.Body>
                        <div className="table-responsive">
                        <Card>
                    <Card.Header>
                    <Card.Title as="h4">Encuesta</Card.Title>

                    </Card.Header>
                    <Card.Body>
                    <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                    prepareRow(row);
                    return (
                        <tr key={row.id} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (
                            <td><div {...cell.getCellProps()}>
                                {cell.render("Cell")}</div>
                            </td>
                            );
                        })}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                <div className="paginacion">
                <span>
                    Pagina{" "}
                    <strong>
                    {pageIndex + 1} de {pageOptions.length}
                    </strong>{" "}
                </span>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="botonpaginacion"
                >
                    Anterior
                </button>
                <button 
                    className="botonpaginacion" 
                    OnClick={() => nextPage()} 
                    disabled={!canNextPage}
                >
                    Siguiente{" "}
                </button>
                </div>                
                </Card.Body>
                </Card>                    </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    className="botonpaginacion"
                    onClick={manejarCierreModalVerEncuesta}
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal> 
        </div>


  );
  }  

export default EncuestasTabla;


