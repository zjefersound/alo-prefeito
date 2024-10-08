import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { NewIncidentProvider } from "../containers/incident/contexts/NewIncidentContext";
import { NewIncidentDetailsCard } from "../containers/incident/components/NewIncidentDetailsCard";
import { NewIncidentEditor } from "../containers/incident/components/NewIncidentEditor";
import { NewIncidentLocationPicker } from "../containers/incident/components/NewIncidentLocationPicker";

export function NewIncident() {
  return (
    <NewIncidentProvider>
      <Content.Root>
        <Content.Sidebar>
          <NavigationCard />
        </Content.Sidebar>
        <Content.Main>
          <NewIncidentEditor />
          <NewIncidentLocationPicker />
        </Content.Main>
        <Content.Sidebar>
          <NewIncidentDetailsCard />
        </Content.Sidebar>
      </Content.Root>
    </NewIncidentProvider>
  );
}
