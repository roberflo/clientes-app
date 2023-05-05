import React, { useEffect, useImperativeHandle } from "react";
import { DataGrid, GridActionsCellItem, GridRowId, GridColumns, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { GRID_DEFAULT_LOCALE_TEXT } from "../../components/DataGridCustom/DataGridLocales";
import "../../components/DataGridCustom/tableStyle.scss";
import axios from "axios";
import ConfirmDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

const initialRows = [
  {
    id: 2,
    CustomerName: "cargando",
    Email: "cargando",
    Phone: "cargando",
    Address: "cargando",
    TaxId: "cargando",
    NIT: "cargando",
    DUI: "cargando",
    Company: "cargando",
  },
];

type Row = typeof initialRows[number];

export default function CustomerDataGrid(reloadTrigger: any) {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [IsLoading, setIsLoading] = React.useState(true);
  const [customerId, setCustomerId] = React.useState<GridRowId>(0);
  const [openDialog, setopenDialog] = React.useState(false);

  const getCustomers = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/customers`)
      .then((data) => {
        console.log(data);

        setRows(data.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  useEffect(() => {
    if (reloadTrigger) {
      getCustomers();
    }

    getCustomers();
  }, [reloadTrigger]);

  const openDeleteDialog = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setCustomerId(id);
        setopenDialog(true);
      });
    },
    []
  );

  const DeleteCustomer = async (id: GridRowId) => {
    await axios
      .delete(`${import.meta.env.VITE_APP_BASEURL}/customers/${id}`)
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => console.log("Authorization Failed : " + error.message));
  };

  const DeleteCustomerAction = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        DeleteCustomer(id);
        setIsLoading(true);
        setopenDialog(false);
      });
    },
    []
  );

  const EditCustomer = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "CustomerName",
        headerName: "Nombre Cliente",
        type: "string",
        width: 150,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      { field: "Email", headerName: "Email", type: "string", width: 215, headerAlign: "center", headerClassName: "table-header" },
      { field: "Phone", headerName: "Telefono", type: "string", headerAlign: "center", headerClassName: "table-header" },
      //{ field: "Address", headerName: "Direccion", type: "string", width: 100, headerAlign: "center", headerClassName: "table-header" },
      { field: "TaxId", headerName: "NRC", type: "string", width: 100, headerAlign: "center", headerClassName: "table-header" },
      {
        field: "DUI",
        headerName: "DUI",
        width: 100,
        editable: false,
        headerAlign: "center",
        headerClassName: "table-header",
      },
      { field: "Company", headerName: "Empresa", type: "string", width: 120, headerAlign: "center", headerClassName: "table-header" },
      {
        field: "actions",
        type: "actions",
        width: 190,
        headerName: "Acciones",
        headerClassName: "table-header",
        getActions: (params) => [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={EditCustomer(params.id)} />,
          <GridActionsCellItem icon={<CancelIcon />} label="Inactivar" onClick={openDeleteDialog(params.id)} />,
          // <GridActionsCellItem icon={<FileCopyIcon />} label="Crear Factura" onClick={CreateInvoice(params.id)} showInMenu />,
        ],
      },
    ],
    // [EditCustomer, DeleteCustomer, CreateInvoice]
    [openDeleteDialog]
  );
  //Full grid
  //       <DataGrid columns={columns} rows={rows} localeText={GRID_DEFAULT_LOCALE_TEXT} components={{ Toolbar: GridToolbar }} />

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid loading={IsLoading} columns={columns} rows={rows} localeText={GRID_DEFAULT_LOCALE_TEXT} />
      <ConfirmDialog
        message={"Seguro que deseas dejar como inactivo este cliente?"}
        onSubmit={DeleteCustomerAction(customerId)}
        openDialog={openDialog}
        closeDialog={() => {
          setopenDialog(false);
        }}
      />
    </div>
  );
}
