import * as yup from "yup";

export const BrandSchema = yup.object({
  name: yup.string("Ingresar una marca").required("Es requerida una marca"),
});
