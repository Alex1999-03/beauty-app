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
import { useCategoryFetch } from "../hooks/useCategoryFetch";
import { usePagination } from "../hooks/usePagination";
import { useToggle } from "../hooks/useToggle";
import { CategoryDialog } from "../components/CategoryDialog";
import { useState } from "react";

export function CategoryPage() {
  const { categories, isLoading } = useCategoryFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [toggle, setToggle] = useToggle();
  const [category, setCategory] = useState(null);

  const handleSelectItem = (item) => {
    setToggle();
    setCategory(item);
  };


  if (isLoading) return <p>Loading...</p>;
  
  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          arial-label="add"
          onClick={() => setToggle()}
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
          ).map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.isActive ? "Activo" : "Inactivo"}</TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  onClick={() => handleSelectItem(category)}
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
      <CategoryDialog
        open={toggle}
        setOpen={setToggle}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}
