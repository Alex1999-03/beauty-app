import PercentIcon from "@mui/icons-material/Percent";
import { Button, Grid, InputAdornment } from "@mui/material";
import { TextInput } from "./TextInput";
import { DateInput } from "./DateInput";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { PromotionSchema } from "../schemas/PromotionSchema";
import { createPromotion, editPromotion } from "../services/promotion.services";
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
              <TextInput
                field={"description"}
                label="Description"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                field={"discount"}
                label={"Descuento"}
                formik={formik}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PercentIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DateInput
                field={"startDate"}
                label={"Fecha inicio"}
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <DateInput
                field={"endDate"}
                label={"Fecha fin"}
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
