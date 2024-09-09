import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { MdArrowUpward, MdOutlineModeComment } from "react-icons/md";
import Markdown from "react-markdown";
import { AuthorOverview } from "./AuthorOverview";

interface PostCardProps {
  post: Post;
}
export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/incident/${post.id}`}>
      <Card className="space-y-4">
        <AuthorOverview
          name={post.user.name}
          date={post.createdAt}
        />
        <div className="space-y-2">
          <p className="font-bold tracking-wider">{post.title}</p>
          <Markdown className="font-light text-sm line-clamp-2">
            {post.content}
          </Markdown>
        </div>
        <footer className="flex items-center flex-1">
          <span className="text-orange-300 font-semibold text-sm">
            {post.category.name}
          </span>
          <Text asChild>
            <span className="flex items-center ml-4">
              <MdOutlineModeComment className="mr-1 size-4" />{" "}
              {post.comments?.length || 0}
            </span>
          </Text>
          <Text asChild>
            <span className="flex items-center ml-4">
              <MdArrowUpward className="mr-1 size-4" /> {post.totalUpvotes}
            </span>
          </Text>
        </footer>
      </Card>
    </Link>
  );
}
