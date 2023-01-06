import {
  Grid,
  Button,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BaseTable } from "../components/BaseTable";
import { useProductFetch } from "../hooks/useProductFetch";
import { usePagination } from "../hooks/usePagination";
import { useToggle } from "../hooks/useToggle";
import { ProductDialog } from "../components/ProductDialog";
import { useState } from "react";

export function ProductPage() {
  const { products, isLoading } = useProductFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [product, setProduct] = useState(null);
  const [toggle, setToggle] = useToggle();

  const handleSelectItem = (item) => {
    setToggle();
    setProduct(item);
  };

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
            "Imagen",
            "Nombre",
            "Precio de compra",
            "Precio de venta",
            "Stock",
            "Categoría",
            "Marca",
            "Presentación",
            "Promoción",
            "Fecha de expiración",
            "Acciones",
          ]}
          body={(rowsPerPage > 0
            ? products.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : products
          ).map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Avatar
                  alt={product.name}
                  src={product.images[0].imageUrl}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>C$ {product.purchasePrice}</TableCell>
              <TableCell>C$ {product.sellPrice}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.brand.name}</TableCell>
              <TableCell>{product.presentation.description}</TableCell>
              <TableCell>{product.promotion.description}</TableCell>
              <TableCell>
                {new Date(product.expirationDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  onClick={() => handleSelectItem(product)}
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
              count={products.length}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        />
      </Grid>
      <ProductDialog
        open={toggle}
        setOpen={setToggle}
        product={product}
        setProduct={setProduct}
      />
    </>
  );
}
