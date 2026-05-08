import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

import { ScissorsIcon } from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { MenuItem } from "@/components/ui/menu";

export function InsertHorizontalRule() {
  const { activeEditor } = useToolbarContext();

  return (
    <MenuItem
      onAction={() =>
        activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
      }
    >
      <div className="flex items-center gap-1">
        <ScissorsIcon className="size-4" />
        <span>Horizontal Rule</span>
      </div>
    </MenuItem>
  );
}
