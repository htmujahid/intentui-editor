import { useState } from "react";

import { $isTableSelection } from "@lexical/table";
import {
  $isRangeSelection,
  type BaseSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";

import { SubscriptIcon, SuperscriptIcon } from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar";
import { Toggle } from "@/components/ui/toggle";

export function SubSuperToolbarPlugin() {
  const { activeEditor } = useToolbarContext();
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
    }
  };

  useUpdateToolbarHandler($updateToolbar);

  return (
    <div className="flex items-center gap-0.5">
      <Toggle
        intent="outline"
        size="sq-sm"
        aria-label="Toggle subscript"
        isSelected={isSubscript}
        onChange={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        }}
      >
        <SubscriptIcon className="size-4" />
      </Toggle>
      <Toggle
        intent="outline"
        size="sq-sm"
        aria-label="Toggle superscript"
        isSelected={isSuperscript}
        onChange={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        }}
      >
        <SuperscriptIcon className="size-4" />
      </Toggle>
    </div>
  );
}
