import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import InvoiceDataGrid from "./InvoiceDataGrid";
import { NavLink } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Invoice = () => {
  return (
    <>
      <Stack spacing={0.7}>
        <Item>
          <Grid container spacing={{ xs: 0, mx: 0 }}>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="center" alignItems="center">
              <Typography align="left" variant="h5">
                Documento Tributario
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} display="flex" justifyContent="right" alignItems="right">
              <NavLink to="/CreateInvoice">
                <Button variant="contained" endIcon={<AddIcon />}>
                  Nuevo Documento Tributario
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Box sx={{ height: 400, width: "100%" }}>
            <InvoiceDataGrid />
          </Box>
        </Item>
      </Stack>
    </>
  );
};
