import * as yup from "yup";

export const PromotionSchema = yup.object({
  description: yup.string().required("Es requerida una descripción."),
  discount: yup
    .number()
    .positive("El descuento debe ser positivo.")
    .required("Es requerido un descuento."),
  startDate: yup.date().required("Es requerida una fecha de inicio."),
  endDate: yup.date().required("Es requerida una fecha de finalización."),
});
