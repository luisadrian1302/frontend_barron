import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { URL_MAIN } from './url';

function Gasto() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState(0);
    const [fecha_gasto, setfecha_gasto] = useState('');
    const [cat, setCat] = useState(0);
    const [categorias, setCategorias] = useState([]);


    const [gasto, setGasto] = useState({});
    const [error, setError] = useState('');
    const [correcto, setCorrecto] = useState('');
    const [isEdit, setisEdit] = useState(false);
    const location= useLocation();
    const navegate = useNavigate();
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setError("");
        if ( nombre.trim() === ""  || descripcion.trim() === "" || monto === 0  || fecha_gasto.trim() === "" || cat === 0 ) {
         setError("Todos los campos son obligatorios")
            return;
        }

        try {


            let token = localStorage.getItem("token");

            if (isEdit) {
              const peticion = await axios.put(URL_MAIN+"api/gastos/"+ gasto.id, {
                name: nombre,
                id_categoria : cat,
                fecha_gasto : fecha_gasto,
                monto : monto,
                descripcion : descripcion
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }
              });
              console.log(peticion.data);
              navegate("/gastos")
              localStorage.removeItem("id");
              
            }else{
              console.log("desde handleSubmit");
              const peticion = await axios.post(URL_MAIN+"api/gastos/create", {
                name: nombre,
                id_categoria : cat,
                fecha_gasto : fecha_gasto,
                monto : monto,
                descripcion : descripcion
              }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }, 

              });
        
              console.log(peticion.data);
            
              navegate("/Gastos")
        
            }

         
            
          } catch (error) {
            setError("ocurrio un error en el servidor")
          }

        
    }

    useEffect(() => {

      
     async  function verificarEdit(){

      try {

        // obtener categorias 
        const peticion = await axios.get(URL_MAIN+"api/categories");
        console.log(peticion.data);
        setCategorias(peticion.data);



        const obtenerParametros = window.location.href;
        const dividirUrl = obtenerParametros.split("/")
        const obtenerUltimoValor = dividirUrl[dividirUrl.length - 1];
        console.log(obtenerUltimoValor);
        let token = localStorage.getItem("token");

        if (obtenerUltimoValor != "gasto") {
          setisEdit(true);
          const peticion = await axios.get(URL_MAIN+"api/gastos/get/" + obtenerUltimoValor,{
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
              }, 
          });
          setGasto(peticion.data);
          console.log(peticion.data);
          setNombre(peticion.data.nombre)
          setMonto(peticion.data.monto)
          setfecha_gasto(peticion.data.fecha_gasto)
          setCat(peticion.data.id_categoria)
          setDescripcion(peticion.data.descripcion)
          
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

              label="Nombre del gasto"
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

            <TextField

            label="Descripcion del gasto"
            sx={{
            width: "100%"
            }}
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            />

            <TextField

                label="fecha del gasto"
                sx={{
                width: "100%"
                }}
                variant="outlined"
                type="date"
                fullWidth
                margin="normal"
                required
                value={fecha_gasto}
                onChange={(e) => setfecha_gasto(e.target.value)}
                />
            <TextField

                label="monto del gasto"
                sx={{
                width: "100%"
                }}
                variant="outlined"
                type="number"
                fullWidth
                margin="normal"
                required
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
            />

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Seleccione la Categoria</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(e) => setCat(e.target.value)}
            value={cat}
            >
                {categorias.map(e => (

                    <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
                )) }
        
            </Select>
        </FormControl>

            
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

export default Gasto