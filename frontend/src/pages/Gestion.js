import { useEffect, useState } from "react"
import { ConfirmCloseAlert } from "../components/Alerts"
import Modals from "../components/Modal"
import md5 from 'md5'
import {CSVLink} from 'react-csv'
import { formatDate, getActualDate } from "../functions/Date"
import { createRegister, DeleteRegister, getInformationNoData } from "../services/CRUD"
import { getBitacoraStructure, getSalidaStructure, getVehiculosStructure } from "../structures/Vehiculos"
import "../Style/general-style.css"
import { getPagoResidentes } from "../functions/Excel"


const Gestion = (props) => {
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [tipos, setTipos] = useState([])
    const [bitacora, setBitacora] = useState([])
    const [pagoResidente,setPagoResidente]=useState([])
    const [placa, setPlaca] = useState('')
    const [tipo, setTipo] = useState('0')


    function closeModal(modal) {
        switch (modal) {
            case "showModal1":
                clearValuesAlta()
                setShowModal1(false)
                break;
            case "showModal2":
                clearValuesAlta()
                setShowModal2(false)
                break;
            default:
                break;
        }
    }
    async function OpenModal(modal) {
        switch (modal) {
            case "showModal1":
                setShowModal1(true)
                if (tipos.length === 0) {
                    await getTipos()
                }
                break;
            case "showModal2":
                setShowModal2(true)
                break;
            default:
                break;
        }

    }

    async function getTipos() {
        const result = await getInformationNoData('/getTipos')
        if (result.status === 200) {
            setTipos(result.data)
        } else {
            setTipos([])
        }
    }
    async function getBitacora() {
        const result = await getInformationNoData('/get/Bitacora')
        if (result.status === 200) {
            setBitacora(result.data)
        } else {
            setBitacora([])
        }
    }


    const ChangeInputs = (e) => {
        switch (e.target.id) {
            case "nuevaMatriculaGestion":
            case "nuevoIngresoGestion":
                setPlaca(e.target.value)
                break;
            case "tipoVehiculoGestion":
                setTipo(e.target.value)
                break;
            default:
                break;
        }
    }

    async function RegistrarVehiculo() {
        const result = await createRegister('/nuevo/Vehiculo', getVehiculosStructure(placa, tipo))
        if (result.status === 200) {
            ConfirmCloseAlert('success', `El vehículo con la Placa: ${placa} \n se registro exitosamente`)
            closeModal("showModal1")
        }
    }

    async function RegistrarIngreso() {
        const result = await createRegister('/nuevo/Ingreso', getBitacoraStructure(placa))
        if (result.status === 200) {
            ConfirmCloseAlert('success', `Se ha registrado el ingreso \n del vehículo con la Placa: ${placa} exitosamente`)
            closeModal("showModal2")
            getBitacora()
        }
    }
    async function RegistrarSalida(placa, fechaInicio) {
        const result = await createRegister('/update/Ingreso', getSalidaStructure(placa, fechaInicio))
        if (result.status === 200) {
            ConfirmCloseAlert('success', result.data.message)
            getBitacora()
        }
    }
    function clearValuesAlta() {
        setTipo('0')
        setPlaca('')
    }
    async function comienzaMes() {
        const result = await DeleteRegister('/delete/Estancia')
        if (result.status === 200) {
            ConfirmCloseAlert('success', result.data.message)
        }
    }
    

    useEffect(() => {
        getBitacora()
        console.log(md5('admin'))
        
    }, [])

    return (
        <div>
            <div className="container">
                <p className='text-center display-1 pb-1' >Gestión de Parqueo</p>
                <div className="row pt-5">
                    <div className="col-6 text-center">
                        <div className="d-grid gap-2">
                            <button type="button" className="btn blueButton btn-lg btn-block" onClick={() => OpenModal("showModal1")}>Dar de Alta Vehículo </button>
                        </div>
                    </div>
                    <div className="col-6  text-center">
                        <div className="d-grid gap-2">
                            <button type="button" className="btn greenButton btn-lg btn-block" onClick={() => OpenModal("showModal2")}>Registrar Entrada de Vehículo</button>
                        </div>
                    </div>
                    <div className="col-6 pt-3  text-center">
                      
                            <CSVLink className="nondecoration" data={pagoResidente} filename={"Pago de Residentes "+getActualDate()}
                              asyncOnClick={true}
                              onClick={async () => {
                                const datas=await getPagoResidentes()
                                await setPagoResidente(datas)
                              }}
                            
                            >
                            <div className="d-grid gap-2">
                                <button  type="button" className="btn violetButton btn-lg btn-block" >Pago de Residentes</button>
                            </div>
                            </CSVLink>
                         

                    </div>

                    <div className="col-6 pt-3  text-center">
                        <div className="d-grid gap-2">
                            <button onClick={() => comienzaMes()} type="button" className="btn orangeButton btn-lg btn-block" >Comienza Mes</button>
                        </div>
                    </div>
                    <div className="col-12 pt-5">
                        <div className="input-group input-group-lg">
                            <input type="text" id="buscarMatriculaGestion" className="form-control" placeholder="Buscar Vehiculo por Matricula..." />
                        </div>
                    </div>
                    <div className="col-12 pt-4">
                        <table className="table table-dark table-striped table-hover align-middle">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Matricula</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Fecha y Hora de Ingreso</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bitacora.map((elemento, e) => (
                                    <tr key={e} className="text-center">
                                        <td>{elemento.placa}</td>
                                        <td>{elemento.nombre ? elemento.nombre : 'No residente'}</td>
                                        <td>{formatDate(elemento.fechaInicio)}</td>
                                        <td>
                                            <div className="d-grid gap-2">
                                                <button onClick={() => RegistrarSalida(elemento.placa, elemento.fechaInicio)} type="button" className="btn redButton btn-lg btn-block">Registrar Salida</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <Modals centered={true} size={'xl'} title={'Registro del Vehículo'} show={showModal1} close={() => closeModal("showModal1")}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 positionSpace">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text">Matricula</span>
                                <input onChange={ChangeInputs} type="text" id="nuevaMatriculaGestion" className="form-control" placeholder="Ingrese una matricula" />
                            </div>
                        </div>
                        <div className="col-12 positionSpace">
                            <div className="input-group input-group-lg">
                                <label className="input-group-text">Tipo</label>
                                <select onChange={ChangeInputs} className="form-select" id="tipoVehiculoGestion">
                                    <option value="0">Seleccione el Tipo de Vehículo</option>
                                    {tipos.map((tipo, t) => (
                                        <option key={t} value={tipo.id}>{tipo.nombre}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className="col-12 text-center positionSpace">
                            <div className="d-grid gap-2">
                                <button disabled={placa === '' || tipo === '0'} type="button" className="btn violetButton btn-lg btn-block" onClick={() => RegistrarVehiculo()}>Dar de Alta Vehículo </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modals>
            <Modals centered={true} size={'xl'} title={'Registro del Vehículo'} show={showModal2} close={() => closeModal("showModal2")}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 positionSpace">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text">Matricula</span>
                                <input type="text" onChange={ChangeInputs} id="nuevoIngresoGestion" className="form-control" placeholder="Ingrese una matricula" />
                            </div>
                        </div>
                        <div className="col-12 text-center positionSpace">
                            <div className="d-grid gap-2">
                                <button type="button" disabled={placa === ''} className="btn violetButton btn-lg btn-block" onClick={() => RegistrarIngreso()}>Registrar Ingreso</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modals>

        </div>
    )
}



export { Gestion}