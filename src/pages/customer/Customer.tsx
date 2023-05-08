import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Button, Drawer, Fab, Grid, Snackbar, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import CustomerDataGrid from "./CustomerDataGrid";
import { createRef, useRef, useState } from "react";
import { CustomerForm } from "./CustomerForm";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Customer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const handleCloseDrawer = async () => {
    setIsDrawerOpen(false);
  };
  const handleOpenDrawer = async () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDialog = async () => {
    setIsDialogOpen(false);
  };
  const handleCustomer = async (id: any) => {
    console.log("handleCustomer");
    console.log(id);
    setCustomerId(id);
  };

  return (
    <>
      <Stack spacing={0.7}>
        <Item>
          <Grid container spacing={{ xs: 0, mx: 0 }}>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <Typography align="left" variant="h5">
                Clientes
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="right" alignItems="right">
              <Button variant="contained" endIcon={<AddIcon />} onClick={() => setIsDrawerOpen(true)}>
                Nuevo Cliente
              </Button>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Box sx={{ height: 400, width: "100%" }}>
            <CustomerDataGrid reloadTrigger={reloadTrigger} openDrawer={handleOpenDrawer} updateCustomerId={handleCustomer} />
          </Box>
        </Item>
      </Stack>
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Fab size="small" sx={{ mt: 1, mb: 1, ml: 40, mr: 1 }} color="primary" aria-label="add" onClick={handleCloseDrawer}>
          <CloseIcon />
        </Fab>
        <CustomerForm closeDrawer={handleCloseDrawer} customerId={customerId} />
      </Drawer>
    </>
  );
};
