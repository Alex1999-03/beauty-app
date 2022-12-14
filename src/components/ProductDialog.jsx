import { useFormik } from "formik";
import { Button, Grid, MenuItem } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, editProduct } from "../services/product.services";
import { DialogForm } from "./DialogForm";
import { useCategoryFetch } from "../hooks/useCategoryFetch";
import { useBrandFetch } from "../hooks/useBrandFetch";
import { usePresentationFetch } from "../hooks/usePresentationFetch";
import { usePromotionFetch } from "../hooks/usePromotionFetch";
import {
  CreateProductSchema,
  EditProductSchema,
} from "../schemas/ProductSchema";
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

  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });

  const handleClose = () => {
    setOpen();
    setProduct(null);
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

    if (product) {
      editProductMutation.mutate({ id: product.id, ...values });
    } else {
      createProductMutation.mutate(formData);
    }
    handleClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryId: product ? product.category.id : "",
      brandId: product ? product.brand.id : "",
      promotionId: product ? product.promotion.id : "",
      presentationId: product ? product.presentation.id : "",
      name: product ? product.name : "",
      description: product ? product.description : "",
      purchasePrice: product ? product.purchasePrice : "",
      sellPrice: product ? product.sellPrice : "",
      stock: product ? product.stock : "",
      expirationDate: product ? product.expirationDate : "",
      images: [],
    },
    validationSchema: product ? EditProductSchema : CreateProductSchema,
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
            <Grid item xs={12}>
              <TextInput field="name" label="Nombre" formik={formik} />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                field="description"
                label="Descripci??n"
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
                label="Fecha de expiraci??n"
                formik={formik}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectInput field="categoryId" label="Categor??a" formik={formik}>
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
                label="Presentaci??n"
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
                label="Promoci??n"
                formik={formik}
              >
                {promotions?.map((promotion) => (
                  <MenuItem key={promotion.id} value={promotion.id}>
                    {promotion.description}
                  </MenuItem>
                ))}
              </SelectInput>
            </Grid>
            {!product && (
              <Grid item>
                <UploadButton
                  field="images"
                  text="Subir imagenes"
                  formik={formik}
                />
              </Grid>
            )}

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
