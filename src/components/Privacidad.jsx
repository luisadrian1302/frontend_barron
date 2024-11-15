import React from 'react'
import { Container, Typography, Box } from '@mui/material';
export const Privacidad = () => {
  return (
    <>
    
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Aviso de Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          Estamos comprometidos con la protección de la privacidad de nuestros usuarios. Esta política de privacidad describe cómo recopilamos, usamos, y compartimos su información.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Información que recopilamos
        </Typography>
        <Typography variant="body1" paragraph>
          Podemos recopilar información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico y otra información que elija proporcionar.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Uso de la información
        </Typography>
        <Typography variant="body1" paragraph>
          Utilizamos su información personal para proporcionarle los servicios solicitados, mejorar nuestra plataforma y comunicarnos con usted sobre actualizaciones.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Compartición de información
        </Typography>
        <Typography variant="body1" paragraph>
          No compartimos su información personal con terceros sin su consentimiento, excepto en los casos necesarios para cumplir con las leyes o proteger nuestros derechos.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Seguridad
        </Typography>
        <Typography variant="body1" paragraph>
          Nos comprometemos a proteger su información y utilizamos medidas de seguridad para evitar el acceso no autorizado.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Cambios en nuestra política de privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          Nos reservamos el derecho a actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cualquier cambio significativo.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tiene alguna pregunta sobre esta política de privacidad, puede contactarnos en [correo electrónico de la empresa].
        </Typography>
      </Box>
    </Container>
    
    </>
  )
}
