import React, { useEffect, useState } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {  Container, Grid, Card, CardContent, CardMedia } from '@mui/material';


import ShieldIcon from '@mui/icons-material/Shield';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import axios from 'axios';
import { URL_MAIN } from './url';

const imgs = [img1, img2]


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);




function Home({ element }) {



  const navigate = useNavigate();
  const [sidebar, updateSidevar] = useState([ 'Categorias', 'Gastos']);

  useEffect(() => {

    let iteracion = 0;
    async function verificarRol(){

      

      console.log(iteracion);
      
      if (iteracion) {
        return;
      }

      try {
        
        let token = localStorage.getItem("token");
        iteracion = iteracion + 1;

        const result = await axios.get(URL_MAIN+"api/verifyAdmin", {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }, 
          
        })
        const data = await  result.data; 
        console.log(data);
        updateSidevar((data) => [...data,'Users', 'Logout'])

          
      } catch (error) {
        
        updateSidevar((data) => [...data, 'Logout'])

      }



    

      
    }

    verificarRol()
  }, [])
  
  

  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };




  
  const cargarIconos = (txt) => {

    if(txt === "home"){
      return <HomeIcon/>
    }

    if(txt === "Privacidad"){
      return <ShieldIcon/>
    }

    if(txt === "Logout"){
      return <LogoutIcon/>
    }

    if(txt === "Categorias"){
      return <CategoryIcon/>
    }
    if(txt === "Gastos"){
      return <MonetizationOnIcon/>
    }
    

    if(txt === "Users"){
      return <PeopleIcon/>
    }

    
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Control de gastos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebar.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={(e) => navigate("/" + text)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {cargarIconos(text)}
                
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {element ? element : <Paper sx={{ height: 400, width: '100%' }}>
          <>
 
          <Box sx={{ backgroundColor: '#f5f5f5', py: 6, textAlign: 'center' }}>
            <Container maxWidth="md">
              <Typography variant="h3" component="h1" gutterBottom>
                Bienvenido a Controla tus Gastos
              </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                La mejor herramienta para gestionar tus finanzas personales. Lleva un registro claro y detallado de tus ingresos y gastos, establece presupuestos, y toma el control de tu futuro financiero.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Empieza Ahora
              </Button>
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Funcionalidades Principales
        </Typography>
        <Grid container spacing={4}>
          {[1, 2].map((feature) => (
            <Grid item xs={12} sm={6} md={6} key={feature}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={imgs[feature - 1]} // Imagen de ejemplo
                  alt="Funcionalidad"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {feature === 1 ? "Registro de Gastos" : feature === 2 ? "Establecimiento de Presupuestos" : "Análisis Financiero"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature === 1
                      ? "Registra todos tus gastos de manera detallada y categorizada para un mejor control."
                      : "Establece límites de gasto para diferentes categorías y mantente dentro de tu presupuesto."
                      }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            ¿Por qué elegir Controla tus Gastos?
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Nuestra aplicación está diseñada para ayudarte a tomar el control de tus finanzas. Con un enfoque en simplicidad y funcionalidad, ofrecemos todas las herramientas necesarias para que puedas registrar, analizar y optimizar tus gastos de manera efectiva.
          </Typography>
        </Container>
      </Box>
      
          
          </>
          
        </Paper>}

      </Box>
    </Box>
  )
}

export default Home