import React,  { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/AddSharp';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/EditSharp';
import EliminarIcon from '@mui/icons-material/DeleteSharp';
import { URL_MAIN } from './url';


export const Users = () => {
    const navigate = useNavigate();
    const paginationModel = { page: 0, pageSize: 10 };
  
    const handleAdd = () => {
      localStorage.removeItem("id");
      navigate("/Usuario");
    }
    const [Usuarios, setUsuario] = useState([]);
  
    useEffect(() => {
        let token = localStorage.getItem("token");

  
      const traerDatos = async () => {
        try {
          const peticion = await axios.get(URL_MAIN+"api/getUsers", {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
            }, 
            
          })

          const newUsers = peticion.data.filter(e => e.rol != "superadmin");
          console.log(newUsers);
          setUsuario(newUsers);
  
  
        } catch (error) {
          console.log(error);
        }
  
      }  
  
  
      traerDatos();
    }, [])


    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'email', headerName: 'Correo electronico', width: 200 },
        { field: 'rol', headerName: 'Rol', width: 200 },
    
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
        navigate("/Usuario/"+e)
      }
    
      async function handleClickRemove(e) {
        try {
          let token = localStorage.getItem("token");

          const peticion = await axios.delete(URL_MAIN+"api/getUser/" + e, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
            }, 
          });
          console.log(peticion.data);
          const nuevasUsuarios = Usuarios.filter(element => element.id != e);
    
    
          setUsuario(nuevasUsuarios)
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div>
        <Button type='button' variant='contained' color='primary' 
        onClick={() => handleAdd()}>
        <AddIcon style={{
            margin: "0 5px "
        }}></AddIcon>
        Registrar nuevo Usuario 
        </Button>

        <DataGrid
        rows={Usuarios}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        
        sx={{ border: 0 }}/>
    </div>
  )
}
