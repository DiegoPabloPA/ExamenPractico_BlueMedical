import { getActualDate, TotalMinutes } from "../functions/Date";

export function getVehiculosStructure(Placa,Tipo){
    return{
        placa:Placa.toUpperCase(),
        creadoPor:'Diego',
        fechaCreacion:getActualDate(),
        Tipo_Id:Number(Tipo)

    }
}

export function getBitacoraStructure(Placa){
    return{
        placa:Placa,
        concepto:'Parqueo',
        fechaInicio:getActualDate(),
        creadoPor:'Diego'
    }
}

export function getSalidaStructure(Placa,fechaInicio){
    const fechaFin=getActualDate()
    return {
        placa:Placa,
        minutos:TotalMinutes(fechaInicio,fechaFin),
        fechaFin:fechaFin
    }
}