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

export function PromotionTable({ promotions }) {

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
              {["Presentación", "Descuento", "Fecha inicio", "Fecha fin", "Acciones"].map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? promotions?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : promotions
            ).map((promotion, index) => (
              <TableRow key={promotion.id}>
                <TableCell>{promotion.description}</TableCell>
                <TableCell>{promotion.discount}</TableCell>
                <TableCell>{new Date(promotion.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(promotion.endDate).toLocaleDateString()}</TableCell>
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
                count={promotions.length}
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