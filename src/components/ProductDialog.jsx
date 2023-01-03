import { useFormik } from "formik";
import UploadIcon from "@mui/icons-material/Upload";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Button,
  FormGroup,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/product.services";
import { DialogForm } from "./DialogForm";
import { useCategoryFetch } from "../hooks/useCategoryFetch";
import { useBrandFetch } from "../hooks/useBrandFetch";
import { usePresentationFetch } from "../hooks/usePresentationFetch";
import { usePromotionFetch } from "../hooks/usePromotionFetch";
import { ProductSchema } from "../schemas/ProductSchema";

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
              <TextField
                autoFocus
                fullWidth
                autoComplete="off"
                margin="dense"
                id="code"
                name="code"
                label="Codigo"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoComplete="off"
                margin="dense"
                id="name"
                name="name"
                label="Nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoComplete="off"
                margin="dense"
                multiline
                rows={2}
                id="description"
                name="description"
                label="Descripción"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                autoComplete="off"
                margin="dense"
                id="purchasePrice"
                name="purchasePrice"
                label="Precio de compra"
                value={formik.values.purchasePrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.purchasePrice &&
                  Boolean(formik.errors.purchasePrice)
                }
                helperText={
                  formik.touched.purchasePrice && formik.errors.purchasePrice
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                autoComplete="off"
                margin="dense"
                id="sellPrice"
                name="sellPrice"
                label="Precio de venta"
                value={formik.values.sellPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.sellPrice && Boolean(formik.errors.sellPrice)
                }
                helperText={formik.touched.sellPrice && formik.errors.sellPrice}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                autoComplete="off"
                margin="dense"
                id="stock"
                name="stock"
                label="Stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Fecha de expiración"
                value={formik.values.expirationDate}
                onChange={(value) => {
                  formik.setFieldValue("expirationDate", value, true);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="dense"
                    id="expirationDate"
                    name="expirationDate"
                    error={
                      formik.touched.expirationDate &&
                      Boolean(formik.errors.expirationDate)
                    }
                    helperText={
                      formik.touched.expirationDate &&
                      formik.errors.expirationDates
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                select
                autoComplete="off"
                margin="dense"
                id="categoryId"
                name="categoryId"
                label="Categoría"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                error={
                  formik.touched.categoryId && Boolean(formik.errors.categoryId)
                }
                helperText={
                  formik.touched.categoryId && formik.errors.categoryId
                }
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                select
                autoComplete="off"
                margin="dense"
                id="brandId"
                name="brandId"
                label="Marca"
                value={formik.values.brandId}
                onChange={formik.handleChange}
                error={formik.touched.brandId && Boolean(formik.errors.brandId)}
                helperText={formik.touched.brandId && formik.errors.brandId}
              >
                {brands?.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                select
                autoComplete="off"
                margin="dense"
                id="presentationId"
                name="presentationId"
                label="Presentación"
                value={formik.values.presentationId}
                onChange={formik.handleChange}
                error={
                  formik.touched.presentationId &&
                  Boolean(formik.errors.presentationId)
                }
                helperText={
                  formik.touched.presentationId && formik.errors.presentationId
                }
              >
                {presentations?.map((presentation) => (
                  <MenuItem key={presentation.id} value={presentation.id}>
                    {presentation.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                select
                autoComplete="off"
                margin="dense"
                id="promotionId"
                name="promotionId"
                label="Promoción"
                value={formik.values.promotionId}
                onChange={formik.handleChange}
                error={
                  formik.touched.promotionId &&
                  Boolean(formik.errors.promotionId)
                }
                helperText={
                  formik.touched.promotionId && formik.errors.promotionId
                }
              >
                {promotions?.map((promotion) => (
                  <MenuItem key={promotion.id} value={promotion.id}>
                    {promotion.description}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* usa formhelpertext para mostrar un error https://codesandbox.io/s/fervent-framework-u7zmxz?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js */}
            <Grid item>
              <FormGroup>
                <Button
                  size="small"
                  variant="contained"
                  component="label"
                  startIcon={<UploadIcon />}
                >
                  Subir imagenes
                  <input
                    hidden
                    id="images"
                    name="images"
                    accept="image/png, image/jpg, image/jpeg"
                    type={"file"}
                    multiple
                    onChange={(event) =>
                      formik.setFieldValue(
                        "images",
                        Array.from(event.currentTarget.files)
                      )
                    }
                  />
                </Button>
                <FormHelperText
                  error={formik.touched.images && Boolean(formik.errors.images)}
                >
                  {formik.touched.images && formik.errors.images}
                </FormHelperText>
              </FormGroup>
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
