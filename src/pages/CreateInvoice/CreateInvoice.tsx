import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Customer } from "../customer/Customer";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

type Customer = {
  id: number;
  CustomerName?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  TaxId?: string;
  NIT?: string;
  DUI?: string;
  Company?: string;
};

interface IInvoiceItem {
  [key: string]: boolean | number | string;
  id: number;
  Description: string;
  Quantity: number;
  Price: number;
  NonSubjectsSales: number;
  ExcentSales: number;
  SubTotal: number;
  IVA: number;
  Total: number;
}

class InvoiceItem implements IInvoiceItem {
  constructor(id: number, description: string, quantity: number, price: number, NonSubjectsSales: number, ExcentSales: number) {
    this.id = id;
    this.Description = description;
    this.Quantity = quantity;
    this.Price = price;
    this.NonSubjectsSales = NonSubjectsSales;
    this.ExcentSales = ExcentSales;
  }
  [key: string]: string | number | boolean;
  id: number;
  Description: string;
  Quantity: number;
  Price: number;
  NonSubjectsSales: number;
  ExcentSales: number;
  get SubTotal(): number {
    return this.Price * this.Quantity;
  }
  get IVA(): number {
    return this.SubTotal * 0.13;
  }
  get Total(): number {
    return this.SubTotal + this.IVA;
  }
}

const customerEmpty = {
  id: 2,
  CustomerName: "Seleccione un Cliente",
  Email: "",
  Phone: "",
  Address: "",
  TaxId: "",
  NIT: "",
  DUI: "",
  Company: "",
};

const invoiceEmptyItem = new InvoiceItem(1, "", 0, 0, 0, 0);

const CreateInvoice = () => {
  const [InvoiceId, setInvoiceId] = useState("");
  const [InvoiceDate, setInvoiceDate] = useState<Dayjs | null>();
  const [nextItemId, setNextItemId] = useState(0);
  const [StatusChecked, setStatusChecked] = useState(true);
  const [InvoiceItems, setInvoiceItems] = useState([invoiceEmptyItem]);
  const [invoiceDescription, setInvoiceDescription] = useState("");
  const [documentType, setDocumentType] = useState(true);
  const [locale, setLocale] = useState("es");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [customerList, setcustomerList] = useState<Customer[]>([customerEmpty]);

  const [customer, setCustomer] = useState<Customer>(customerEmpty);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const clearForm = () => {
    setInvoiceId("");
    setInvoiceDate(new Dayjs(Date.now()));
    setNextItemId(0);
    setStatusChecked(false);
    setInvoiceItems([invoiceEmptyItem]);
    setInvoiceDescription("");
    setDocumentType(true);
  };
  const switchDocumentTypeHandler = (event: any) => {
    setDocumentType(event.target.checked);
  };

  const handleChangeInventoryItem = (index: number, event: any) => {
    const values = [...InvoiceItems];
    let _index = index;
    values[_index][event.target.name] = event.target.value;
    console.log(values);
    setInvoiceItems(values);
  };

  const addNewRow = () => {
    let _InvoiceItems = [...InvoiceItems];
    console.log(nextItemId);
    if (nextItemId === 0) {
      setNextItemId(1);
      console.log(nextItemId);
    }
    let newItem = new InvoiceItem(nextItemId, "", 0, 0, 0, 0);

    _InvoiceItems.push(newItem);
    setNextItemId(InvoiceItems.length + 1);
    setInvoiceItems(_InvoiceItems);
  };

  const removeRow = (id: number) => {
    let _InvoiceItems = [...InvoiceItems];
    console.log(id);
    console.log(_InvoiceItems);
    setNextItemId(id);
    let _newInvoiceItems = _InvoiceItems.filter((item) => item.id !== id);
    console.log(_newInvoiceItems);
    setInvoiceItems(_newInvoiceItems);
  };

  const AddInvoice = async (invoice: any) => {
    await axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/invoices`, invoice)
      .then((data) => {
        console.log(data);
        setOpenSuccess(true);
        clearForm();
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  function CreateInvoiceAction() {
    //new Invoice Id function
    let newInvoiceId = InvoiceId;

    //Create Json
    let newInvoice = {
      id: newInvoiceId,
      CreatedAt: InvoiceDate,
      DocumentType: documentType ? "CreditoFiscal" : "Factura",

      //client
      CustomerName: customer.CustomerName,
      Address: customer.Address,
      TaxId: customer.TaxId,
      CustomerId: customer.id,

      //invoice or client company?
      AccountOf: customer.Company,

      ExcentSales: InvoiceItems.map((v) => v.ExcentSales).reduce((acc, curr) => Number(acc) + Number(curr), 0),
      NonSubjectsSales: InvoiceItems.map((v) => v.NonSubjectsSales).reduce((acc, curr) => Number(acc) + Number(curr), 0),
      SubTotal: InvoiceItems.map((v) => v.SubTotal).reduce((acc, curr) => Number(acc) + Number(curr), 0),
      IVA: InvoiceItems.map((v) => v.IVA).reduce((acc, curr) => Number(acc) + Number(curr), 0),
      Total: InvoiceItems.map((v) => v.Total).reduce((acc, curr) => Number(acc) + Number(curr), 0),
      Description: invoiceDescription,
      Status: StatusChecked ? "PaymentDone" : "WaitingPayment",
      InvoiceItems: InvoiceItems,
    };
    AddInvoice(newInvoice);
    console.log(newInvoice);
  }

  const getCustomers = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/customers`)
      .then((data: any) => {
        console.log(data);
        console.log(data.data);
        setcustomerList(data.data);
      })
      .catch((error: any) => console.log("Authorization Failed : " + error.message));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <Paper elevation={2}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid xs={12} md={3} sx={{ mt: 1 }}>
            <Typography variant="button" gutterBottom>
              Documento Tributario
            </Typography>
          </Grid>
          <Grid xs={12} md={2}>
            <TextField id="InvoiceId" margin="normal" defaultValue="2022-123" onChange={(event) => setInvoiceId(event.target.value)} />
          </Grid>
          <Grid xs={6} md={3} sx={{ mt: 3, mb: 2, ml: 1, mr: 1 }}>
            <Stack direction="row">
              <>
                <Typography variant="button" gutterBottom sx={{ mt: 1, mr: 1 }}>
                  Factura
                </Typography>
              </>
              <>
                <Switch checked={documentType} onChange={switchDocumentTypeHandler} />
              </>
              <>
                <Typography variant="button" gutterBottom sx={{ mt: 1 }}>
                  Credito Fiscal
                </Typography>
              </>
            </Stack>
          </Grid>
          <Grid xs={12} md={2} sx={{ mt: 3, mb: 2, ml: 1 }}>
            <Typography variant="button" gutterBottom sx={{ ml: 2, mr: 2 }}>
              Pagado
            </Typography>
            <ToggleButton
              value="check"
              selected={StatusChecked}
              color="success"
              onChange={() => {
                setStatusChecked(!StatusChecked);
              }}
            >
              <CheckIcon />
            </ToggleButton>
          </Grid>
        </Grid>
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
          <Grid container spacing={1} sx={{ mt: 2, mb: 2, mr: 2, ml: 2 }}>
            <Grid xs={12} md={12}>
              <DatePicker
                disableFuture
                label="Fecha De Documento"
                openTo="day"
                views={["year", "month", "day"]}
                value={InvoiceDate}
                inputFormat="DD/MM/YYYY"
                onChange={(newValue) => {
                  setInvoiceDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <Divider />
        <Grid container spacing={1} justifyContent="center" direction="column" alignItems="center" sx={{ mb: 2 }}>
          <Grid xs={6} md={6} sx={{ mt: 2, ml: 2, mb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 1 }}>
                Mundo Paquete
              </Typography>
              <Typography variant="caption" gutterBottom>
                79 Av, Norte y 9a. Calle Poniente, Local # 6, Col. Escalon, San Salvador.
              </Typography>
              <Typography variant="caption" gutterBottom>
                E-mail: ricchiratti@hotmall.com Tel: 2556-4845
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={6} md={6} sx={{ mt: 2, ml: 2, mb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="body1" gutterBottom>
                <Autocomplete
                  id="customer"
                  options={customerList.map((option) => option.CustomerName)}
                  renderInput={(params) => <TextField {...params} label="Cliente" />}
                  onChange={(e, data) => {
                    let selectedCustomer = customerList.find((c) => c.CustomerName === data);
                    if (selectedCustomer !== undefined) {
                      setCustomer(selectedCustomer);
                    }
                  }}
                />
              </Typography>
              <Typography variant="caption" gutterBottom>
                Credito Fiscal: {customer.TaxId}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {customer.Address}
              </Typography>
              <Typography variant="caption" gutterBottom>
                Email: {customer.Email} | Tel: {customer.Phone}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ bgcolor: "#cfe8fc", padding: 1 }}>
          {InvoiceItems.map((item, index) => (
            <Paper sx={{ mb: 2, ml: 1, mr: 1 }}>
              <Grid
                key={index}
                alignItems="center"
                justifyContent="center"
                container
                sx={{ mt: 2, mb: 2, ml: 1, mr: 1 }}
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 8, sm: 10, md: 12 }}
              >
                <Grid xs={6} md={2} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="caption">
                    <TextField
                      onChange={(event) => handleChangeInventoryItem(index, event)}
                      label="Descripcion"
                      name="description"
                      id="description"
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  </Typography>
                </Grid>
                <Grid xs={2} md={1} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="caption" gutterBottom>
                    <TextField
                      onChange={(event) => handleChangeInventoryItem(index, event)}
                      label="Cantidad"
                      name="Quantity"
                      id="Quantity"
                      size="small"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Typography>
                </Grid>

                <Grid xs={2} md={2} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="caption" gutterBottom>
                    <TextField
                      onChange={(event) => handleChangeInventoryItem(index, event)}
                      label="Precio"
                      name="Price"
                      id="Price"
                      size="small"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Typography>
                </Grid>
                <Grid xs={2} md={2} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="caption" gutterBottom>
                    <TextField
                      onChange={(event) => handleChangeInventoryItem(index, event)}
                      label="NoSujetas"
                      name="NonSubjectsSales"
                      id="NonSubjectsSales"
                      size="small"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Typography>
                </Grid>
                <Grid xs={2} md={2} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="caption" gutterBottom>
                    <TextField
                      label="Exentas"
                      onChange={(event) => handleChangeInventoryItem(index, event)}
                      name="ExcentSales"
                      id="ExcentSales"
                      size="small"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Typography>
                </Grid>
                <Grid xs={2} md={2} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="caption" gutterBottom>
                    <TextField
                      onChange={(event) => handleChangeInventoryItem(index, event)}
                      label="Afectas"
                      name="SubTotal"
                      id="SubTotal"
                      size="small"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Typography>
                </Grid>
                <Grid xs={1} md={1} sx={{ mt: 1, mb: 1 }}>
                  <IconButton aria-label="delete" size="small" onClick={() => removeRow(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
        <IconButton color="info" aria-label="add row" size="large" onClick={addNewRow}>
          <AddIcon />
        </IconButton>
        <Divider />
        <Grid alignItems="center" justifyContent="center" container sx={{ mt: 2, mb: 2, ml: 1, mr: 1 }} spacing={{ xs: 1, md: 1 }}>
          <Grid xs={12} md={6} sx={{ mt: 1, mb: 1 }}>
            <TextField
              rows="5"
              fullWidth
              id="invoiceDescription"
              label="Notas"
              placeholder="Gracias por hacer negocios con nosotros"
              multiline
              onChange={(event) => setInvoiceDescription(event.target.value)}
            />
          </Grid>
          <Grid xs={12} md={6} sx={{ mt: 1, mb: 1 }}>
            <Stack spacing={1}>
              <Typography variant="caption" gutterBottom>
                Ventas Exentas: {InvoiceItems.map((v) => v.ExcentSales).reduce((acc, curr) => Number(acc) + Number(curr), 0)}
              </Typography>
              <Typography variant="caption" gutterBottom>
                Ventas No Sujetas: {InvoiceItems.map((v) => v.NonSubjectsSales).reduce((acc, curr) => Number(acc) + Number(curr), 0)}
              </Typography>
              <Typography variant="caption" gutterBottom>
                SubTotal: {InvoiceItems.map((v) => v.SubTotal).reduce((acc, curr) => Number(acc) + Number(curr), 0)}
              </Typography>
              <Typography variant="caption" gutterBottom>
                IVA: {InvoiceItems.map((v) => v.IVA).reduce((acc, curr) => Number(acc) + Number(curr), 0)}
              </Typography>
              <Typography variant="caption" gutterBottom>
                Total: {InvoiceItems.map((v) => v.Total).reduce((acc, curr) => Number(acc) + Number(curr), 0)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Fab variant="extended" color="primary" aria-label="add" onClick={CreateInvoiceAction}>
        <NavigationIcon sx={{ mr: 1 }} />
        Enviar Nuevo Documento Tributario
      </Fab>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Documento Tributario agregado con exito
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateInvoice;
