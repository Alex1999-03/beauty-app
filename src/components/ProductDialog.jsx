import { useFormik } from "formik";
import { Button, Grid, MenuItem } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/product.services";
import { DialogForm } from "./DialogForm";
import { useCategoryFetch } from "../hooks/useCategoryFetch";
import { useBrandFetch } from "../hooks/useBrandFetch";
import { usePresentationFetch } from "../hooks/usePresentationFetch";
import { usePromotionFetch } from "../hooks/usePromotionFetch";
import { ProductSchema } from "../schemas/ProductSchema";
import { TextInput } from "./TextInput";
import { DateInput } from "./DateInput";
import { SelectInput } from "./SelectInput";
import { UploadButton } from "./UploadButton";

export function ProductDialog({ open, setOpen, product, setProduct }) {
  const { categories } = useCategoryFetch();
  const { brands } = useBrandFetch();
  const { presentations } = usePresentationFetch();
  const { promotions } = usePromotionFetch();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });

  const handleClose = () => {
    setOpen();
    // setBrand(null);
    formik.resetForm();
  };

  const handleSave = (values) => {
    let formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
      if (value === "images") {
        values[value].forEach((image, i) => formData.append("images", image));
      }
    }

    createProductMutation.mutate(formData);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      brandId: "",
      promotionId: "",
      presentationId: "",
      code: "",
      name: "",
      description: "",
      purchasePrice: "",
      sellPrice: "",
      stock: "",
      expirationDate: "",
      images: [],
    },
    validationSchema: ProductSchema,
    onSubmit: handleSave,
  });

  return (
    <>
      <DialogForm
        title={"Producto"}
        maxWidth={"md"}
        open={open}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={6}>
              <TextInput
                field="code"
                label="Codigo"
                formik={formik}
                InputProps={{ autoFocus: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput field="name" label="Nombre" formik={formik} />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                field="description"
                label="Descripción"
                formik={formik}
                InputProps={{ multiline: true, rows: 2 }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                field="purchasePrice"
                label="Precio de compra"
                formik={formik}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                field="sellPrice"
                label="Precio de venta"
                formik={formik}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                field="stock"
                label="Stock"
                formik={formik}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={3}>
              <DateInput
                field="expirationDate"
                label="Fecha de expiración"
                formik={formik}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectInput field="categoryId" label="Categoría" formik={formik}>
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </SelectInput>
            </Grid>
            <Grid item xs={3}>
              <SelectInput field="brandId" label="Marca" formik={formik}>
                {brands?.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </SelectInput>
            </Grid>
            <Grid item xs={3}>
              <SelectInput
                field="presentationId"
                label="Presentación"
                formik={formik}
              >
                {presentations?.map((presentation) => (
                  <MenuItem key={presentation.id} value={presentation.id}>
                    {presentation.description}
                  </MenuItem>
                ))}
              </SelectInput>
            </Grid>
            <Grid item xs={3}>
              <SelectInput
                field="promotionId"
                label="Promoción"
                formik={formik}
              >
                {promotions?.map((promotion) => (
                  <MenuItem key={promotion.id} value={promotion.id}>
                    {promotion.description}
                  </MenuItem>
                ))}
              </SelectInput>
            </Grid>
            <Grid item>
              <UploadButton
                field="images"
                text="Subir imagenes"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}></Grid>
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
