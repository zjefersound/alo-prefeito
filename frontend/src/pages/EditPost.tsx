import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
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
