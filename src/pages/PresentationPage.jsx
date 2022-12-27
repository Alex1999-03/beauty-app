import { useState } from "react";
import {
  Button,
  Grid,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BaseTable } from "../components/BaseTable";
import { usePresentationFetch } from "../hooks/usePresentationFetch";
import { usePagination } from "../hooks/usePagination";
import { useToggle } from "../hooks/useToggle";
import { PresentationDialog } from "../components/PresentationDialog";

export function PresentationPage() {
  const { presentations, isLoading } = usePresentationFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [presentation, setPresentation] = useState(null);
  const [toggle, setToggle] = useToggle();

  const handleSelectItem = (item) => {
    setToggle();
    setPresentation(item);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Grid item>
        <Button
          onClick={() => setToggle()}
          variant="contained"
          color="secondary"
          arial-label="add"
          startIcon={<AddIcon />}
        >
          Registrar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <BaseTable
          headers={["Descripción", "Acciones"]}
          body={(rowsPerPage > 0
            ? presentations.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : presentations
          ).map((presentation, index) => (
            <TableRow key={presentation.id}>
              <TableCell>{presentation.description}</TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  onClick={() => handleSelectItem(presentation)}
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
          pagination={
            <TablePagination
              component="div"
              labelRowsPerPage="Filas por pagina: "
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              rowsPerPage={rowsPerPage}
              count={presentations.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
      <PresentationDialog
        open={toggle}
        setOpen={setToggle}
        presentation={presentation}
        setPresentation={setPresentation}
      />
    </>
  );
}
