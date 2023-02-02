import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./PrintInvoice.scss";
import { parseJSON, parse } from "date-fns";

function printOut(divId: string) {
  if (document != null) {
    var printOutContent = document.getElementById(divId)?.innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printOutContent == undefined ? "" : printOutContent;
    window.print();
    document.body.innerHTML = originalContent;
  }
}

function Day(dateString: string) {
  let formattedDate = parseJSON(dateString);
  let day = formattedDate.getDay();
  return day;
}

function Month(dateString: string) {
  let formattedDate = parseJSON(dateString);
  return (formattedDate.getMonth() + 1).toString().padStart(2, "0");
}

function Year(dateString: string) {
  let formattedDate = parseJSON(dateString);
  return formattedDate.getFullYear();
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
              <td colSpan={4} rowSpan={2} className="row-column-width-encabezado"></td>
              <td colSpan={4}>Factura</td>
            </tr>
            <tr>
              <td colSpan={4}>No. {props.invoiceSelected.id}</td>
            </tr>
            <tr className="row-height-encabezado column-align-right-fecha">
              <td colSpan={4}></td>
              <td colSpan={4}>
                {Day(props.invoiceSelected.CreatedAt)} / {Month(props.invoiceSelected.CreatedAt)} / {Year(props.invoiceSelected.CreatedAt)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="row-padding-left-nombreCliente" colSpan={7}>
                {props.invoiceSelected.CustomerName}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="row-padding-left-direccion" colSpan={7}>
                {props.invoiceSelected.Address}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="row-padding-left-ventaACuentaDe" colSpan={3}>
                {props.invoiceSelected.AccountOf}
              </td>
              <td className="row-padding-left-dui" colSpan={4}>
                {props.invoiceSelected.DUI}
              </td>
            </tr>
            <tr className="row-height-detalle">
              <th colSpan={8}></th>
            </tr>

            {props.invoiceSelected.InvoiceItems.map(function (item: any) {
              return (
                <tr>
                  <td className="row-text-size-items column-align-center-cantidad row-padding-left-cantidad">{item.Quantity}</td>
                  <td colSpan={3} className="row-text-size-items row-padding-left-descripcion">
                    {item.Price < 1 ? "." : item.Description}
                  </td>
                  <td className="row-text-size-items column-align-right-totales row-column-width-detalle">
                    {item.Price < 1 ? "" : `$${item.Price}`}
                  </td>
                  <td className="row-text-size-items column-align-right-totales row-column-width-detalle">
                    {item.NonSubjectsSales < 1 ? "" : `$${item.NonSubjectsSales}`}
                  </td>
                  <td className="row-text-size-items column-align-right-totales row-column-width-detalle">
                    {item.ExcentSales < 1 ? "" : `$${item.ExcentSales}`}
                  </td>
                  <td className="row-text-size-items column-align-right-totales row-column-width-detalle">
                    {item.Quantity < 1 ? "" : `$${item.Quantity * item.Price}`}
                  </td>
                </tr>
              );
            })}

            <tr className="row-height-totales">
              <th colSpan={8}></th>
            </tr>

            <tr>
              <td></td>
              <td colSpan={3} rowSpan={4}></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="row-text-size-totales column-align-right-totales">{`$${props.invoiceSelected.SubTotal}`}</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={3}></td>
              <td className="row-text-size-totales column-align-right-totales">{`$${props.invoiceSelected.ExcentSales}`}</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={3}></td>
              <td className="row-text-size-totales column-align-right-totales">{`$${props.invoiceSelected.NonSubjectsSales}`}</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={3}></td>
              <td className="row-text-size-totales column-align-right-totales">{`$${props.invoiceSelected.SubTotal}`}</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={3}></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="row-text-size-totales column-align-right-totales">{`$${props.invoiceSelected.IVA}`}</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={3}></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="row-text-size-totales column-align-right-totales">{`$${props.invoiceSelected.Total}`}</td>
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
