import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { DialogForm } from "./DialogForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, editCategory } from "../services/category.service";
import { useFormik } from "formik";
import { CategorySchema } from "../schemas/CategorySchema";

export function CategoryDialog({ open, setOpen, category, setCategory }) {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("category");
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("category");
    },
  });

  const handleClose = () => {
    setOpen();
    setCategory(null);
    formik.resetForm();
  };

  const handleSave = (values) => {
    if (category) {
      editCategoryMutation.mutate({ id: category.id, ...values });
    } else {
      createCategoryMutation.mutate(values);
    }
    handleClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category ? category.name : "",
      isActive: category ? category.isActive : true,
    },
    validationSchema: CategorySchema,
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
        title={"Categoría"}
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
            {category && (
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
