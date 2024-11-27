
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { URL_MAIN } from './url';
import { useLocation, useNavigate } from 'react-router-dom';


export const UsuarioPage = () => {
    const [name, setName] = useState('');
    const [isEdit, setisEdit] = useState(false);
    
    const [title, setTitle] = useState('Registrar a un nuevo usuario');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState('');
    const [correcto, setCorrecto] = useState('');
    const [usuario, setUsuario] = useState({});
    const location= useLocation();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setError("");
        let token = localStorage.getItem("token");


        if (isEdit) {
          if ( email.trim() === "" || name.trim() === "" || rol.trim() === "") {
            setError("Nombre, Email y rol no deben estar vacios")
          }
        }else{

          if ( email.trim() === "" || password.trim() === "" || name.trim() === "" || rol.trim() === "") {
            setError("Nombre, Email, password y rol no deben estar vacios")
            return;
          }
        }
        try {
          console.log("desde handleSubmit");
          if (isEdit) {
            const peticion = await axios.put( URL_MAIN+"api/getUser/"+usuario.id, {
              email,
              password,
              name,
              rol
            }, {
              headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
              },
            });

            console.log(peticion.data);
          }else{

            const peticion = await axios.post(URL_MAIN+"api/register", {
              email,
              password,
              name,
              rol
            });
            console.log(peticion.data);

          }
          
    
          
        // localStorage.setItem("token", peticion.data.access_token);
        // navegate("../home")
        window.location.href = "/Users"
    
          
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


      useEffect(() => {

      
        async  function verificarEdit(){
   
         try {
           const obtenerParametros = window.location.href;
           const dividirUrl = obtenerParametros.split("/")
           const obtenerUltimoValor = dividirUrl[dividirUrl.length - 1];
           console.log(obtenerUltimoValor);
           let token = localStorage.getItem("token");
   
   
           if (obtenerUltimoValor != "Usuario") {
             setisEdit(true);
             const peticion = await axios.get(URL_MAIN+"api/getUser/" + obtenerUltimoValor,{
               headers: {
                 'Authorization': `Bearer ${token}`,
                 "Content-Type": "application/json"
               }, 
             });
             setName(peticion.data.name);
             setEmail(peticion.data.email);
             setRol(peticion.data.rol);
             setUsuario(peticion.data)
             setTitle('Actualizar usuario');
            //  setNombre(peticion.data.nombre)
             
           }else{
            setTitle('Registrar a un nuevo usuario');

           }
         } catch (error) {
           console.log(error);      
         }
               
   
         }
   
         verificarEdit();
         
       }, [location.pathname])
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
            
            {title}
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

          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seleccione el rol de usuario</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) => setRol(e.target.value)}
              value={rol}
              >
                  

                  <MenuItem value="user">Usuario</MenuItem>
                  <MenuItem value="admin">administrador</MenuItem>
                
          
              </Select>
          </FormControl>

          
            <Typography  color='error' gutterBottom>
             {error}
            </Typography>
            <Typography  color='primary' gutterBottom>
              {correcto}
            </Typography>

            
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              {
                isEdit ? 
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Actualizar cuenta
              </Button>
                :
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Registrar cuenta
              </Button>
              }
            
            </Box>


        
          </form>
        </CardContent>
      </Card>
    </Box>
    
    
    </>
  )
}
