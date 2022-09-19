
import { Link } from 'react-router-dom'
import { removeCookie } from '../functions/cookieService';

function removeCookies(){
    removeCookie('token')
    removeCookie('type')
    removeCookie('user')
}

function PrivateRouter() {



    return (
        <div className='App'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">Parqueos S.A.</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/gestion">Gestion de Parqueo</Link>
                            </li>
                            <li className='nav-item' onClick={()=>removeCookies()}>
                                <Link className="nav-link active" aria-current="page" to="/login">Cerrar Sesión</Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
           
        </div>
    );
}

export default PrivateRouter;
