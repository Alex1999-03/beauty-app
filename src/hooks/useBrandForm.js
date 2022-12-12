import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useFormik } from "formik";
import { BrandSchema } from "../schemas/BrandSchema";
import { createBrand, editBrand } from "../services/brand.service";

export function useBrandForm() {
  const [selectBrand, setSelectBrand] = useState(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const createBrandMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries("brand");
    },
  });

  const editBrandMutation = useMutation({
    mutationFn: editBrand,
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
    setSelectBrand(null);
  };

  const handleSave = (values) => {
    const data = {
      id: selectBrand?.id,
      ...values,
    };
    handleClose(false);
    if (data?.id) {
      editBrandMutation.mutate(data);
      return;
    }
    createBrandMutation.mutate({ name: data.name });
  };

  const handleSelectBrand = (brand) => {
    setSelectBrand(brand);
    handleOpen();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectBrand?.name || "",
      isActive: Boolean(selectBrand?.isActive),
    },
    validationSchema: BrandSchema,
    onSubmit: handleSave,
  });

  return {
    open,
    handleOpen,
    handleClose,
    handleSelectBrand,
    selectBrand,
    formik,
  };
}
