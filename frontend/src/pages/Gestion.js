import { useState } from "react"
import Modals from "../components/Modal"
import { getInformationNoData } from "../services/CRUD"
import "../Style/general-style.css"


const Gestion = (props) => {
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [tipos, setTipos] = useState([])

    function closeModal(modal) {
        switch (modal) {
            case "showModal1":
                setShowModal1(false)
                break;
            case "showModal2":
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
            //Todo Error va aqui
            return []
        }
    }

    async function RegistrarVehiculo() {
        closeModal()
    }

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
                                <tr className="text-center">
                                    <td>P820DMB</td>
                                    <td>Vehiculo Oficial</td>
                                    <td>17/09/2021 12:34:44 AM</td>
                                    <td>
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn redButton btn-lg btn-block">Registrar Salida</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <td>P820DMB</td>
                                    <td>Vehiculo Oficial</td>
                                    <td>17/09/2021 12:34:44 AM</td>
                                    <td>
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn redButton btn-lg btn-block">Registrar Salida</button>
                                        </div>
                                    </td>
                                </tr>
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
                                <input type="text" id="nuevaMatriculaGestion" className="form-control" placeholder="Ingrese una matricula" />
                            </div>
                        </div>
                        <div className="col-12 positionSpace">
                            <div className="input-group input-group-lg">
                                <label className="input-group-text">Tipo</label>
                                <select className="form-select" id="tipoVehiculoGestion">
                                    <option value="0">Seleccione el Tipo de Vehículo</option>
                                    {tipos.map((tipo, t) => (
                                        <option key={t} value={tipo.id}>{tipo.nombre}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className="col-12 text-center positionSpace">
                            <div className="d-grid gap-2">
                                <button type="button" className="btn violetButton btn-lg btn-block" onClick={() => RegistrarVehiculo()}>Dar de Alta Vehículo </button>
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
                                <input type="text" id="nuevoIngresoGestion" className="form-control" placeholder="Ingrese una matricula" />
                            </div>
                        </div>
                        <div className="col-12 text-center positionSpace">
                            <div className="d-grid gap-2">
                                <button type="button" className="btn violetButton btn-lg btn-block" onClick={() => RegistrarVehiculo()}>Registrar Ingreso</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modals>

        </div>
    )
}


export default Gestion