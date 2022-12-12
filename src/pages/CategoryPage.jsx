import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCategoryFetch } from "../hooks/category/useCategoryFetch";
import { CategoryTable } from "../components/CategoryTable";

export function CategoryPage() {
  const { categories, isLoading } = useCategoryFetch();

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
        <CategoryTable
          categories={categories}
          //handleSelectBrand={handleSelectCategory}
        />
      </Grid>
    </>
  );
}
