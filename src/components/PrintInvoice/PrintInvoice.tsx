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
              <td colSpan={6} rowSpan={2}></td>
              <td colSpan={2}>Factura</td>
            </tr>
            <tr>
              <td colSpan={2}>No. {props.invoiceSelected.id}</td>
            </tr>
            <tr className="row-height-encabezado">
            </tr>
            <tr>
              <td colSpan={1}></td>
              <td className="row-padding-left-nombreCliente" colSpan={7}>{props.invoiceSelected.CustomerName}</td>
            </tr>
            <tr>
              <td></td>
              <td className="row-padding-left-direccion" colSpan={7}>{props.invoiceSelected.Address}</td>
            </tr>
            <tr>
              <td colSpan={1}></td>
              <td className="row-padding-left-ventaACuentaDe" colSpan={3}>{props.invoiceSelected.AccountOf}</td>
              <td className="row-padding-left-dui" colSpan={4}>
                {props.invoiceSelected.DUI}
              </td>
            </tr>
            <tr className="row-height-detalle">
              <th></th>
              <th colSpan={3}></th>
              <th className="column-align-right-totales"></th>
              <th className="column-align-right-totales"></th>
              <th className="column-align-right-totales"></th>
              <th className="column-align-right-totales"></th>
            </tr>

            {props.invoiceSelected.InvoiceItems.map(function (item: any) {
              return (
                <tr>
                  <td className="column-align-center-cantidad row-text-size-items">{item.Quantity}</td>
                  <td colSpan={3} className="column-align-left-descripcion row-text-size-items">{(item.Price < 1) ? '.' : item.Description }</td>
                  <td className="row-text-size-items"> {(item.Price < 1) ? '' : `$${item.Price}` }</td>
                  <td className="row-text-size-items"> {(item.NonSubjectsSales < 1) ? '' : `$${item.NonSubjectsSales}` }</td>
                  <td className="row-text-size-items"> {(item.ExcentSales < 1) ? '' : `$${item.ExcentSales}` }</td>
                  <td className="row-text-size-items"> {(item.Quantity < 1) ? '' : `$${item.Quantity * item.Price}` }</td>
                </tr>
              );
            })}

            <tr>
              <td colSpan={4} rowSpan={4}>
                {props.invoiceSelected.Description}
              </td>
              <td colSpan={3}></td>
              <td className="column-align-right-totales row-text-size-items row-height-totales">{props.invoiceSelected.SubTotal}</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td className="column-align-right-totales row-text-size-items row-height-totales">{props.invoiceSelected.ExcentSales}</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td className="column-align-right-totales row-text-size-items row-height-totales">{props.invoiceSelected.NonSubjectsSales}</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td className="column-align-right-totales row-text-size-items row-height-totales">{props.invoiceSelected.SubTotal}</td>
            </tr>
            <tr>
              <td colSpan={8} className="row-height-totales-iva-total row-text-size-items">{props.invoiceSelected.IVA}</td>
            </tr>
            <tr>
              <td colSpan={8} className="row-height-totales-iva-total row-text-size-items">{props.invoiceSelected.Total}</td>
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
