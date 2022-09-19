import { setNewCookie } from "../functions/cookieService"
import { LoginAuthent } from "../services/CRUD"
import "../Style/general-style.css"

async function loginAuth(){
    const data={
        user:document.getElementById('username').value,
        password:document.getElementById('password').value
    }
    const result=await LoginAuthent('/login',data)
    if(result.status===200){
        setNewCookie('token',result.data.access_token,60)
        setNewCookie('type',result.data.token_type,60)
        setNewCookie('user',result.data.user,60)
        window.location.href='/home'
    }
}

const Login = (props) => {

    return (
        <div className="container">
            <div className="row positionLogin">
                <div className="col-3"></div>
                <div className="col-6 positionSpace">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text">Usuario</span>
                        <input type="text" id="username" className="form-control" placeholder="Ingrese nombre de usuario" />
                    </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6 positionSpace">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text">Password</span>
                        <input type="password" id="password" className="form-control" placeholder="Ingrese nombre de usuario" />
                    </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6 positionSpace">
                    <div className="d-grid gap-2">
                        <button onClick={()=>loginAuth()} type="button" className="btn orangeButton btn-lg btn-block" >Iniciar Sesión</button>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

export default Login