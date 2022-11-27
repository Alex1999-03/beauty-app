import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate } from "react-router-dom";

export function DrawerItems() {
  const navigate = useNavigate();
  
  return (
    <>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/Categorias")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Categorias" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/marcas")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Marcas" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/presentaciones")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Presentaciones" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/promociones")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Promociones" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/productos")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItemButton>
    </>
  );
}
