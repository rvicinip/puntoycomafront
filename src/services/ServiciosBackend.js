

/**
  ServiciosBackend

  Gestiona la comunicación a los servicios backend para obtener la información

  @copyright: Vitt Inversiones SAS - vitt.co
  @license: Velasquez Naranjo y Cia SAS - Venaycia.com
  @author: Wiliam Arévalo Camacho
**/


import axios from "axios";
import axiosRetry from "axios-retry";




// const url = 'http://bpmback.pythonanywhere.com'
// const url = "http://localhost:4000/";
const url = "http://servicio.vena.com.co";
// const { token } = useAppContext();



// export const autorizarCliente = async (data) => {
//   console.log("AutorizarCliente: parametros en data", data)
//   const headersA = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const validador = await axios.post(url + "/access", data, headersA);
  
//   console.log("AutorizarCliente: Validador",validador)
//   return validador;
// };

// EMPRESAS
// 
// route: /company, method: 'GET'
// Recupera todas las empresas en la DB
// token: campo con el token de autenticación en el backend (Va en la cabecera de la Petición)
// idCompany: Id de la empresa
// 

// @app.route('/company', methods = ['GET'])
// def getCompanies(usuario):
export const getCompanies = async (token) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token}};
    console.log("ServiciosBackend getCompanies 55: Token",token);
    const companies = await axios.get(url + "/companies", headersA);
    console.log("ServiciosBackend getCompanies 57: Response",companies);
    return companies;};

//

export const getCompaniesAll = async (token) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token}};
    const companies = await axios.get(url + "/company", headersA);
    return companies;};





function manejoErrores(response) {
    if (response.data.response="ERROR") {
        mensaje = response.data.message;
        swal("ERROR:\n"+mensaje); }
   return; }

export const autorizarCliente = async (data) => {

    const headersA = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const validador = await axios.post(url + "/access", data, headersA)
    return validador;
};
  





// Cambiar password
export const changePasswordCliente = async (token, data) => {
  console.log("Token", token)
  console.log("Data", data)
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  const changePassword = await axios.post(url + "/user/clave", data, headersA);
  return changePassword;
};

export const crearConsultor = async (token, data) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  const validador = await axios.post(url + '/user', data, headersA);
  return validador;
};

export const obtenerEmpresa = async (token, idEmpresa) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  };
  console.log("Direccion",url + `/company/${idEmpresa}`)
  const empresa = await axios.get(url + `/company/${idEmpresa}`, headersA);
  return empresa;
};

export const obtenerEmpresaFull = async (token, idEmpresa) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  };
  const empresa = await axios.get(url + `/full/company/${idEmpresa}`, headersA);
  return empresa;
};

export const obtenerDatos = async (token, idEmpresa) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  };
  const datos = await axios.get(url + `/full/datos/${idEmpresa}`, headersA);
  return datos;
};

export const obtenerDiccionario = async (token, idEmpresa) => {

  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  };

  const diccionario = await axios.get(
    url + `/full/dictionary/${idEmpresa}`,
    headersA
  );

  console.log("Este es el diccionario que trae", diccionario ) 
  return diccionario;
};

export const obtenerFrecuencias = async (token, idEmpresa) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  };
  const frecuencias = await axios.get(
    url + `/full/frecuency/${idEmpresa}`,
    headersA
  );
  return frecuencias;
};

// @app.route('/full/employes/<idCompany>', methods = ['GET'])
// @privated
// def getEmployes(usuario, idCompany):
//    '''
//        getEmployes: Recupera todos los datos de una empresa junto con sus empleados \n
//        @params: 
//          idCompany: Id mongo de la empresa
//    '''
export const getEmployes = async (token, idEmpresa) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  };
  const datos = await axios.get(url + `/full/employes/${idEmpresa}`, headersA);
  return datos;
};

export const crearRegistroEncuesta = async (token, data) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  const encuesta = await axios.post(url + '/inquest/answer', data, headersA);
  return encuesta;
};

export const seleccionarOpcionEncuesta = async (token, data) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  console.log("Servicios Backend 182: Token",token)
  console.log("Servicios Backend 183: Data",data)
  const encuesta = await axios.post(url + '/inquest', data, headersA);
  console.log("Servicios Backend 183: Encuesta",encuesta)
  return encuesta;
};

export const editarRegistroEncuesta = async (token, data) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  console.log ("Servicios Backend Linea 196 editarRegistroEncuesta: Token",token, "Data",data)
  const encuesta = await axios.put(url + '/inquest/answer', data, headersA);
  console.log ("Servicios Backend Linea 198 editarRegistroEncuesta: encuesta",encuesta)

  return encuesta;
};

export const eliminarRegistroEncuesta = async (token, actividad) => {
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  const encuesta = await axios.delete(url + `/inquest/${actividad}`, headersA);
  return encuesta;
};

export const listarRegistrosEncuesta = async (token) => {
  console.log("ServiciosBackend 256: listarRegistrosEncuesta: Token", token)
  const headersA = {
    headers: { 
      "Content-Type": "application/json",
      "token": token
    },
  };
  const encuesta = await axios.get(url + '/inquest/list', headersA);
  console.log("ServiciosBackend Linea 265: Retorno Peticion: encuesta ", encuesta)
  return encuesta;
};

export const cerrarEncuesta = async (token) => {
  console.log("ServiciosBackend Linea 191: Peticion Cierre: Token", token)
  const headersA = {
    headers: {
      "Content-Type": "application/json",
      "token": token
    },
  };
  console.log("ENCABEZADOS: ",headersA)
  const encuesta = await axios.get(url + '/inquest/close', headersA);
  return encuesta;
};

//
// '''
// addCompaniesConsultor: Asocia una empresas a un consultor \n
// '''
// print("In addCompaniesConsultor")
// dato = request.json
// campos = ['empresa', 'id_usuario']
// valida = validator.validateFields(campos, dato)
// if valida['response'] == 'ERROR':
// return jsonify(valida)
// if usuario['perfil'] != 'consult':
// return jsonify({'response': 'ERROR', 'message': 'No tiene los privilegios de consultor, no puede realizar esta acción'})
// resp = consultor.asociateCompany(dato['nit'], dato['id_usuario'])
// print("End addCompaniesConsultor:", resp)
// return jsonify(resp)

// @app.route('/consultor/<company>/<user>', methods = ['DELETE'])
// @privated
// def deleteConsultor(usuario, company, user):
// '''
// deleteConsultor: Remueve un consultor de una empresas \n
// @params:
//   :company: Nit de la empreesa
//   :user: id_usuario del consultar a remover de la empresa
// '''
// print("In deleteConsultor")

// if usuario['perfil'] != 'consult':
// return {'response': 'ERROR', 'message': 'No tiene los privilegios de consultor, no puede realizar esta acción'}
// resp = consultor.removeConsultor(company, user)
// print("End deleteConsultor:", resp)
// return jsonify(resp)

// @app.route('/consultor', methods = ['GET'])
// @privated
// def getCompaniesConsultor(usuario):
// '''


// getCompaniesConsultor: Recupera todas las empresas asociadas al usuario en login \n
// '''
// print("In getCompaniesConsultor")
// resp = consultor.getCompaniesConsultor(usuario['id_usuario'])
// print("End getCompaniesConsultor:", resp)
// return jsonify(resp)
//

export const getCompaniesConsultor = async (token) => {
    console.log("ServiciosBackend 239: getCompaniesConsultor: Token", token)
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token }};
    console.log("ServiciosBackend Linea 247: Retorno Peticion: getCompaniesConsultor ", empresas)
    const empresas = await axios.get(url + '/consultor', headersA);
    console.log("ServiciosBackend Linea 247: Retorno Peticion: getCompaniesConsultor", empresas)
    return empresas;
  };

// route: /files/dictionary/<idCompany>, method: 'POST'
//     Recibe el archivo diccionario de una empresa para guardarlo en la DB
//     token: campo con el token de autenticación en el backend (Va en la cabecera de la Petición)
//     idCompany: Nit de la empresa
//     niveles: Define la cantidad de nivels que tiene el diccionario
//     files{'diccionario'}
//

    export const loadDictionary = async (token, nit, diccionario) => {
        let mensaje=""
        const formData = new FormData();
        const headersA = {
          headers: {
            "Content-Type": "application/json",
            "token": token
          },
        };        
        
        formData.append('diccionario', diccionario);
    
        const files = await axios.post(url + '/files/dictionary/'+nit, formData, headersA) 
        .then(response => {
            mensaje=response.data.data;

        }).catch(error => {
            mensaje=error;
        })        
        return mensaje }    

// route: /files/employes/<idCompany>, method: 'POST'
//     Recibe el archivo empleado de una empresa para procesarlos y guardarlos en la DB
//     token: campo con el token de autenticación en el backend (Va en la cabecera de la Petición)
//     idCompany: Nit de la empresa
//     files{'usuarios'}

export const loadEmployes = async (token, nit, usuarios) => {
    let mensaje = ""
    const formData = new FormData();
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
    };
    formData.append('usuarios', usuarios );
  
    const files = await axios.post(url + '/files/employes/'+nit, formData, headersA)         
    console.log("ServiciosBackend loadEmployes 388 Response :", files)
    return files }

// route: /files/frecuency/<idCompany>, method: 'POST'
//     Recibe el archivo frecuencias de una empresa para procesarlo y guardarlo en la DB
//     idCompany: Nit de la empresa
//     files{'frecuencias'}
  
    export const loadFrecuency = async (token, nit, frecuencias) => {
        let mensaje=""
        const formData = new FormData();
        const headersA = {
          headers: {
            "Content-Type": "application/json",
            "token": token
          },
        };

        formData.append('frecuencias', frecuencias);
      
        const files = await axios.post(url + '/files/frecuency/'+nit, formData, headersA) 
        .then(response => {
            mensaje=response.data.data;
        }).catch(error => {
            mensaje = error;
        }) 
        return mensaje }
  
  
  
  export const enviarArchivos = async (token, usuarios, diccionario, frecuencias) => {
    let mensaje = ""  
    const formData = new FormData();
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
    };
    formData.append('usuarios', usuarios.file, usuarios.name );
    formData.append('diccionario', diccionario.file, diccionario.name);
    formData.append('frecuencias', frecuencias.file, frecuencias.name);
  
    const files = await axios.post(url + '/inquest', formData, headersA) ;
    return files; }


    export const statusIndices = async (token, idEmpresa) => {
        let mensaje = ""
        const headersA = {
          headers: {
            "Content-Type": "application/json",
            "token": token
          },
        };
        const status = await axios.get(url + `/users/status/${idEmpresa}`, headersA)
        .then(response => {
            mensaje=response.data.data;
        }).catch(error => {
            mensaje = error;
        }) 
        return mensaje; }

        
    /**
 * {'empresa': nit}
 */
export const closeCompany = async (token, data) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const empresa = await axios.post(url + '/company/close', data, headersA);
    return empresa;
  };
  

  /**
   * {'usuario': id_usuario}
   */
   export const openInquest = async (token, data) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const encuesta = await axios.post(url + '/inquest/open', data, headersA);
    return encuesta;
  };
  
  /**
   * {'empresa': nit}
   */
   export const generateTable = async (token, data) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    console.log("serviciosBackend 495 generateTable ", token, data)      
    const encuesta = await axios.post(url + '/export/inquest', data, headersA); 
    return encuesta;
  };    


  export const listActivitiesByUser = async (token, usuario) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const actividades = await axios.get(url + `/inquest/list/${usuario}`, headersA);
    return actividades;
  };

  /** 
 * {'nit': nit, 
 *  'nombre': Nombre de la empresa, 
 *  'niveles': Nievles del diccionario (Numero entre 1-5) }
*/
export const createCompany = async (token, data) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    console.log("url", url+'/company')      
    const empresa = await axios.post(url + '/company', data, headersA);
    return empresa;
  };

  export const deleteCompany = async (token, nit) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const empresa = await axios.delete(url + `/company/${nit}`, headersA);
    return empresa; };

/** 
 * {'empresa': nit, 
 * 'id_usuario': id_usuario}
*/
export const addCompaniesConsultor = async (token, data) => {
    console.log("AddCompanies 544: Token",token)
    console.log("AddCompanies 544: data",data)
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const consultor = await axios.post(url + '/consultor', data, headersA);
    return consultor;
  };


//   company = nit
//   usuario = id_usuario
  export const deleteConsultor = async (token, company, usuario) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const consultor = await axios.delete(url + `/consultor/${company}/${usuario}`, headersA);
    return consultor;
  }; 

  export const getConsultors = async (token, idEmpresa) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const consultors = await axios.get(url + `/consultors/${idEmpresa}`, headersA);
    return consultors;
  };
   
/** 
 * {'usuario': id_usuario}
*/
export const rememberInquest = async (token, data) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const mail = await axios.post(url + '/remember', data, headersA);
    return mail;
  };


//   Retorna:
//   {'diccionario': ''pendiente, 'frecuencia': ''cargado, 'empleado': 'pendiente'}

  export const getInfoFull = async (token, idEmpresa) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    const info = await axios.get(url + `/full/info/${idEmpresa}`, headersA);
    return info;
  };

  /** 
 * {
        'id_usuario': cedula, 
        'nombre': Nombre completo, 
        'empresa': Empresa a la que pertenece el usuario, 
        'clave': contraseña
  }
*/
export const createUser = async (token, data) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const usuario = await axios.post(url + '/user', data, headersA);
    return usuario;
  };

  export const listDictionaryWithInquest = async (token) => {
    const headersA = {
              headers: {
                "Content-Type": "application/json",
                "token": token
              },
          };
    const diccionario = await axios.get(url + '/dictionary/inquest', headersA);
    return diccionario;
  };

  export const homologateActivities = async (token, idUser) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token},
    };

    const data = {"usuario": idUser}

    console.log("ServiciosBackend homologateActivities peticion: token",token, typeof"\nidUser", idUser)
    const empresa = await axios.post(url + `/homologation/${idUser}`, data, headersA);
    // const empresa = await axios.put(url + `/homologation/${idUser}`, headersA);
    return empresa;
  };

  export const deleteActivity = async (token, actividad) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
    };
    const encuesta = await axios.delete(url + `/delete/inquest/${actividad}`, headersA);
    return encuesta;
  };

  export const deleteUser = async (token, idUser) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    const info = await axios.delete(url + `/user/${idUser}`, headersA);
    return info;
  };

  export const deleteActividad = async (token, idActividad) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    const info = await axios.delete(url + `/dictionary/${idActividad}`, headersA);
    return info;
  };

  export const deletefrecuency = async (token, idFrecuencia) => {
    const headersA = {
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    const info = await axios.delete(url + `/frecuency/${idFrecuencia}`, headersA);
    return info;
  };

