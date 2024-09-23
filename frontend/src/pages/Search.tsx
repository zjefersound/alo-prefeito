import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { mockedPosts } from "../examples/mocks/mocks";
import { PostCard } from "../components/shared/PostCard";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("text");
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex flex-col space-y-6">
          {query && (
            <div>
              Showing results for "<strong>{query}</strong>"
            </div>
          )}
          <div className="flex justify-between items-center">
            <span>34 Posts</span>
            <ButtonGroup
              value={searchParams.get("order") ?? "relevance"}
              onChange={(value) =>
                navigate({
                  search: createSearchParams({
                    order: value,
                    text: query ?? "",
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
