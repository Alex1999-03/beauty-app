import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useFormik } from "formik";
import { BrandSchema } from "../schemas/BrandSchema";
import { createBrand } from "../services/brandService";

export function useBrandForm() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const createBrandMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries("brand");
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleSave = (values) => {
    handleClose(false);
    createBrandMutation.mutate(values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: BrandSchema,
    onSubmit: handleSave,
  });

  return {
    open,
    handleOpen,
    handleClose,
    formik,
  };
}
