import { exportFile, importFile } from "@lexical/file";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { DownloadIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";

export function ImportExportPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <Tooltip>
        <Button
          intent="plain"
          size="sq-sm"
          onPress={() => importFile(editor)}
          aria-label="Import editor state from JSON"
        >
          <UploadIcon className="size-4" />
        </Button>
        <TooltipContent>Import Content</TooltipContent>
      </Tooltip>

      <Tooltip>
        <Button
          intent="plain"
          size="sq-sm"
          onPress={() =>
            exportFile(editor, {
              fileName: `Editor ${new Date().toISOString()}`,
              source: "Editor",
            })
          }
          aria-label="Export editor state to JSON"
        >
          <DownloadIcon className="size-4" />
        </Button>
        <TooltipContent>Export Content</TooltipContent>
      </Tooltip>
    </>
  );
}
