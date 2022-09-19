
import { Route, Routes } from 'react-router-dom'
import Login from './Login';

function PublicRouter() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>

    </div>
  );
}

export default PublicRouter;
