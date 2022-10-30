import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import Notification from './Pages/Notification/Notification';

function App() {
  return (
    <div >
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
        <Route path='profile' element={
          <RequireAuth>
            <Profile></Profile>
          </RequireAuth>
        }></Route>
        <Route path='notification' element={
          <RequireAuth>
            <Notification></Notification>
          </RequireAuth>
        }></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
