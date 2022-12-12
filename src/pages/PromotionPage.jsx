import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePromotionFetch } from "../hooks/promotion/usePromotionFetch";
import { PromotionTable } from "../components/PromotionTable";

export function PromotionPage() {
  const { promotions, isLoading } = usePromotionFetch();

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
        <PromotionTable
          promotions={promotions}
          //handleSelectBrand={handleSelectCategory}
        />
      </Grid>
    </>
  );
}
