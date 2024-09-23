import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { NewPostProvider } from "../containers/NewOrEditPost/contexts/NewPostContext";
import { NewPostDetailsCard } from "../containers/NewOrEditPost/components/NewPostDetailsCard";
import { NewPostEditor } from "../containers/NewOrEditPost/components/NewPostEditor";

export function NewPost() {
  return (
    <NewPostProvider>
      <Content.Root>
        <Content.Sidebar>
          <NavigationCard />
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
