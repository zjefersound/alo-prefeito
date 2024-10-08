import { useInfiniteQuery } from "@tanstack/react-query";
import { incidentService } from "../services/incidentService";
import { Incident } from "../models/Incident";
import { useMemo } from "react";

export function useIncidents(perPage = 10) {
  const query = useInfiniteQuery({
    queryKey: ["incidents"],
    queryFn: ({ pageParam }) =>
      incidentService.getAll({ page: pageParam, perPage }).then((r) => r.data),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const data = useMemo(
    () =>
      query.data?.pages.reduce(
        (list, group) => [...list, ...group.incidents],
        [] as Incident[]
      ) || [],
    [query.data]
  );

  return {
    data,
    total: query.data?.pages[0].totalCount || 0,
    isPending: query.isPending,
    isLoading: query.isLoading,
    isError: query.isError,
    currentPage: query.data?.pages.length || 0,
    perPage,
    fetchNextPage: query.fetchNextPage,
  };
}
