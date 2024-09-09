import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";

export function useCategories() {
  const { isPending, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });
  return {
    categories: data?.data.categories || [],
    isPending
  }
}
