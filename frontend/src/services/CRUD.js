import axios from 'axios'

export const getInformationNoData=async (route)=>{
    const URL=process.env.REACT_APP_API_URL+route
    var responseBack={
        data:[],
        status:404     
    }
    await axios.get(URL).then(
        response=>{
           responseBack=response
        }
    ).catch(error=>{
       
        
    })

    return responseBack
}