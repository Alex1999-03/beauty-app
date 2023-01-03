import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.services";

export function useProductFetch() {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({ queryKey: ["product"], queryFn: getProducts });

  return {
    products,
    isError,
    isLoading,
  };
}
