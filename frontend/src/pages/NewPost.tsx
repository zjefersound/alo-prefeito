import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { NewPostProvider } from "../containers/NewOrEditPost/contexts/NewPostContext";
import { NewPostDetailsCard } from "../containers/NewOrEditPost/components/NewPostDetailsCard";
import { NewPostEditor } from "../containers/NewOrEditPost/components/NewPostEditor";

export function NewPost() {
  return (
    <NewPostProvider>
      <Content.Root>
        <Content.Sidebar>
          <NavigationCard />
          <PopularItemCard
            title="Popular categories"
            path="/categories"
            items={[
              { id: 2, label: "Issue", totalPosts: 286 },
              { id: 3, label: "Discussion", totalPosts: 233 },
              { id: 4, label: "Feedback", totalPosts: 211 },
              { id: 5, label: "Debate", totalPosts: 173 },
              { id: 6, label: "Tutorials", totalPosts: 163 },
            ]}
          />
        </Content.Sidebar>
        <Content.Main>
          <NewPostEditor />
        </Content.Main>
        <Content.Sidebar>
          <NewPostDetailsCard />
        </Content.Sidebar>
      </Content.Root>
    </NewPostProvider>
  );
}
