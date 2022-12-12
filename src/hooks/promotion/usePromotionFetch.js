import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../../services/promotion.service";

export function usePromotionFetch() {
  const {
    data: promotions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["promotion"],
    queryFn: getPromotions,
  });

  return {
    promotions,
    isLoading,
    isError,
  };
}
