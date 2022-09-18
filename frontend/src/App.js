import { Route, Routes, Link } from 'react-router-dom'
import Gestion from './pages/Gestion';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Parqueos S.A.</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/parqueo">Gestion de Parqueo</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link active" aria-current="page" to="/">Cerrar Sesión</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>




      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/parqueo' element={<Gestion />} />
      </Routes>
    </div>
  );
}

export default App;
