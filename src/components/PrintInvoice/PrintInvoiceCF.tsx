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

function numberToWords(number: any): string {
  // Arreglo de unidades
  var unidades = [
    "",
    "un",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
  ];
  // Arreglo de decenas hasta 90
  var decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  // Arreglo de cientos hasta 900
  var cientos = [
    "",
    "ciento",
    "doscientos",
    "trescientos",
    "cuatrocientos",
    "quinientos",
    "seiscientos",
    "setecientos",
    "ochocientos",
    "novecientos",
  ];

  if (number === parseInt(number.toString(), 10)) {
    if (number < 20) return unidades[number];
    if (number < 100) return decenas[Math.floor(number / 10)] + (number % 10 ? " y " + unidades[number % 10] : "");
    if (number < 1000) return cientos[Math.floor(number / 100)] + " " + numberToWords(number % 100);
    if (number < 100000) return numberToWords(Math.floor(number / 1000)) + " mil " + numberToWords(number % 1000);
    return "Número demasiado grande para ser convertido.";
  } else {
    var integerPart = parseInt(number, 10);
    var decimalPart = number.toString().split(".")[1];
    var decimalPartInWords = "";
    var numeroDecimal;
    for (var i = 0; i < decimalPart.length; i += 2) {
      var decimalNumber = parseInt(decimalPart.substr(i, 2));
      if (decimalNumber < 20) decimalPartInWords += unidades[decimalNumber];
      else decimalPartInWords += decenas[Math.floor(decimalNumber / 10)] + (decimalNumber % 10 ? " y " + unidades[decimalNumber % 10] : "");
      numeroDecimal = decimalNumber;
    }

    return numberToWords(integerPart) + " " + numeroDecimal + "/100 ";
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
    <>
      <div id="print">
        <table border={1}>
          <tr>
            <td colSpan={8} className="row-height-principales"></td>
          </tr>
          <tr>
            <td colSpan={8} className="row-height-principales"></td>
          </tr>
          <tr className="row-height-encabezado column-align-right-fecha">
            <td colSpan={4} className="row-column-width-encabezado"></td>
            <td className="row-text-size-fecha column-align-center-dia">{Day(props.invoiceSelected.CreatedAt)}</td>
            <td></td>
            <td className="row-text-size-fecha row-padding-left-mes">{Month(props.invoiceSelected.CreatedAt)}</td>
            <td className="row-text-size-fecha row-padding-left-anio">{Year(props.invoiceSelected.CreatedAt)}</td>
          </tr>
          <tr className="row-height-fecha">
            <th colSpan={8}></th>
          </tr>
          <tr>
            <td></td>
            <td className="row-padding-left-nombreCliente" colSpan={6}>
              {props.invoiceSelected.CustomerName}
            </td>
            <td>No. {props.invoiceSelected.id}</td>
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
                <td colSpan={3} className="row-text-size-items">
                  {item.Price < 1 ? "." : item.Description}
                </td>
                <td className="row-text-size-items column-align-right-totales row-column-width-detalle">
                  {item.Price < 1 ? "" : `$${item.Price}`}
                </td>
                <td className="row-text-size-items column-align-right-totales row-column-width-detalle-2">
                  {item.NonSubjectsSales < 1 ? "" : `$${item.NonSubjectsSales}`}
                </td>
                <td className="row-text-size-items column-align-right-totales">{item.ExcentSales < 1 ? "" : `$${item.ExcentSales}`}</td>
                <td className="row-text-size-items column-align-right-totales">
                  {item.Quantity < 1 ? "" : `$${(item.Quantity * item.Price).toFixed(2)}`}
                </td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td colSpan={3} rowSpan={4} className="column-align-right-totalEnLetras row-text-size-totalEnLetras">
              {numberToWords(props.invoiceSelected.Total)}
            </td>
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
    </>
  );
};

export default PrintInvoice;
