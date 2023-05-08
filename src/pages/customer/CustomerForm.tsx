import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Alert, Button, Drawer, FormControlLabel, FormGroup, Grid, Snackbar, Stack, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useParams } from "react-router";

export const CustomerForm = (props: any) => {
  const [CustomerFormName, setCustomerFormName] = useState(
    props.customerId === undefined ? "Nuevo Cliente" : `Actualizar Cliente: ${props.customerId}`
  );
  const [CustomerName, setCustomerName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [Address, setAddress] = useState("");
  const [TaxId, setTaxId] = useState("");
  const [NIT, setNIT] = useState("");
  const [DUI, setDUI] = useState("");
  const [Activo, setActivo] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [CustomerToUpdate, setCustomerToUpdate] = useState([]);

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
    setActivo(true);
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

  const UpdateCustomer = async (customer: any) => {
    await axios
      .put(`${import.meta.env.VITE_APP_BASEURL}/customers/${props.customerId}`, customer)
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
      Activo: Activo ? 1 : 0,
    };
    console.log("Add");
    console.log(newCustomer);
    AddCustomer(newCustomer);
  };

  const handleUpdateClient = () => {
    let updateCustomer = {
      CustomerName: CustomerName,
      Email: Email,
      Phone: Phone,
      Company: Company,
      Address: Address,
      TaxId: TaxId,
      NIT: NIT,
      DUI: DUI,
      Activo: Activo ? 1 : 0,
    };
    console.log("update");
    console.log(updateCustomer);
    UpdateCustomer(updateCustomer);
  };

  const getCustomerById = async () => {
    if (props.customerId)
      await axios.get(`${import.meta.env.VITE_APP_BASEURL}/customers/${props.customerId}`).then((response) => {
        setCustomerToUpdate(response.data);
        console.log(response.data);

        setCustomerName(response.data[0].CustomerName);
        setEmail(response.data[0].Email);
        setPhone(response.data[0].Phone);
        setCompany(response.data[0].Company);
        setAddress(response.data[0].Address);
        setTaxId(response.data[0].TaxId);
        setNIT(response.data[0].NIT);
        setDUI(response.data[0].DUI);
        setActivo(true);
      });
  };

  useEffect(() => {
    getCustomerById();
  }, []);
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
              value={CustomerName}
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
              value={Email}
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
              value={Phone}
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
              value={Company}
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
              value={Address}
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
              value={TaxId}
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
              value={NIT}
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
              value={DUI}
              //helperText="Escriba un DUI valido"
              onChange={(data) => setDUI(data.target.value)}
            />

            <Typography variant="inherit" color="textSecondary"></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Inactivo</Typography>
              <Switch
                defaultChecked
                inputProps={{ "aria-label": "Active" }}
                name="activo"
                id="activo"
                onChange={(data) => setActivo(data.target.checked)}
              />
              <Typography>Activo</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box mt={3}>
          {props.customerId ? (
            <Button variant="contained" color="primary" onClick={handleUpdateClient}>
              {CustomerFormName}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddNewClient}>
              {CustomerFormName}
            </Button>
          )}
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
