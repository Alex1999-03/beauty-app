import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export function DateInput({ field, label, formik }) {
    return (<>
        <DatePicker
                label={label}
                value={formik.values[field]}
                onChange={(value) => {
                  formik.setFieldValue("expirationDate", value, true);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="dense"
                    id={field}
                    name={field}
                    error={
                      formik.touched[field] &&
                      Boolean(formik.errors[field])
                    }
                    helperText={
                      formik.touched[field] &&
                      formik.errors[field]
                    }
                  />
                )}
              />
    </>)
}