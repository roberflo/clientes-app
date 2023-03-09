import React, { useEffect } from "react";
import { DataGrid, GridValueFormatterParams, GridActionsCellItem, GridRowId, GridColumns } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { GRID_DEFAULT_LOCALE_TEXT } from "../../components/DataGridCustom/DataGridLocales";
import "../../components/DataGridCustom/tableStyle.scss";
import Chip from "@mui/material/Chip";
import StatusChips from "../../components/StatusChips/StatusChips";
import axios from "axios";
import ConfirmDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import PrintInvoice from "../../components/PrintInvoice/PrintInvoice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

var initialRows = [
  {
    id: "cargando",
    CreatedAt: "cargando",
    UpdatedAt: "cargando",
    CustomerName: "cargando",
    Address: "cargando",
    TaxId: "cargando",
    NIT: "cargando",
    DUI: "cargando",
    AccountOf: "cargando",
    ExcentSales: "0",
    NonSubjectsSales: "0",
    SubTotal: "0",
    IVA: "0",
    Total: "0",
    Description: "0",
    CustomerId: "0",
    Status: "PaymentDone",
  },
];

type Row = typeof initialRows[number];

const InvoiceDataGrid = () => {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [IsLoading, setIsLoading] = React.useState(true);
  const [invoiceId, setInvoiceId] = React.useState<GridRowId>(0);
  const [openDialog, setopenDialog] = React.useState(false);
  const [openPrintDialogFlag, setopenPrintDialogFlag] = React.useState(false);
  //action
  const getInvoices = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/invoices`)
      .then((data) => {
        setRows(data.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  useEffect(() => {
    getInvoices();
  }, []);

  const openDeleteDialog = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setInvoiceId(id);
        setopenDialog(true);
      });
    },
    []
  );

  const openPrint = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        //Reset
        setInvoiceId(id);

        //Get invoice by id
        //getInvoiceById(id);

        //redirect
        navigate(`/invoiceView/${id}`);
      });
    },
    []
  );

  const DeleteInvoiceAction = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setIsLoading(true);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        DeleteInvoice(id);
        setopenDialog(false);
      });
    },
    []
  );

  const DeleteInvoice = async (id: GridRowId) => {
    await axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/invoices/${id}`)
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { 
          field: "id", 
          headerName: "Codigo", 
          width: 70, 
          headerAlign: "center", 
          headerClassName: "table-header" 
      },
      {
        field: "CreatedAt",
        headerName: "Fecha",
        width: 120,
        editable: false,
        headerAlign: "center",
        type: "date",
        headerClassName: "table-header",
      },
      {
        field: "CustomerName",
        headerName: "Nombre",
        width: 135,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      {
        field: "NIT",
        headerName: "NIT",
        width: 100,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      {
        field: "DUI",
        headerName: "DUI",
        width: 100,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      {
        field: "TaxId",
        headerName: "NRC",
        width: 100,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      {
        field: "CodeMH",
        headerName: "Documento",
        width: 100,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      /*/
      {
        field: "SubTotal",
        headerName: "SubTotal",
        type: "number",
        width: 70,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value == null) {
            return "";
          }

          const valueFormatted = Number(params.value).toLocaleString();
          return `${"$" + valueFormatted}`;
        },
      },
      {
        field: "IVA",
        headerName: "IVA",
        type: "number",
        width: 70,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value == null) {
            return "";
          }

          let valueFormatted = params.value;
          return `${"$" + valueFormatted}`;
        },
      },
      /*/
      {
        field: "Total",
        headerName: "Total",
        type: "number",
        width: 70,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value == null) {
            return "";
          }

          const valueFormatted = Number(params.value).toLocaleString();
          return `${"$" + valueFormatted}`;
        },
      },
      {
        field: "Status",
        headerName: "Estado",
        type: "string",
        width: 150,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
        renderCell: (params) => {
          return <Chip variant="outlined" {...StatusChips(params)} />;
        },
      },
      /*/ 
      {
        field: "Address",
        headerName: "Direccion",
        width: 250,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      /*/
      {
        field: "actions",
        type: "actions",
        width: 100,
        headerName: "Acciones",
        headerClassName: "table-header",
        getActions: (params) => [
          <GridActionsCellItem icon={<VisibilityIcon />} label="View" onClick={openPrint(params.id)} />,
          // <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={EditCustomer(params.id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={openDeleteDialog(params.id)} />,
        ],
      },
    ],
    // [EditCustomer, DeleteCustomer]
    [openDeleteDialog, openPrint]
  );

  return (
    <>
      <DataGrid loading={IsLoading} rows={rows} columns={columns} localeText={GRID_DEFAULT_LOCALE_TEXT} />
      <ConfirmDialog
        message={"Seguro que deseas eliminar este documento tributario?"}
        onSubmit={DeleteInvoiceAction(invoiceId)}
        openDialog={openDialog}
        closeDialog={() => {
          setopenDialog(false);
        }}
      />
    </>
  );
};

export default InvoiceDataGrid;
