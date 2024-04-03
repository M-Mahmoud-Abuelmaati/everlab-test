import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface AppTableProps {
  rows: any[];
  columns: GridColDef[];
}

const AppTable = ({ rows, columns }: AppTableProps) => {
  return (
    <Box
      sx={{
        "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none !important",
          },
        "& .MuiDataGrid-root": {
          minHeight: 400,
          borderRadius: "16px",
          border: 0,
        },
        "& .MuiDataGrid-columnHeader": {
          background: (theme) => theme.palette.primary.main,
        },
        "& .MuiDataGrid-main, & .MuiDataGrid-overlay": {
          height: 400,
          background: (theme) => theme.palette.primary.light,
        },
        "& .MuiDataGrid-columnHeader:first-of-type": {
          borderTopLeftRadius: "16px",
        },
        "& .MuiDataGrid-columnHeader:last-of-type": {
          borderTopRightRadius: "16px",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        autoHeight
        localeText={{ noRowsLabel: "No data" }}
      />
    </Box>
  );
};

export default AppTable;
