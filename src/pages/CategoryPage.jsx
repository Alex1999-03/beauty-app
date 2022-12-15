import {
  Button,
  Grid,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BaseTable } from "../components/BaseTable";
import { useCategoryFetch } from "../hooks/category/useCategoryFetch";
import { usePagination } from "../hooks/usePagination";

export function CategoryPage() {
  const { categories, isLoading } = useCategoryFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Grid item>
        <Button
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
          headers={["Categoría", "Estado", "Acciones"]}
          body={(rowsPerPage > 0
            ? categories?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : categories
          ).map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.isActive ? "Activo" : "Inactivo"}</TableCell>
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
              labelRowsPerPage="Filas por pagina: "
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              rowsPerPage={rowsPerPage}
              count={categories.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
    </>
  );
}
