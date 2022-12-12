import { useQuery } from "@tanstack/react-query";
import { getPresentations } from "../../services/presentation.service";

export function usePresentationFetch() {
  const {
    data: presentations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["presentation"],
    queryFn: getPresentations,
  });

  return {
    presentations,
    isLoading,
    isError,
  };
}
