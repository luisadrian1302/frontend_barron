import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { URL_MAIN } from './url';

function Categoria() {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState({});
    const [error, setError] = useState('');
    const [correcto, setCorrecto] = useState('');
    const [isEdit, setisEdit] = useState(false);
    const location= useLocation();
    const navegate = useNavigate();
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setError("");
        if ( nombre.trim() === "" ) {
         setError("El campo de nombre no debe estar vacio")
            return;
        }

        let token = localStorage.getItem("token");

        try {

            if (isEdit) {
              const peticion = await axios.put(URL_MAIN+"api/categories/"+categoria.id, {
                name: nombre
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  "Content-Type": "application/json"
                }, 
              });
              console.log(peticion.data);
              navegate("/categorias")
              localStorage.removeItem("id");
              
            }else{
              console.log("desde handleSubmit");
              const peticion = await axios.post(URL_MAIN+"api/categories", {
                name: nombre
              }, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  "Content-Type": "application/json"
                }, 
              });
        
              console.log(peticion.data);
            
              navegate("/categorias")
        
            }

         
            
          } catch (error) {
            setError("ocurrio un error en el servidor")
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


        if (obtenerUltimoValor != "categoria") {
          setisEdit(true);
          const peticion = await axios.get(URL_MAIN+"api/categories/" + obtenerUltimoValor,{
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
            }, 
          });
          setCategoria(peticion.data);
          console.log(peticion.data);
          setNombre(peticion.data.nombre)
          
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
       margin: "auto",
       maxWidth: "800px"
      }}
    >

    <form>
            <TextField

              label="Nombre de categoria"
              sx={{
                width: "100%"
              }}
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            
            <Typography  color='error' gutterBottom>
             {error}
            </Typography>
            <Typography  color='primary' gutterBottom>
              {correcto}
            </Typography>
            <Box sx={{  marginTop: 2 }}>
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                {isEdit ? 'Editar Categoria' : 'Crear categoria'  } 
              </Button>
            </Box>
          </form>
    </Box>
    
    
    </>
  )
}

export default Categoria