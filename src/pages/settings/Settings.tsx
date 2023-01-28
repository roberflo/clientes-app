import { Paper, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Settings = () => {
  return (
    <>
      <Stack spacing={0.7}>
        <Item>
          <Grid container spacing={{ xs: 0, mx: 0 }}>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <Typography align="left" variant="h5">
                Configuraciones Generales
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="right" alignItems="right"></Grid>
          </Grid>
        </Item>
      </Stack>
    </>
  );
};
