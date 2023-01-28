import { ChipProps } from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import InfoIcon from "@mui/icons-material/Info";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { red, green, blue } from "@mui/material/colors";

export default function StatusChips(params: GridRenderCellParams): ChipProps {
  if (params.value === "WaitingPayment") {
    return {
      icon: <DoneIcon style={{ fill: blue[500] }} />,
      label: "En Espera",
      color: "primary",
      style: {
        borderColor: blue[500],
      },
    };
  } else if (params.value === "PaymentDone") {
    return {
      icon: <AccessTimeIcon style={{ fill: green[500] }} />,
      label: "Pagado",
      color: "success",
      style: {
        borderColor: green[500],
      },
    };
  } else {
    return {
      icon: <InfoIcon style={{ fill: red[500] }} />,
      label: params.value,
      style: {
        borderColor: red[500],
      },
    };
  }
}
