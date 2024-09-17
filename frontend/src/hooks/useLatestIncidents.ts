import { useQuery } from "@tanstack/react-query";
import { incidentService } from "../services/incidentService";

export function useLatestIncidents() {
  const { isPending, data } = useQuery({
    queryKey: ["latestIncidents"],
    queryFn: () => incidentService.getLatestIncidents(),
    staleTime: 10000
  });
  return {
    incidents: data?.data.incidents || [],
    isPending
  }
}
