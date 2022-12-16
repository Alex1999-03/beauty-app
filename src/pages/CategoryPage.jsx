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
import { useCategoryFetch } from "../hooks/category/useCategoryFetch";
import { usePagination } from "../hooks/usePagination";
import { DialogForm } from "../components/DialogForm";
import { useCategoryForm } from "../hooks/category/useCategoryForm";

export function CategoryPage() {
  const { formik, handleClose, handleOpen, open } = useCategoryForm();
  const { categories, isLoading } = useCategoryFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  // const options = [
  //   {
  //     value: true,
  //     label: "Activo",
  //   },
  //   {
  //     value: false,
  //     label: "Inactivo",
  //   },
  // ];

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          arial-label="add"
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Registrar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <BaseTable
          headers={["Categoría", "Estado", "Acciones"]}
          body={(rowsPerPage > 0
            ? categories?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : categories
          ).map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.isActive ? "Activo" : "Inactivo"}</TableCell>
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
              count={categories.length}
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
                id="name"
                name="name"
                label="Categoría"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            {/* {selectBrand && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="isActive"
                  name="isActive"
                  select
                  label={"Estado"}
                  value={formik.values.isActive}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.isActive && Boolean(formik.errors.isActive)
                  }
                  helperText={formik.touched.isActive && formik.errors.isActive}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )} */}
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
