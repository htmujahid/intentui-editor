import {
  BlockViewerProvider,
  useBlockViewer,
} from "@/components/block-viewer-provider";
import { BlockViewerSidebar } from "@/components/block-viewer-sidebar";
import { BlockViewerToolbar } from "@/components/block-viewer-toolbar";
import { Editor } from "@/components/blocks/editor-x";
import { CodeViewer } from "@/components/code-viewer";
import { useSearchParams } from "@/hooks/use-search-params";
import { generateEditorCode } from "@/lib/generate-editor-code";

function EditorPanel() {
  const state = useBlockViewer();
  const [params] = useSearchParams({ view: "preview" });
  const view = (params.view as "preview" | "code") ?? "preview";

  if (view === "code") {
    return (
      <CodeViewer
        code={generateEditorCode(state)}
        language="tsx"
        filename="editor-x.tsx"
      />
    );
  }
  return <Editor />;
}

function App() {
  return (
    <BlockViewerProvider>
      <main className="mx-auto grid h-svh max-w-screen-2xl grid-cols-[280px_1fr] gap-4 overflow-hidden p-4">
        <BlockViewerSidebar />
        <div className="flex min-h-0 min-w-0 flex-col gap-3">
          <BlockViewerToolbar />
          <div className="min-h-0 flex-1">
            <EditorPanel />
          </div>
        </div>
      </main>
    </BlockViewerProvider>
  );
}

export default App;
