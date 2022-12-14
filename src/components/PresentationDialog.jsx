import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Grid } from "@mui/material";
import { TextInput } from "./TextInput";
import { DialogForm } from "./DialogForm";
import {
  createPresentation,
  editPresentation,
} from "../services/presentation.services";
import { PresentationSchema } from "../schemas/PresentationSchema";

export function PresentationDialog({
  open,
  setOpen,
  presentation,
  setPresentation,
}) {
  const queryClient = useQueryClient();

  const createPresentationMutation = useMutation({
    mutationFn: createPresentation,
    onSuccess: () => {
      queryClient.invalidateQueries("presentation");
    },
  });

  const editPresentationMutation = useMutation({
    mutationFn: editPresentation,
    onSuccess: () => {
      queryClient.invalidateQueries("presentation");
    },
  });

  const handleClose = () => {
    setOpen();
    setPresentation(null);
    formik.resetForm();
  };

  const handleSave = (values) => {
    if (presentation) {
      editPresentationMutation.mutate({ id: presentation.id, ...values });
    } else {
      createPresentationMutation.mutate(values);
    }
    handleClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: presentation ? presentation.description : "",
    },
    validationSchema: PresentationSchema,
    onSubmit: handleSave,
  });

  return (
    <>
      <DialogForm
        title={"Presentación"}
        maxWidth={"xs"}
        open={open}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12}>
              <TextInput
                field={"description"}
                label={"Descripción"}
                formik={formik}
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
