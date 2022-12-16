import {
  Button,
  Grid,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BaseTable } from "../components/BaseTable";
import { usePresentationFetch } from "../hooks/presentation/usePresentationFetch";
import { usePresentationForm } from "../hooks/presentation/usePresentationForm";
import { usePagination } from "../hooks/usePagination";
import { DialogForm } from "../components/DialogForm";

export function PresentationPage() {
  const { formik, handleClose, handleOpen, open } = usePresentationForm();
  const { presentations, isLoading } = usePresentationFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Grid item>
        <Button
          onClick={handleOpen}
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
      <DialogForm
        title={"Crear Categoría"}
        maxWidth={"xs"}
        open={open}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                autoComplete="off"
                margin="dense"
                id="description"
                name="description"
                label="Descripción"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button type={"submit"} variant="contained" color="secondary">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogForm>
    </>
  );
}
