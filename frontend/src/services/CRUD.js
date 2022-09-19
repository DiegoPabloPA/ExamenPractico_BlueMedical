import axios from 'axios'
import { ConfirmCloseAlert } from '../components/Alerts'
import { getValueCookie } from '../functions/cookieService'

const config={
    headers:{Authorization:`${getValueCookie('type')} ${getValueCookie('token')}`}
}

export const getInformationNoData=async (route)=>{
    const URL=process.env.REACT_APP_API_URL+route
    var responseBack={
        data:[],
        status:404     
    }
    if(getValueCookie('token')){
        await axios.get(URL,config).then(
            response=>{
               responseBack=response
            }
        ).catch(error=>{
           
            
        })
    }else{
        window.location.href='/login'
    }
   

    return responseBack
}

export const createRegister=async (route,data)=>{
    const URL=process.env.REACT_APP_API_URL+route
    var responseBack={
        data:[],
        status:404     
    }
    if(getValueCookie('token')){
    await axios.post(URL,data,config).then(
        response=>{
           responseBack=response
        }
    ).catch(error=>{
        responseBack.status=error.response.status
        ConfirmCloseAlert('error',`ERROR: ${error.response.status} \n Atención: ${error.response.data.message}`)
    })
}else{
    window.location.href='/login'
}

    return responseBack
}

export const DeleteRegister=async (route)=>{
    const URL=process.env.REACT_APP_API_URL+route
    var responseBack={
        data:[],
        status:404     
    }
    if(getValueCookie('token')){
    await axios.delete(URL,config).then(
        response=>{
           responseBack=response
        }
    ).catch(error=>{
        responseBack.status=error.response.status
        ConfirmCloseAlert('error',`ERROR: ${error.response.status} \n Atención: ${error.response.data.message}`)
    })
}else{
    window.location.href='/login'
}

    return responseBack
}

export const LoginAuthent=async (route,data)=>{
    const URL=process.env.REACT_APP_API_URL+route
    var responseBack={
        data:[],
        status:404     
    }
    
    await axios.post(URL,data).then(
        response=>{
           responseBack=response
        }
    ).catch(error=>{
        responseBack.status=error.response.status
        ConfirmCloseAlert('error',`ERROR: ${error.response.status} \n Atención: ${error.response.data.message}`)
    })


    return responseBack
}