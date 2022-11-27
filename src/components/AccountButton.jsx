import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export function AccountButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box component="div" sx={{ flexGrow: 0 }}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
