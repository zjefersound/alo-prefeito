import { useQuery } from "@tanstack/react-query";
import { incidentService } from "../services/incidentService";

export function useIncident(id: string) {
  const { isPending, data } = useQuery({
    queryKey: ["incident"],
    queryFn: () => incidentService.getById(id),
  });
  return {
    incident: data?.data.incident,
    isPending,
  };
}
