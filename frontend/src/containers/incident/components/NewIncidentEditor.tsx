import { GoBack } from "../../../components/ui/GoBack";
import { Heading } from "../../../components/ui/Heading";
import { TextEditor } from "../../../components/form/TextEditor";
import { FieldError } from "../../../components/form/FieldError";
import { useNewIncident } from "../hooks/useNewIncident";

export function NewIncidentEditor() {
  const { initialContent, errors, handleChangeContent } = useNewIncident();
  return (
    <div className="flex flex-col space-y-6 ">
      <div className="flex items-center">
        <GoBack to="/" hideText />
        <Heading size="lg" asChild>
          <h2 className="text-orange-300 ml-3">Novo incidente</h2>
        </Heading>
      </div>
      <FieldError message={errors["content"]} />

      <TextEditor
        markdown={initialContent}
        placeholder="Relate seu problema e ajude a melhorar sua cidade"
        className="flex flex-col flex-1 max-h-[400px]"
        onChange={handleChangeContent}
      />
    </div>
  );
}
