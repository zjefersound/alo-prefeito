import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorProps,
  tablePlugin,
  imagePlugin,
  linkPlugin,
  linkDialogPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
  InsertTable,
} from "@mdxeditor/editor";
import clsx from "clsx";
import { memo } from "react";

function TextEditor({ className, ...props }: MDXEditorProps) {
  return (
    <div
      className={clsx(
        "overflow-auto bg-agorium-800 ring-1 ring-agorium-700 rounded-md",
        className,
      )}
    >
      <MDXEditor
        className="markdown dark-theme dark-editor h-full w-full cm-s-dracula"
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CreateLink />
                <InsertTable />
              </>
            ),
          }),
          markdownShortcutPlugin(),
        ]}
        {...props}
      />
    </div>
  );
}

const MemoizedTextEditor = memo(TextEditor);
export { MemoizedTextEditor as TextEditor };
