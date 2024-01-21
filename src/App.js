import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import LoginPage from "./Pages/loginPage"
import SignUpPage from "./Pages/signUpPage"
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './Components/layout/Layout';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import Home from "./Pages/HomePage";
import CanvaPage from './Pages/CanvaPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* public routes */}
          <Route path='/createUser' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Home />} />
            <Route path='/canva/:name/:docId' element={<CanvaPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App;
