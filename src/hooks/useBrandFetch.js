import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../services/brand.services";

export function useBrandFetch() {
  const {
    data: brands,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: getBrands,
  });

  return {
    brands,
    isLoading,
    isError,
  };
}
