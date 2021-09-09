/**
  ServiciosBackend

  Gestiona la comunicación a los servicios backend para obtener la información

  @copyright: Vitt Inversiones SAS - vitt.co
  @license: Velasquez Naranjo y Cia SAS - Venaycia.com
  @author: Wiliam Arévalo Camacho
**/
import axios from 'axios';

export async function setToken(token){
    axios.defaults.headers.common["token"] = token;
    try {
        await localStorage.setItem('token' , token);
        return true
    } catch (error) {
        return null
    }
}

export async function getToken(){
    try {
        let res = await localStorage.getItem('token');
        if (res != null) 
        {
            axios.defaults.headers.common["token"] = res;
        }
        return res
    } catch (error) {
        return null
    }
}

export const removeToken = () => {
    delete axios.defaults.headers.common["token"];
    localStorage.clear()
    return true
}

export async function setDatosUsuario(data){
    try{
        await localStorage.setItem('usuario' , JSON.stringify(data));
        return true
    }catch (error) {
        return null
    }
}

export async function getDatosUsuario(){
    try{
        let res  = await localStorage.getItem('usuario');
        return JSON.parse(res);
    }catch (e) {
        return null
    }
}

export async function editDatosUsuario(_id, cedula, nombre){
    try{
        let res  = await localStorage.getItem('usuario');
        res = JSON.parse(res);
        res.id_usuario = cedula;
        res._id = _id;
        res.nombre = nombre;
        return JSON.parse(res);
    }catch (e) {
        return null
    }
}