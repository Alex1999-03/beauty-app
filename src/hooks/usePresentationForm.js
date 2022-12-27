import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PresentationSchema } from "../schemas/PresentationSchema";
import { createPresentation } from "../services/presentation.service";

export function usePresentationForm() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const createPresentationMutation = useMutation({
    mutationFn: createPresentation,
    onSuccess: () => {
      queryClient.invalidateQueries("presentation");
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
    createPresentationMutation.mutate(values);
    handleClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
    },
    validationSchema: PresentationSchema,
    onSubmit: handleSave,
  });

  return {
    open,
    handleOpen,
    handleClose,
    formik,
  };
}
