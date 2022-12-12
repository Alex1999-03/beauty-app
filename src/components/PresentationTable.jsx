import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export function PresentationTable({ presentations }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 650 }} aria-label="data-table" size={"small"}>
          <TableHead>
            <TableRow>
              {["Presentación", "Acciones"].map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? presentations?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : presentations
            ).map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button
                    size={"small"}
                    // onClick={() => handleSelectCategory(category)}
                    variant="contained"
                    color="success"
                    aria-label="edit"
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                rowsPerPage={rowsPerPage}
                count={presentations.length}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
