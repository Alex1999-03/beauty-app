import "dayjs/locale/es";
import dayjs from "dayjs";
import * as yup from "yup";

const minDate = dayjs(new Date().setHours(0, 0, 0, 0)).locale("es");

export const PromotionSchema = yup.object({
  description: yup.string().required("Es requerida una descripción."),
  discount: yup
    .number()
    .typeError("El descuento debe ser un numero.")
    .min(5, "El descuento minimo es del 5%.")
    .max(50, "El descuento maximo es del 50%.")
    .required("Es requerido un descuento."),
  startDate: yup
    .date()
    .min(minDate, "La fecha de inicio no puede ser anterior a la fecha actual.")
    .required("Es requerida una fecha de inicio."),
  endDate: yup
    .date()
    .min(
      yup.ref("startDate"),
      "La fecha fin no puede ser anterior a la fecha inicio."
    )
    .required("Es requerida una fecha de finalización."),
});
