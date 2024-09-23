import { Link, useParams } from "react-router-dom";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { mockedPosts } from "../examples/mocks/mocks";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { formatDistance } from "date-fns";
import { Text } from "../components/ui/Text";
import { Heading } from "../components/ui/Heading";
import { Button } from "../components/ui/Button";
import {
  MdArrowUpward,
  MdOutlineEdit,
  MdOutlineModeComment,
  MdOutlineShare,
} from "react-icons/md";
import { CommentCard } from "../components/shared/CommentCard";
import { GoBack } from "../components/ui/GoBack";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useMemo } from "react";
import { useToast } from "../hooks/useToast";
import { Empty } from "../components/ui/Empty";
import { MarkdownPreview } from "../components/ui/MarkdownPreview";

export function Post() {
  const { launchToast } = useToast();
  const { user } = useAuth();
  const { id } = useParams();
  const post = mockedPosts.find((p) => String(p.id) === id) || mockedPosts[0];

  const isAuthor = useMemo(() => user!.id === post.user.id, [user, post]);
  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    launchToast({
      color: "info",
      title: "Copied to clipboard",
      description: `Copied post link to your clipboard`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
      </Content.Sidebar>
      <Content.Main>
        <GoBack to="/" />
        <Card className="space-y-6">
          <header className="flex">
            <Avatar name={post.user.name} />
            <div className="flex flex-col ml-4">
              <span>{post.user.email}</span>
              <Text size="sm" asChild>
                <span className="tracking-wider">
                  {formatDistance(new Date(post.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </Text>
            </div>
            {isAuthor && (
              <Link to={`/incident/${post.id}/edit`} className="ml-auto">
                <Button color="secondary" size="sm">
                  <MdOutlineEdit className="size-5 mr-2" />
                  Edit
                </Button>
              </Link>
            )}
          </header>
          <div>
            <span className="text-orange-300 font-semibold text-sm">
              {post.category.name}
            </span>
            <Heading size="xs" asChild>
              <h2 className="tracking-wider">{post.title}</h2>
            </Heading>
          </div>
          <MarkdownPreview>{post.content}</MarkdownPreview>
          <div className="flex space-x-3">
            <Button color={post.voted ? "primary" : "secondary"} size="sm">
              <MdArrowUpward className="size-5 mr-2" />
              {post.totalUpvotes}
            </Button>
            <Button color="secondary" size="sm">
              <MdOutlineModeComment className="size-5 mr-2" />
              {post.comments?.length || 0}
            </Button>
            <Button color="secondary" size="sm" onClick={handleShare}>
              <MdOutlineShare className="size-5 mr-2" />
              Share
            </Button>
          </div>
        </Card>
        <span id="comments-count" className="block">
          {post.comments?.length || 0} comment(s)
        </span>
        {!post.comments?.length && (
          <Empty>
            <p className="to-orange-300 font-bold mb-3 text-center">
              No comments were found
            </p>
            <Text asChild>
              <span className="text-center">
                Be the first to share your thoughts
              </span>
            </Text>
          </Empty>
        )}
        {post.comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            favorite={comment.id === post.favoriteCommentId}
            comment={comment}
            isPostAuthor={isAuthor}
          />
        ))}
      </Content.Main>
      <Content.Sidebar>
        <SimpleUserCard
          name={post.user.name}
          email={post.user.email}
          rankingPosition={12}
          totalPosts={32}
          totalUpvotes={642123}
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
