import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import {   Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import axios from 'axios';

const imgs = [img1, img2]


const pages = ['Home', 'Privacidad', 'login'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ element }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  

  return (
    <>
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={(e) => navigate("/" + page)}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

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
    </>

  );
}
export default ResponsiveAppBar;
