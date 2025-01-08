import React, { useEffect, useState } from 'react';
import './App.css';
// import Landing from './components/Landing.tsx'
import NavBar from './components/Navbar.tsx'
// import { Route } from 'react-router';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Login from "./components/Login.tsx"
import Registration from "./components/Registration.tsx"
import Dashboard from "./components/Dashboard.tsx"
import SearchSongs from "./components/SearchSongs.tsx"
import PlayList from "./components/PlayList.tsx"
import Landing from './components/Landing.tsx';
import { userProfile } from './services/ApiServices.ts';
import { toast } from 'react-toastify';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try{
      const result: any = await userProfile();
      if (!result.error) {
        setUser(result.data.data);
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate('/')
        }
      } else {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login')
        }
      }
    }catch(e){
      console.log(e);
      toast.error("Authentication failed");
      navigate('/login')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser()
    } else navigate('/login')
  }, [])

  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/signup' && <NavBar user={user} />}
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/searchsongs" element={<SearchSongs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/playlist/:id" element={<PlayList />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
