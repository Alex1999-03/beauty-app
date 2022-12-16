import * as yup from "yup";

export const BrandSchema = yup.object({
  name: yup.string().required("Es requerida una marca."),
  isActive: yup.boolean().notRequired(),
});
