import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login  from './components/Login';
import Home  from './components/Home';
import Categoria from './components/Categoria';
import {  Privacidad } from './components/Privacidad';
import { Logout } from './components/Logout';
import { useState } from 'react';
import { Categorias } from './components/Categorias';
import { Users } from './components/Users';
import { Registrar } from './components/Registrar';

function App() {

  
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

  return (
    <>
    <BrowserRouter>
            <Routes >
            
              
                  {/* Ruta del Login */}
                  <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
                  <Route path="/Registrar" element={isAuthenticated ? <Navigate to="/home" /> : <Registrar />} />

                  {/* Ruta del Home (protegida) */}
                  <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

                  {/* Ruta del Home (protegida) */}
                  <Route path="/categoria" element={isAuthenticated ? <Home element={<Categoria/>}/> : <Navigate to="/login" />} />
                  <Route path="/categorias" element={isAuthenticated ? <Home element={<Categorias/>}/> : <Navigate to="/login" />} />
                  <Route path="/Users" element={isAuthenticated ? <Home element={<Users/>}/> : <Navigate to="/login" />} />
                  <Route path="/Privacidad" element={isAuthenticated ? <Home element={<Privacidad/>}/> : <Navigate to="/login" />} />
                  <Route path="/Logout" element={isAuthenticated ? <Logout/> : <Navigate to="/Logout" />} />
                  <Route path="/categoria/*" element={isAuthenticated ? <Home element={<Categoria/>}/> : <Navigate to="/login" />} />
                  <Route path="//*" element={isAuthenticated ? <Home element={<Categoria/>}/> : <Navigate to="/login" />} />

                  {/* Ruta por defecto, redirige al login si no está autenticado */}
                  <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />

                  {/* ruta componente */}
            </Routes>
        </BrowserRouter>
    
    </>
  );
}

export default App;
