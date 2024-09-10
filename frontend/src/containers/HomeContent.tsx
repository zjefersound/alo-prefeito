import { MdOutlineCheckCircleOutline, MdOutlineWhatshot } from "react-icons/md";
import { RxArrowTopRight, RxClock } from "react-icons/rx";
import { SmallTabs } from "../components/ui/SmallTabs";
import { Empty } from "../components/ui/Empty";
import { Text } from "../components/ui/Text";
import { Skeleton } from "../components/ui/Skeleton";
import { IncidentCardSkeleton } from "../components/shared/skeletons/IncidentCardSkeleton";
import { Button } from "../components/ui/Button";
import { useIncidents } from "../hooks/useIncidents";
import { useState } from "react";
import { IncidentCard } from "../components/shared/IncidentCard";

export function HomeContent() {
  const [page, setPage] = useState(1);
  const { data, isPending, isLoading, currentPage, total, perPage } =
    useIncidents(page, 10);

  if (isPending && currentPage === 1) {
    return (
      <div className="flex flex-col space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <IncidentCardSkeleton />
        <IncidentCardSkeleton />
        <IncidentCardSkeleton />
      </div>
    );
  }
  if (!(isPending || isLoading) && !data.length)
    return (
      <Empty>
        <p className="to-amber-100 font-bold mb-3 text-center">
          Nenhum incidente encontrado
        </p>
        <Text asChild>
          <span className="text-center">Seja o primeiro a relatar e ajudar sua cidade</span>
        </Text>
      </Empty>
    );

  return (
    <div className="flex flex-col space-y-6">
      <SmallTabs
        value="new"
        onChange={() => {}}
        options={[
          { Icon: RxClock, label: "New", value: "new" },
          { Icon: RxArrowTopRight, label: "Top", value: "top" },
          { Icon: MdOutlineWhatshot, label: "Hot", value: "hot" },
          {
            Icon: MdOutlineCheckCircleOutline,
            label: "Closed",
            value: "closed",
          },
        ]}
      />
      {data.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
      {currentPage < Math.ceil(total / perPage) && (
        <Button
          onClick={() => setPage((p) => p + 1)}
          className="m-auto"
          color="secondary"
        >
          Carregar mais
        </Button>
      )}
    </div>
  );
}
