import {
  TableCell,
  TableRow,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataTable } from "../components/DataTable";
import { useBrandForm } from "../hooks/useBrandForm";
import { DialogForm } from "../components/DialogForm";
import { useBrandFetch } from "../hooks/useBrandFetch";

export function BrandPage() {
  const { open, formik, handleClose, handleOpen } = useBrandForm();
  const { brands } = useBrandFetch();

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
        <DataTable headers={["ID", "Nombre", "Acciones"]}>
          {brands?.map((brand, index) => (
            <TableRow key={brand.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>
                <Button
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
        </DataTable>
      </Grid>
      <DialogForm
        title={"Crear Marca"}
        maxWidth={"xs"}
        open={open}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                id="name"
                name="name"
                label="Marca"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
