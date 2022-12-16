import * as yup from "yup";

export const CategorySchema = yup.object({
  name: yup.string().required("Es requerida una categoría."),
  isActive: yup.boolean().notRequired(),
});
