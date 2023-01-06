import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { Button, Grid, MenuItem } from "@mui/material";
import { DialogForm } from "./DialogForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, editCategory } from "../services/category.services";
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
              <TextInput field={"name"} label={"Categoría"} formik={formik} />
            </Grid>
            {category && (
              <Grid item xs={12}>
                <SelectInput
                  field={"isActive"}
                  label={"Estado"}
                  formik={formik}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </SelectInput>
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
