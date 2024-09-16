import { Link } from "react-router-dom";
import { Incident } from "../../models/Incident";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import Markdown from "react-markdown";

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <Link to={`/incident/${incident.id}`}>
      <Card>
        <Heading size="xs">{incident.title}</Heading>
        <Markdown className="font-light mt-4 text-sm text-agorium-400 line-clamp-2 [&>p>img]:mt-2 [&>p>img]:rounded-md [&>p>img]:max-h-16">
          {incident.content.substring(0, 100)}
        </Markdown>
        <footer className="flex items-center flex-1 mt-4">
          <span className="text-orange-300 font-semibold text-sm">
            {incident.category.name}
          </span>
        </footer>
      </Card>
    </Link>
  );
}
