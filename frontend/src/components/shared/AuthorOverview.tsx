import { formatDistance } from "date-fns";
import { Avatar } from "../ui/Avatar";
import { Text } from "../ui/Text";

interface AuthorOverviewProps {
  name: string;
  avatar?: string;
  date: string;
}
export function AuthorOverview({
  name,
  avatar,
  date,
}: AuthorOverviewProps) {
  return (
    <header className="flex">
      <Avatar name={name} url={avatar} />
      <div className="flex flex-col ml-4">
        <span>{name}</span>
        <Text size="sm" asChild>
          <span className="tracking-wider">
            {formatDistance(new Date(date), new Date(), {
              addSuffix: true,
            })}
          </span>
        </Text>
      </div>
    </header>
  );
}
