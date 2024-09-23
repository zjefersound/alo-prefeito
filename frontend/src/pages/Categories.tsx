import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { mockedPosts } from "../examples/mocks/mocks";
import { PostCard } from "../components/shared/PostCard";
import { SmallTabs } from "../components/ui/SmallTabs";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ContentSkeleton } from "../components/ui/ContentSkeleton";
import { useCategories } from "../hooks/useCategories";

export function Categories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isPending, categories } = useCategories();
  if (isPending) return <ContentSkeleton />;
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex flex-col space-y-6">
          <SmallTabs
            value={id ?? ""}
            onChange={(value) => navigate("/categories/" + value)}
            options={categories.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
          />
          <div className="flex justify-between items-center">
            <span>34 Posts</span>
            <ButtonGroup
              value={searchParams.get("order") ?? "relevance"}
              onChange={(value) =>
                navigate({
                  search: createSearchParams({
                    order: value,
                  }).toString(),
                })
              }
              options={[
                { label: "Relevance", value: "relevance" },
                { label: "Newest", value: "newest" },
              ]}
            />
          </div>
          {mockedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Content.Main>
    </Content.Root>
  );
}
