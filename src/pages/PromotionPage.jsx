import {
  Button,
  Grid,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BaseTable } from "../components/BaseTable";
import { usePromotionFetch } from "../hooks/promotion/usePromotionFetch";
import { usePagination } from "../hooks/usePagination";
import { DialogForm } from "../components/DialogForm";
import { usePromotionForm } from "../hooks/promotion/usePromotionForm";

export function PromotionPage() {
  const { promotions, isLoading } = usePromotionFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const { formik, handleClose, handleOpen, open } = usePromotionForm();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Grid item>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="secondary"
          arial-label="add"
          startIcon={<AddIcon />}
        >
          Registrar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <BaseTable
          headers={[
            "Presentación",
            "Descuento",
            "Fecha inicio",
            "Fecha fin",
            "Acciones",
          ]}
          body={(rowsPerPage > 0
            ? promotions.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : promotions
          ).map((promotion) => (
            <TableRow key={promotion.id}>
              <TableCell>{promotion.description}</TableCell>
              <TableCell>{promotion.discount}</TableCell>
              <TableCell>
                {new Date(promotion.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(promotion.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  // onClick={() => handleSelectCategory(category)}
                  variant="contained"
                  color="success"
                  aria-label="edit"
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
          pagination={
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              labelRowsPerPage="Filas por pagina: "
              rowsPerPage={rowsPerPage}
              count={promotions.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
      <DialogForm
        title={"Crear Categoría"}
        maxWidth={"xs"}
        open={open}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                autoComplete="off"
                margin="dense"
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                autoComplete="off"
                margin="dense"
                id="discount"
                name="discount"
                label="Descuento"
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={"date"}
                autoComplete="off"
                margin="dense"
                id="startDate"
                name="startDate"
                label="Fecha inicio"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                }
                helperText={formik.touched.startDate && formik.errors.startDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={"date"}
                autoComplete="off"
                margin="dense"
                id="endDate"
                name="endDate"
                label="Fecha fin"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.endDate && Boolean(formik.errors.endDate)
                }
                helperText={formik.touched.endDate && formik.errors.endDate}
              />
            </Grid>
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
