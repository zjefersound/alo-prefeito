import { useQuery } from "@tanstack/react-query";
import { incidentService } from "../services/incidentService";

export function useIncidents(page = 1, perPage = 10) {
  const query = useQuery({
    queryKey: ["incidents", page, perPage],
    queryFn: () => incidentService.getAll({ page, perPage }), 
    staleTime: 5000,
  });

  return {
    data: query.data?.data.incidents || [],
    total: query.data?.data.totalCount || 0,
    isPending: query.isPending,
    isLoading: query.isLoading,
    isError: query.isError,
    currentPage: page,
    perPage,
  };
}
