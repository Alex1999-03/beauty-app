import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export function DataTable({ headers, children }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 650 }} aria-label="data-table">
          <TableHead>
            <TableRow>
              {headers?.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      ;
    </>
  );
}
