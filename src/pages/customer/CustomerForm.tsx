import Box from "@mui/material/Box";
import { useState } from "react";
import { Alert, Button, Drawer, Grid, Snackbar, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";

export const CustomerForm = (props: any) => {
  const [CustomerFormName, setCustomerFormName] = useState("Nuevo Cliente");
  const [CustomerName, setCustomerName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [Address, setAddress] = useState("");
  const [TaxId, setTaxId] = useState("");
  const [NIT, setNIT] = useState("");
  const [DUI, setDUI] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const clearForm = () => {
    setCustomerName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setAddress("");
    setTaxId("");
    setNIT("");
    setDUI("");
  };

  const AddCustomer = async (customer: any) => {
    await axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/customers`, customer)
      .then((data) => {
        setOpenSuccess(true);
        clearForm();
        props.closeDrawer();
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  const handleAddNewClient = () => {
    let newCustomer = {
      CustomerName: CustomerName,
      Email: Email,
      Phone: Phone,
      Company: Company,
      Address: Address,
      TaxId: TaxId,
      NIT: NIT,
      DUI: DUI,
    };
    console.log(newCustomer);
    AddCustomer(newCustomer);
  };

  return (
    <>
      <Box p={8}>
        <Grid spacing={{ xs: 0, mx: 0 }} sx={{ mt: -7 }}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="CustomerName"
              name="CustomerName"
              label="Nombre del Cliente"
              margin="dense"
              size="small"
              error={false}
              //helperText="Escriba un nombre valido"
              onChange={(data) => setCustomerName(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              required
              id="Email"
              name="Email"
              label="Email"
              size="small"
              type="email"
              margin="dense"
              error={false}
              //helperText="Escriba un nombre Email valido"
              onChange={(data) => setEmail(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Phone"
              name="Phone"
              label="Telefono"
              margin="dense"
              size="small"
              error={false}
              //helperText="Escriba un telefono valido"
              onChange={(data) => setPhone(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="Company"
              name="Company"
              label="Empresa"
              margin="dense"
              size="small"
              error={false}
              //helperText="Escriba una Empresa valida"
              onChange={(data) => setCompany(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="Address"
              name="Address"
              label="Direccion"
              margin="dense"
              size="small"
              error={false}
              //helperText="Escriba una direccion valida"
              onChange={(data) => setAddress(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="TaxId"
              name="TaxId"
              label="NRC"
              margin="dense"
              size="small"
              error={false}
              //helperText="Escriba un credito fiscal valido"
              onChange={(data) => setTaxId(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              id="NIT"
              name="NIT"
              label="NIT"
              margin="dense"
              error={false}
              //helperText="Escriba un NIT valido"
              onChange={(data) => setNIT(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              id="DUI"
              name="DUI"
              label="DUI"
              margin="dense"
              error={false}
              //helperText="Escriba un DUI valido"
              onChange={(data) => setDUI(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleAddNewClient}>
            {CustomerFormName}
          </Button>
        </Box>
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          Cliente agregado con exito
        </Alert>
      </Snackbar>
    </>
  );
};
