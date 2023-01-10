import * as yup from "yup";

export const CreateProductSchema = yup.object({
  categoryId: yup.string().required("Es requerida una categoría."),
  brandId: yup.string().required("Es requerida una marca."),
  promotionId: yup.string().required("Es requerida una promoción."),
  presentationId: yup.string().required("Es requerida una presentación."),
  name: yup.string().required("Es requerido un nombre."),
  description: yup.string().required("Es requerida una descripción."),
  purchasePrice: yup
    .number()
    .typeError("El precio de compra debe ser un numero.")
    .required("Es requerido un precio de compra."),
  sellPrice: yup
    .number()
    .typeError("El precio de venta debe ser un numero.")
    .required("Es requerido un precio de venta."),
  stock: yup
    .number()
    .typeError("El stock debe ser un numero.")
    .required("Es requerido un stock."),
  expirationDate: yup.date().typeError("La fecha no es valida."),
  images: yup
    .array()
    .min(1, "Minimo una imagen.")
    .max(5, "Maximo 5 imagenes.")
    .test("maxsize", "Tamaño maximo 5MB", (files) => {
      let isValid = true;
      files.forEach((file) => {
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          isValid = false;
        }
        isValid = true;
      });
      return isValid
    }),
});

export const EditProductSchema = CreateProductSchema.omit(["images"])