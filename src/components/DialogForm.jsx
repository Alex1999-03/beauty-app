import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export function DialogForm({ title, maxWidth, open, handleClose, children }) {
  return (
    <Dialog fullWidth={true} maxWidth={maxWidth} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
