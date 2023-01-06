import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Grid, MenuItem } from "@mui/material";
import { DialogForm } from "./DialogForm";
import { BrandSchema } from "../schemas/BrandSchema";
import { createBrand, editBrand } from "../services/brand.services";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";

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
              <TextInput field={"name"} label={"Marca"} formik={formik} />
            </Grid>
            {brand && (
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
