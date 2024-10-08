import { GoBack } from "../../../components/ui/GoBack";
import { Heading } from "../../../components/ui/Heading";
import { TextEditor } from "../../../components/form/TextEditor";
import { FieldError } from "../../../components/form/FieldError";
import { useEditPost } from "../hooks/useEditPost";

export function EditPostEditor() {
  const { initialContent, errors, handleChangeContent } = useEditPost();
  return (
    <div className="flex flex-col space-y-6 h-[calc(var(--content-height)-var(--main-content-padding-x)-var(--main-content-padding-x))]">
      <div className="flex items-center">
        <GoBack to="/" hideText />
        <Heading size="lg" asChild>
          <h2 className="text-orange-300 ml-3">Edit post</h2>
        </Heading>
      </div>
      <FieldError message={errors["content"]} />

      <TextEditor
        markdown={initialContent}
        placeholder="Ask a question, share your thoughts, bring interesting discussions..."
        className="flex flex-col flex-1"
        onChange={handleChangeContent}
      />
    </div>
  );
}
