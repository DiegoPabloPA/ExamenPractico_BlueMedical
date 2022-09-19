
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/privateRoutes';
import { Gestion } from './pages/Gestion';
import { Home } from './pages/Home';


import Login from './pages/Login';





function App() {


  return (
    <div>
      <Routes>

        <Route path='/gestion' element={<PrivateRoutes><Gestion/></PrivateRoutes>}/>
        <Route path='/home' element={<PrivateRoutes><Home/></PrivateRoutes>}/>
        <Route path='/login' element={<Login />} />
        
      </Routes>

    </div>
  );
}

export default App;
