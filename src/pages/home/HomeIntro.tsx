import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HomeIntro() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid xs={2} sm={4} md={4}>
          <Card sx={{ maxWidth: 300 }}>
            <NavLink
              to="/customers"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : {
                      color: "#2196f3",
                      background: "#304ffe",
                      textDecoration: "none",
                    }
              }
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="360"
                  image="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Clientes"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Clientes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conoce a tus clientes empieza a colaborar con ellos en su negocio
                  </Typography>
                </CardContent>
              </CardActionArea>
            </NavLink>
          </Card>
        </Grid>
        <Grid xs={2} sm={4} md={4}>
          <Card sx={{ maxWidth: 300 }}>
            <NavLink
              to="/invoices"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : {
                      color: "#2196f3",
                      background: "#304ffe",
                      textDecoration: "none",
                    }
              }
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="360"
                  image="https://images.pexels.com/photos/7464377/pexels-photo-7464377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Invoices"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Documentos Tributarios
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora de hacer negocios, crea tus facturas o creditos fiscales.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </NavLink>
          </Card>
        </Grid>
        <Grid xs={2} sm={4} md={4}>
          <Card sx={{ maxWidth: 300 }}>
            <NavLink
              to="/settings"
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                    }
                  : {
                      color: "#2196f3",
                      background: "#304ffe",
                      textDecoration: "none",
                    }
              }
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="360"
                  image="https://images.pexels.com/photos/6794967/pexels-photo-6794967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Configuracion"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Configuraciones
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cambia la informacion de tu negocio que aparecera en las facturas
                  </Typography>
                </CardContent>
              </CardActionArea>
            </NavLink>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
