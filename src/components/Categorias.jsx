import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/AddSharp';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/EditSharp';
import EliminarIcon from '@mui/icons-material/DeleteSharp';
import { URL_MAIN } from './url';
export const Categorias = () => {
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 10 };

  const handleAdd = () => {
    localStorage.removeItem("id");
    navigate("/categoria");
  }
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {

    const traerDatos = async () => {
      try {
        let token = localStorage.getItem("token");

        const peticion = await axios.get(URL_MAIN+"api/categories",{
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
        });
        console.log(peticion.data);
        setCategoria(peticion.data);


      } catch (error) {
        console.log(error);
      }

    }



    traerDatos();

    return () => {
      console.log("goodbye");
      
    }
  }, [])


    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'nombre', headerName: 'Nombre', width: 250 },
    
        {
          field: 'acciones', headerName: 'Acciones', width: 400,
          renderCell: (params) => (
            <>
              <Button variant="contained" style={{margin: "10px"}} 
              color="warning" onClick={() => handleClick(params.id)}>
                <EditIcon></EditIcon>
                Editar
    
              </Button>
    
    
              <Button variant="contained" color="error"
              style={{margin: "10px"}}  onClick={() => handleClickRemove(params.id)}>
                <EliminarIcon></EliminarIcon>
                Eliminar
              </Button>
            </>
          )
        },
    
      ];

      const handleClick = (e) => {

        localStorage.setItem("id", e)
        navigate("/categoria/"+e)
      }
    
      async function handleClickRemove(e) {
        let token = localStorage.getItem("token");

        try {
          const peticion = await axios.delete(URL_MAIN+"api/categories/" + e, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
            }, 
          });
          console.log(peticion.data);
          const nuevasCategorias = categorias.filter(element => element.id != e);
    
          console.log(nuevasCategorias);
    
          setCategoria(nuevasCategorias)
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <>

        <Button type='button' variant='contained' color='primary' 
        onClick={() => handleAdd()}>
        <AddIcon style={{
            margin: "0 5px "
        }}></AddIcon>
        Crear nueva categoria 
        </Button>

        <DataGrid
        rows={categorias}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        
        sx={{ border: 0 }}
        />
    </>
  )
}
