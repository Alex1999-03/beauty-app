import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { DialogForm } from "./DialogForm";
import { BrandSchema } from "../schemas/BrandSchema";
import { createBrand, editBrand } from "../services/brand.services";

export function BrandDialog({ open, setOpen, brand, setBrand }) {
  const queryClient = useQueryClient();

  const createBrandMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries("brand");
    },
  });

  const editBrandMutation = useMutation({
    mutationFn: editBrand,
    onSuccess: () => {
      queryClient.invalidateQueries("brand");
    },
  });

  const handleClose = () => {
    setOpen();
    setBrand(null);
    formik.resetForm();
  };

  const handleSave = (values) => {
    if (brand) {
      editBrandMutation.mutate({ id: brand.id, ...values });
    } else {
      createBrandMutation.mutate(values);
    }
    handleClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: brand ? brand.name : "",
      isActive: brand ? brand.isActive : true,
    },
    validationSchema: BrandSchema,
    onSubmit: handleSave,
  });

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

  return (
    <>
      <DialogForm
        title={"Marcas"}
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
            {brand && (
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