import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { useLatestIncidents } from "../../hooks/useLatestIncidents";

export function TrendingPosts() {
  const { incidents } = useLatestIncidents();
  return (
    <Card>
      <Heading size="xs" asChild>
        <h2 className="tracking-wider">Últimos incidentes</h2>
      </Heading>
      <ul className="mt-6 space-y-6">
        {incidents.map((incident) => (
          <li key={incident.id}>
            <Link to={`/incident/${incident.id}`}>
              <div className="-my-2 py-2 rounded -mx-2 px-2 hover:bg-agorium-700">
                <div className="flex items-center">
                  <span className="text-xs text-orange-300 tracking-wider font-bold mr-auto truncate">
                    {incident.category.name}
                  </span>
                  <span className="text-xs text-agorium-400 ml-auto tracking-wider">
                    {formatDistance(new Date(incident.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-agorium-50 text-sm mt-2 tracking-wider font-semibold">
                  {incident.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
