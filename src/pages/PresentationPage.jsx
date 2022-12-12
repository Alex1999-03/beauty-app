import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PresentationTable } from "../components/PresentationTable";
import { usePresentationFetch } from "../hooks/presentation/usePresentationFetch";

export function PresentationPage() {
    const { presentations, isLoading } = usePresentationFetch()


    if(isLoading) return <p>Loading...</p>

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
        <PresentationTable
          presentations={presentations}
          //handleSelectBrand={handleSelectCategory}
        />
      </Grid>
    </>
  );
}
