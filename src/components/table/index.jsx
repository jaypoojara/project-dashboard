import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableWrapper } from "./style";
import CustomButton from "../button";

const CustomTable = ({ rows, columns, handleEdit }) => {
  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={column?.id} width={column?.width ?? "auto"}>
                {column?.label}
              </TableCell>
            ))}
            <TableCell key={"action"}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row?.id}
              className="bg-gray-100"
              sx={{
                borderBottom: "2px solid white",
              }}
            >
              {columns?.map((column) => (
                <TableCell key={column?.id}>{row[column?.id]}</TableCell>
              ))}
              <TableCell>
                <CustomButton
                  label="Edit"
                  variant="contained"
                  onClick={() => handleEdit(row?.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default CustomTable;