import React from "react";
import PropTypes from "prop-types";
import PrintInvoice from "../../components/PrintInvoice/PrintInvoice";
import PrintInvoiceCF from "../../components/PrintInvoice/PrintInvoiceCF";
import { useParams } from "react-router";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

function printOut(divId: string) {
  if (document != null) {
    var printOutContent = document.getElementById(divId)?.innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printOutContent == undefined ? "" : printOutContent;
    window.print();
    document.body.innerHTML = originalContent;
    return false;
  }
}

var invoiceEmpty = {
  id: 0,
  CreatedAt: new Date(),
  DocumentType: "Factura",

  //client
  CustomerName: "Cliente",
  Address: "Direccion",
  TaxId: "tax",
  CustomerId: 100,

  //invoice or client company?
  AccountOf: "Company",

  ExcentSales: 1,
  NonSubjectsSales: 2,
  SubTotal: 3,
  IVA: 4,
  Total: 5,
  Description: "Descripcion",
  Status: "PaymentDone",
  DteId: "1",
  InvoiceItems: [
    {
      Description: "Prueba 1",
      Quantity: "2",
      Price: "15",
      NonSubjectsSales: 0,
      ExcentSales: 0,
    },
    {
      Description: "Prueba 2",
      Quantity: "5",
      Price: "18",
      NonSubjectsSales: 0,
      ExcentSales: 0,
    },
  ],
};

function InvoiceViewPrint(props: any) {
  let params = useParams();
  const [invoiceSelected, setinvoiceSelected] = React.useState(invoiceEmpty);

  const getInvoiceById = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/invoices/${params.id}`)
      .then((data) => {
        let itemEmpty = {
          Description: "",
          Quantity: "",
          Price: "",
          NonSubjectsSales: null,
          ExcentSales: null,
        };

        const itemsCount = data.data[0].InvoiceItems.length;

        for (let index = 0; index <= 12 - itemsCount; index++) {
          data.data[0].InvoiceItems.push(itemEmpty);
        }

        setinvoiceSelected(data.data[0]);
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };
  return (
    <>
      <Card>
        <CardActionArea>
          <CardContent id="print">
            {invoiceSelected.DteId == "2" && <PrintInvoice invoiceSelected={invoiceSelected} />}
            {invoiceSelected.DteId == "1" && <PrintInvoiceCF invoiceSelected={invoiceSelected} />}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              printOut("print");
            }}
          >
            PRINT
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

InvoiceViewPrint.propTypes = {};

export default InvoiceViewPrint;
