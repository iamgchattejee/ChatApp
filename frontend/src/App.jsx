import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { Homepage } from './pages/Homepage/Homepage';
import { Login } from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const [authUser] = useAuthContext();
  return (
    <div className='className=p-4 h-screen flex items-center justify-center'>
    
    <Routes>
      <Route path="/" element={authUser ? <Navigate to="/login"/> : <Homepage/>} />
      <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>} />
      <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Signup/>} />
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App;
