import { Button, FormGroup, FormHelperText } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export function UploadButton({ field, text, formik }) {
  return (
    <>
      <FormGroup>
        <Button
          size="small"
          variant="contained"
          component="label"
          startIcon={<UploadIcon />}
        >
          {text}
          <input
            hidden
            id={field}
            name={field}
            accept="image/png, image/jpg, image/jpeg"
            type={"file"}
            multiple
            onChange={(event) =>
              formik.setFieldValue(
                field,
                Array.from(event.currentTarget.files)
              )
            }
          />
        </Button>
        <FormHelperText
          error={formik.touched[field] && Boolean(formik.errors[field])}
        >
          {formik.touched[field] && formik.errors[field]}
        </FormHelperText>
      </FormGroup>
    </>
  );
}
