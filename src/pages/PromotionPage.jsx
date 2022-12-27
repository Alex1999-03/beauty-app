import { useState } from "react";
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
import { usePromotionFetch } from "../hooks/usePromotionFetch";
import { usePagination } from "../hooks/usePagination";
import { useToggle } from "../hooks/useToggle";
import { PromotionDialog } from "../components/PromotionDialog";

export function PromotionPage() {
  const { promotions, isLoading } = usePromotionFetch();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [promotion, setPromotion] = useState(null);
  const [toggle, setToggle] = useToggle();

  const handleSelectItem = (item) => {
    setToggle();
    setPromotion(item);
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
              <TableCell>{promotion.discount * 100}%</TableCell>
              <TableCell>
                {new Date(promotion.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(promotion.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  size={"small"}
                  onClick={() => handleSelectItem(promotion)}
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
      <PromotionDialog
        open={toggle}
        setOpen={setToggle}
        promotion={promotion}
        setPromotion={setPromotion}
      />
    </>
  );
}
