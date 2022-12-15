import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

export function BaseTable({ headers, body, footer, pagination }) {
  return (
    <Paper>
      <TableContainer
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <Table sx={{ minwidth: 650 }} aria-label="data-table" size={"small"}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
        <TableFooter>{footer}</TableFooter>
      </TableContainer>
      {pagination}
    </Paper>
  );
}
