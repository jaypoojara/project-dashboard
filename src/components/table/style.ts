import { Box, styled, TableContainer } from "@mui/material";

const TableWrapper = styled(TableContainer)({
  "& .MuiTableRow-head": {
    background: "lightgrey",
    borderBottom: "2px solid white",
  },

  "& .MuiTableCell-head": {
    padding: "8px 16px",
  },

  "& .MuiTableCell-body": {
    padding: "8px 16px",
  },
});

const ActionCell = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export { TableWrapper, ActionCell };
