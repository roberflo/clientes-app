import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./PrintInvoice.scss";

function printOut(divId: string) {
  if (document != null) {
    var printOutContent = document.getElementById(divId)?.innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printOutContent == undefined ? "" : printOutContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
}

/*
{
  id: 0,
  CreatedAt: new Date(),
  DocumentType: "Factura",
  CustomerName: "Cliente",
  Address: "Direccion",
  TaxId: "tax",
  CustomerId: 100,
  AccountOf: "Company",
  ExcentSales: 1,
  NonSubjectsSales: 2,
  SubTotal: 3,
  IVA: 4,
  Total: 5,
  Description: "Descripcion",
  Status: "PaymentDone",
  InvoiceItems: [
    {
      Description: "Prueba 1",
      Quantity: "2",
      Price: "15",
      NonSubjectsSales: 0,
      ExcentSales: 0,
    }
  ]
}
*/

const PrintInvoice = (props: any) => {
  return (
    <Dialog open={props.openDialog} onClose={props.closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Formato: Impresora de cinta</DialogTitle>

      <DialogContent>
        <div id="print">
          <table border={1}>
            <tr>
              <td colSpan={5} rowSpan={2}></td>
              <td colSpan={1}>Factura</td>
            </tr>
            <tr>
              <td colSpan={1}>No. {props.invoiceSelected.id}</td>
            </tr>
            <tr>
              <td colSpan={1}>Cliente</td>
              <td colSpan={5}>{props.invoiceSelected.CustomerName}</td>
            </tr>
            <tr>
              <td>Direccion</td>
              <td colSpan={5}>{props.invoiceSelected.Address}</td>
            </tr>
            <tr>
              <td colSpan={2}>Venta a cuenta de </td>
              <td colSpan={2}>{props.invoiceSelected.AccountOf}</td>
              <td>DUI/NIT</td>
              <td>
                {props.invoiceSelected.DUI} / {props.invoiceSelected.NIT}
              </td>
            </tr>
            <tr>
              <th>Cantidad</th>
              <th>DESCRIPCION</th>
              <th>Precio Unitario</th>
              <th>Ventas No Sujetas</th>
              <th>Ventas Excentas</th>
              <th>Ventas Afectas</th>
            </tr>

            {props.invoiceSelected.InvoiceItems.map(function (item: any) {
              return (
                <tr>
                  <td>{item.Quantity}</td>
                  <td>{item.Description}</td>
                  <td>{item.Price}</td>
                  <td>{item.NonSubjectsSales}</td>
                  <td>{item.ExcentSales}</td>
                  <td>{item.Quantity * item.Price}</td>
                </tr>
              );
            })}

            <tr>
              <td colSpan={2} rowSpan={4}>
                Son: {props.invoiceSelected.Description}
              </td>
              <td>Sumas</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3}>Ventas Excentas</td>
              <td>{props.invoiceSelected.ExcentSales}</td>
            </tr>
            <tr>
              <td colSpan={3}>Ventas no Sujetas</td>
              <td>{props.invoiceSelected.NonSubjectsSales}</td>
            </tr>
            <tr>
              <td colSpan={3}>Subtotal</td>
              <td>{props.invoiceSelected.SubTotal}</td>
            </tr>
            <tr>
              <td colSpan={2} rowSpan={4}></td>
              <td colSpan={3}> Iva retenido</td>
              <td>{props.invoiceSelected.IVA}</td>
            </tr>
            <tr>
              <td colSpan={3}>Venta Total</td>
              <td>{props.invoiceSelected.Total}</td>
            </tr>
          </table>
        </div>
        <div>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                printOut("print");
              }}
            >
              Imprimir
            </Button>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintInvoice;
