import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPromotion } from "../../services/promotion.service";
import { PromotionSchema } from "../../schemas/PromotionSchema";

export function usePromotionForm() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const createPromotionMutation = useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries("promotion");
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
    createPromotionMutation.mutate(values);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      discount: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    validationSchema: PromotionSchema,
    onSubmit: handleSave,
  });

  return {
    open,
    handleOpen,
    handleClose,
    formik,
  };
}
