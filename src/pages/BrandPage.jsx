import {
  Grid,
  Button,
  TextField,
  MenuItem,
  TableRow,
  TablePagination,
  TableCell,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useBrandForm } from "../hooks/brand/useBrandForm";
import { DialogForm } from "../components/DialogForm";
import { useBrandFetch } from "../hooks/brand/useBrandFetch";
import { BaseTable } from "../components/BaseTable";
import { usePagination } from "../hooks/usePagination";

export function BrandPage() {
  const {
    open,
    formik,
    handleClose,
    handleOpen,
    handleSelectBrand,
    selectBrand,
  } = useBrandForm();
  const { brands, isLoading } = useBrandFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const options = [
    {
      value: true,
      label: "Activo",
    },
    {
      value: false,
      label: "Inactivo",
    },
  ];

  if (isLoading) return "Loading...";

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
          headers={["Marca", "Estado", "Acciones"]}
          body={(rowsPerPage > 0
            ? brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : brands
          ).map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.isActive ? "Activo" : "Inactivo"}</TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  onClick={() => handleSelectBrand(brand)}
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
              count={brands.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
      <DialogForm
        title={selectBrand ? "Editar Marca" : "Crear Marca"}
        maxWidth={"xs"}
        open={open}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                autoComplete="off"
                margin="dense"
                id="name"
                name="name"
                label="Marca"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            {selectBrand && (
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
            )}
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
