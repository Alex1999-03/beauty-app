import {
  Grid,
  Button,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BaseTable } from "../components/BaseTable";
import { useProductFetch } from "../hooks/useProductFetch";
import { usePagination } from "../hooks/usePagination";
import { useToggle } from "../hooks/useToggle";
import { ProductDialog } from "../components/ProductDialog";

export function ProductPage() {
  const { products, isLoading } = useProductFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [toggle, setToggle] = useToggle();

  if (isLoading) return <p>Loading...</p>;

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
          headers={[
            "Nombre",
            "Descripción",
            "Precio de compra",
            "Precio de venta",
            "Stock",
            "Rating",
            "Fecha de expiración",
          ]}
          body={(rowsPerPage > 0
            ? products.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : products
          ).map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.purchasePrice}</TableCell>
              <TableCell>{product.sellPrice}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.numberRating}</TableCell>
              <TableCell>{product.expirationDate}</TableCell>
            </TableRow>
          ))}
          pagination={
            <TablePagination
              component="div"
              labelRowsPerPage="Filas por pagina: "
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              rowsPerPage={rowsPerPage}
              count={products.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
      <ProductDialog open={toggle} setOpen={setToggle} />
    </>
  );
}
