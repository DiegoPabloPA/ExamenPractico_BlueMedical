import { getInformationNoData } from "../services/CRUD"

export async function getPagoResidentes(){
    const result = await getInformationNoData('/get/Residentes/Pago')

    if (result.status === 200) {
    return result.data
    }else{
        return []
    }
   
}