import { Link, useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { Card } from "../components/ui/Card";
import { formatDistance } from "date-fns";
import { Text } from "../components/ui/Text";
import { Heading } from "../components/ui/Heading";
import { Button } from "../components/ui/Button";
import { MdOutlineEdit, MdOutlineShare } from "react-icons/md";
import { GoBack } from "../components/ui/GoBack";
import { useCallback } from "react";
import { useToast } from "../hooks/useToast";
import { MarkdownPreview } from "../components/ui/MarkdownPreview";
import { useIncident } from "../hooks/useIncident";

export function IncidentPage() {
  const { launchToast } = useToast();
  const { id } = useParams();
  const { incident, isPending } = useIncident(id ?? "");

  const isAuthor = false;
  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    launchToast({
      color: "info",
      title: "Copied to clipboard",
      description: `Copied incident link to your clipboard`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) return "Loading... ";
  if (!incident) return "Not found :(";
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
      </Content.Sidebar>
      <Content.Main>
        <GoBack to="/" />
        <Card className="space-y-6">
          <header className="flex">
            {isAuthor && (
              <Link to={`/incident/${incident.id}/edit`} className="ml-auto">
                <Button color="secondary" size="sm">
                  <MdOutlineEdit className="size-5 mr-2" />
                  Edit
                </Button>
              </Link>
            )}
          </header>
          <div>
            <span className="text-orange-300 font-semibold text-sm">
              {incident.category.name}
            </span>
            <Heading size="xs" asChild>
              <h2 className="tracking-wider">{incident.title}</h2>
            </Heading>
          </div>
          <MarkdownPreview>{incident.content}</MarkdownPreview>
          <div className="flex gap-3 items-center">
            <Button color="secondary" size="sm" onClick={handleShare}>
              <MdOutlineShare className="size-5 mr-2" />
              Share
            </Button>
            <Text size="sm" asChild>
              <span className="tracking-wider ml-auto">
                {formatDistance(new Date(incident.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </Text>
          </div>
        </Card>
      </Content.Main>
      <Content.Sidebar>
        <TrendingPosts />
      </Content.Sidebar>
    </Content.Root>
  );
}
