import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "../button";
import { ActionCell, TableWrapper } from "./style";
import { Project } from "../../api/type";
import { Box, CircularProgress } from "@mui/material";
import BookmarkSvgIcon from "../../assets/svg/bookmark";

type Props = {
  rows: Project[];
  columns: { label: string; id: string; width?: string }[];
  handleEdit: (id: string, action: string) => void;
  handleAddToFavourite?: (id: string) => void;
  isLoading?: boolean;
};

const CustomTable = ({
  rows,
  columns,
  handleEdit,
  handleAddToFavourite,
  isLoading,
}: Props) => {
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: 200, width: "100%" }}
                >
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            rows?.map((row) => (
              <TableRow
                key={row?.id}
                className="bg-gray-100"
                sx={{
                  borderBottom: "1px solid",
                }}
              >
                {columns?.map((column) => (
                  <TableCell
                    key={column?.id}
                    onClick={() =>
                      column.id === "id" && handleEdit(row?.id, "details")
                    }
                  >
                    {row[column?.id]}
                  </TableCell>
                ))}
                <TableCell>
                  <ActionCell>
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAddToFavourite?.(row?.id)}
                      data-testid={`bookmark-icon-${row?.id}`}
                    >
                      <BookmarkSvgIcon
                        fillColor={row.isFavourite ? "magenta" : undefined}
                      />
                    </Box>
                    <Button
                      label="Edit"
                      variant="contained"
                      onClick={() => handleEdit(row?.id, "edit")}
                    />
                  </ActionCell>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default CustomTable;
