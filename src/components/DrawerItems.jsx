import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StraightenIcon from '@mui/icons-material/Straighten';
import DiamondIcon from '@mui/icons-material/Diamond';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

export function DrawerItems() {
  const navigate = useNavigate();
  
  return (
    <>
      <ListItemButton onClick={() => navigate("")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/Categorias")}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categorias" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/marcas")}>
        <ListItemIcon>
          <DiamondIcon />
        </ListItemIcon>
        <ListItemText primary="Marcas" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/presentaciones")}>
        <ListItemIcon>
          <StraightenIcon />
        </ListItemIcon>
        <ListItemText primary="Presentaciones" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/promociones")}>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Promociones" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/productos")}>
        <ListItemIcon>
        <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItemButton>
    </>
  );
}
