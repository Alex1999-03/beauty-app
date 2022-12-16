import * as yup from "yup";

export const PresentationSchema = yup.object({
  description: yup.string().required("Es requerida una descripción."),
});
