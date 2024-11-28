
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { URL_MAIN } from './url';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [correcto, setCorrecto] = useState('');
  const navegate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setError("");
    if ( email.trim() === "" || password.trim() === "") {
      setError("Email y password no deben estar vacios")
      return;
    }
    try {
      console.log("desde handleSubmit");
      const peticion = await axios.post(URL_MAIN+"api/login", {
        email,
        password
      });

      console.log(peticion.data);
      setError(peticion.data.error);
      if (peticion.data.error === "") {
        setCorrecto("Inicio sesión correctamente")
        localStorage.setItem("token", peticion.data.token);
        // navegate("../home")
        window.location.href = "/gastos"

      }
    } catch (error) {
      setEmail("ocurrio un error en el servidor")
    }

  }
  return (
    <>

    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card sx={{ width: 450, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            
            Login
          </Typography>
          <form>
            <TextField

              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            <Typography  color='error' gutterBottom>
             {error}
            </Typography>
            <Typography  color='primary' gutterBottom>
              {correcto}
            </Typography>

            <Typography  gutterBottom>
              ¿No tienes cuenta? entonces <Link to={"/Registrar"} >Registrate</Link>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Box>


        
          </form>
        </CardContent>
      </Card>
    </Box>
        
    </>

    

  )
}

export default Login