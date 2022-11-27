import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Dashboard } from "./Dashboard";

const theme = createTheme({
  typography: "Roboto",
});

export function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard>
         {children}
      </Dashboard>
    </ThemeProvider>
  );
}
