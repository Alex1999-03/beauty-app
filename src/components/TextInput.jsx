import { TextField } from "@mui/material";

export function TextInput({
  field,
  label,
  formik,
  inputProps,
  InputProps,
}) {
  return (
    <>
      <TextField
        fullWidth
        autoComplete="off"
        margin="dense"
        InputProps={InputProps}
        inputProps={inputProps}
        id={field}
        label={label}
        value={formik.values[field]}
        onChange={formik.handleChange}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
      />
    </>
  );
}
