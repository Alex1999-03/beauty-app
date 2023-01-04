import { TextField } from "@mui/material";

export function SelectInput({ field, label, formik, children }) {
  return (
    <>
      <TextField
        fullWidth
        select
        autoComplete="off"
        margin="dense"
        id={field}
        name={field}
        label={label}
        value={formik.values[field]}
        onChange={formik.handleChange}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
      >
        {children}
      </TextField>
    </>
  );
}
