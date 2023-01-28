import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const ConfirmDialog = (props: any) => {
  return (
    <Dialog open={props.openDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Confirma tu accion</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton></IconButton>
      </Box>
      <DialogContent>
        <Typography>{props.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            props.closeDialog();
          }}
        >
          Cancelar
        </Button>
        <Button color="secondary" variant="contained" onClick={props.onSubmit}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
