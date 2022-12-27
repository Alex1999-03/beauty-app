import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { PromotionSchema } from "../schemas/PromotionSchema";
import { createPromotion, editPromotion } from "../services/promotion.service";
import { DialogForm } from "./DialogForm";

export function PromotionDialog({ open, setOpen, promotion, setPromotion }) {
  const queryClient = useQueryClient();

  const createPromotionMutation = useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries("promotion");
    },
  });

  const editPromotionMutation = useMutation({
    mutationFn: editPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries("promotion");
    },
  });

  const handleClose = () => {
    setOpen();
    setPromotion(null);
    formik.resetForm();
  };

  const handleSave = (values) => {
    if (promotion) {
      editPromotionMutation.mutate({ id: promotion.id, ...values });
    } else {
      createPromotionMutation.mutate(values);
    }
    handleClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: promotion ? promotion.description : "",
      discount: promotion ? promotion.discount * 100 : "5",
      startDate: promotion ? promotion.startDate : "",
      endDate: promotion ? promotion.endDate : "",
    },
    validationSchema: PromotionSchema,
    onSubmit: handleSave,
  });

  return (
    <>
      <DialogForm
        title={"Promoción"}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PercentIcon />
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                margin="dense"
                id="discount"
                name="discount"
                label="Descuento"
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Fecha inicio"
                value={formik.values.startDate}
                onChange={(value) => {
                  console.log(value);
                  formik.setFieldValue("startDate", value, true);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    id="startDate"
                    name="startDate"
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Fecha fin"
                value={formik.values.endDate}
                onChange={(value) =>
                  formik.setFieldValue("endDate", value, true)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    id="endDate"
                    name="endDate"
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />
                )}
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
