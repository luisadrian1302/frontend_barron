
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const UsuarioPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [correcto, setCorrecto] = useState('');
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setError("");
        if ( email.trim() === "" || password.trim() === "" || password.trim() === "") {
          setError("Nombre, Email y password no deben estar vacios")
          return;
        }
        try {
          console.log("desde handleSubmit");
          const peticion = await axios.post("http://127.0.0.1:8000/api/register", {
            email,
            password,
            name
          });
    
          console.log(peticion.data);
          
        localStorage.setItem("token", peticion.data.access_token);
        // navegate("../home")
        window.location.href = "/Categorias"
    
          
        } catch (error) {
            console.log(error.response.data);
            const data = error.response.data;
            let message = "";
            Object.values(data).forEach((d) => {
                message = message + d[0] + "\n";
            });
            
            
            
            setError(message)
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
            
            Registrar a un usuario
          </Typography>
          <form>
            <TextField

                label="Nombre"
                variant="outlined"
                type="text"
                fullWidth
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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

            
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Registrar cuenta
              </Button>
            </Box>


        
          </form>
        </CardContent>
      </Card>
    </Box>
    
    
    </>
  )
}
