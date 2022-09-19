
import { Navigate } from 'react-router-dom'
import { getValueCookie } from '../functions/cookieService'
import PrivateRouter from '../pages/PrivateRouter'


const PrivateRoutes = (props) => {


    return (getValueCookie('token')!==null&&getValueCookie('token')!==undefined ? <div>
        <PrivateRouter/>
        {props.children}
    </div> : <Navigate to='/login' />)




}

export default PrivateRoutes