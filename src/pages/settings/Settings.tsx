import { Alert, Paper, Snackbar, TextField, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const correlativeEmpty = {
  id: "",
  CodeMH: "",
  Description: "",
  CodigoInterno: "",
};
export const Settings = () => {
  const [consumidorFinal, setConsumidorFinal] = useState(correlativeEmpty);
  const [creditoFiscal, setCreditoFiscal] = useState(correlativeEmpty);
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const getCorrelatives = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/correlative`)
      .then((response) => {
        console.log(response.data);
        let consumidorFinal = response.data.find((data: { id: string }) => data.id === "1");
        let creditoFiscal = response.data.find((data: { id: string }) => data.id === "2");
        console.log(consumidorFinal);
        console.log(creditoFiscal);

        setConsumidorFinal(consumidorFinal);
        setCreditoFiscal(creditoFiscal);
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  const updateConsumidorFinal = async () => {
    await axios.put(`${import.meta.env.VITE_APP_BASEURL}/correlative/1`, consumidorFinal).then((data) => {
      console.log(data);
    });
  };
  const updateCreditoFiscal = async () => {
    await axios.put(`${import.meta.env.VITE_APP_BASEURL}/correlative/2`, creditoFiscal).then((data) => {
      console.log(data);
    });
  };

  const handleCreditoFiscalChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setCreditoFiscal((creditoFiscal) => ({
      ...creditoFiscal,
      CodigoInterno: value,
    }));
  };

  const handleConsumidorFinalChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setConsumidorFinal((consumidorFinal) => ({
      ...consumidorFinal,
      CodigoInterno: value,
    }));
  };

  const handleUpdateCorrelativos = () => {
    setOpenSuccess(true);
    updateConsumidorFinal();
    updateCreditoFiscal();
  };

  useEffect(() => {
    // This code will only run once, when the component is mounted
    console.log("Component mounted");
    getCorrelatives();
    // If you want to do some cleanup when the component is unmounted, you can return a function
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <>
      <Stack spacing={0.7}>
        <Item>
          <Grid container spacing={{ xs: 0, mx: 0 }}>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <Typography align="center" variant="h5">
                Configuraciones Generales
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="right" alignItems="right"></Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container spacing={{ xs: 0, mx: 0 }}>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <Typography align="left" variant="body1">
                Correlativo Credito Fiscal
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <TextField
                required
                id="creditoFiscal"
                name="creditoFiscal"
                size="small"
                type="number"
                fullWidth
                InputProps={{
                  inputProps: { min: 0 },
                }}
                margin="dense"
                error={false}
                value={creditoFiscal.CodigoInterno}
                onChange={handleCreditoFiscalChange}
              />
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <Typography align="left" variant="body1">
                Correlativo Consumidor Final
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <TextField
                required
                id="consumidorFinal"
                name="consumidorFinal"
                size="small"
                type="number"
                fullWidth
                InputProps={{
                  inputProps: { min: 0 },
                }}
                margin="dense"
                error={false}
                value={consumidorFinal.CodigoInterno}
                onChange={handleConsumidorFinalChange}
              />
            </Grid>
            <Grid mt={2} xs={12} sm={12} md={12} display="flex" justifyContent="flex-end" alignItems="center">
              <Button variant="contained" size="large" onClick={handleUpdateCorrelativos}>
                Actualizar Correlativos
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Stack>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Correlativos Actualizados con exito
        </Alert>
      </Snackbar>
    </>
  );
};
