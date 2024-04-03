import { GridColDef } from "@mui/x-data-grid";
import { IHighRiskRecord } from "../types";

export const highRiskTableColumns: GridColDef<IHighRiskRecord>[] = [
  { field: "name", headerName: "Name", minWidth: 250, flex: 1 },

  {
    field: "diagnostic",
    headerName: "Diagnostic",
    flex: 1,
    renderCell: ({ value }) => value ?? "NA",
  },
  {
    field: "diagnosticGroup",
    headerName: "Diagnostic Group",
    flex: 1,
    renderCell: ({ value }) => value ?? "NA",
  },

  { field: "value", headerName: "Value", flex: 1 },

  { field: "standardHigher", headerName: "Standard Lower", flex: 1 },
  { field: "standardLower", headerName: "Standard Higher", flex: 1 },
  { field: "unit", headerName: "Unit", flex: 1 },

  { field: "possibleConditions", headerName: "Possible Conditions", flex: 1 },
];
