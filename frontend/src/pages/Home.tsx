import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { TrendingPosts } from "../components/shared/TrendingPosts";
import { HomeContent } from "../containers/HomeContent";

export function Home() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
      </Content.Sidebar>
      <Content.Main>
        <HomeContent />
      </Content.Main>
      <Content.Sidebar>
        <TrendingPosts />
      </Content.Sidebar>
    </Content.Root>
  );
}
