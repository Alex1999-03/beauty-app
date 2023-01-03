import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category.services";

export function useCategoryFetch() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  return {
    categories,
    isLoading,
    isError,
  };
}
