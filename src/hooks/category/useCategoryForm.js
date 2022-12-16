import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useFormik } from "formik";
import { CategorySchema } from "../../schemas/CategorySchema";
import { createCategory } from "../../services/category.service";

export function useCategoryForm() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("category");
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
    createCategoryMutation.mutate(values);
    handleClose()
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      isActive: undefined,
    },
    validationSchema: CategorySchema,
    onSubmit: handleSave,
  });

  return {
    open,
    handleOpen,
    handleClose,
    formik,
  };
}
