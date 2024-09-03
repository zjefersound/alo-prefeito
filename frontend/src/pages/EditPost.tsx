import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { EditPostProvider } from "../containers/NewOrEditPost/contexts/EditPostContext";
import { EditPostDetailsCard } from "../containers/NewOrEditPost/components/EditPostDetailsCard";
import { EditPostEditor } from "../containers/NewOrEditPost/components/EditPostEditor";
import { DeletePostCard } from "../containers/NewOrEditPost/components/DeletePostCard";

export function EditPost() {
  return (
    <EditPostProvider>
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
          <EditPostEditor />
        </Content.Main>
        <Content.Sidebar>
          <EditPostDetailsCard />
          <DeletePostCard />
        </Content.Sidebar>
      </Content.Root>
    </EditPostProvider>
  );
}
