import {
  Grid,
  Button,
  TableRow,
  TablePagination,
  TableCell,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useBrandFetch } from "../hooks/useBrandFetch";
import { BaseTable } from "../components/BaseTable";
import { usePagination } from "../hooks/usePagination";
import { BrandDialog } from "../components/BrandDialog";
import { useState } from "react";
import { useToggle } from "../hooks/useToggle";

export function BrandPage() {
  const { brands, isLoading } = useBrandFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [toggle, setToggle] = useToggle();
  const [brand, setBrand] = useState(null);

  const handleSelectItem = (item) => {
    setToggle();
    setBrand(item);
  };

  if (isLoading) return "Loading...";

  return (
    <>
      <Grid item>
        <Button
          onClick={() => setToggle()}
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
          headers={["Marca", "Estado", "Acciones"]}
          body={(rowsPerPage > 0
            ? brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : brands
          ).map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.isActive ? "Activo" : "Inactivo"}</TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  onClick={() => handleSelectItem(brand)}
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
              count={brands.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
      <BrandDialog
        open={toggle}
        setOpen={setToggle}
        brand={brand}
        setBrand={setBrand}
      />
    </>
  );
}
