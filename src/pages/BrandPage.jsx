import { Grid, Button, TextField, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BrandTable } from "../components/BrandTable";
import { useBrandForm } from "../hooks/useBrandForm";
import { DialogForm } from "../components/DialogForm";
import { useBrandFetch } from "../hooks/useBrandFetch";

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
        <BrandTable
          brands={brands}
          handleSelectBrand={handleSelectBrand}
          headers={["Marca", "Estado", "Acciones"]}
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
