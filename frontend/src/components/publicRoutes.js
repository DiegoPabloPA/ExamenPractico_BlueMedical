
import { Navigate } from 'react-router-dom'
 const PublicRoutes=({children,Logged})=>{
    return Logged ? <Navigate to={'/log/home'}/>:<Navigate to={'/application/login'}/>
}

export default PublicRoutes