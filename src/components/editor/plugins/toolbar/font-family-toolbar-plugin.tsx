import { useCallback, useState } from "react";

import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import { $getSelection, $isRangeSelection, type BaseSelection } from "lexical";

import { ChevronDownIcon, TypeIcon } from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar";
import { Button } from "@/components/ui/button";
import { Menu, MenuContent, MenuItem } from "@/components/ui/menu";

const FONT_FAMILY_OPTIONS = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Trebuchet MS",
];

export function FontFamilyToolbarPlugin() {
  const style = "font-family";
  const [fontFamily, setFontFamily] = useState("Arial");

  const { activeEditor } = useToolbarContext();

  const $updateToolbar = useCallback((selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial"),
      );
    }
  }, []);

  useUpdateToolbarHandler($updateToolbar);

  const handleClick = useCallback(
    (option: string) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
      setFontFamily(option);
    },
    [activeEditor, style],
  );

  return (
    <Menu>
      <Button
        intent="outline"
        size="sm"
        className="w-min gap-1 px-2"
        aria-label="Formatting options for font family"
      >
        <TypeIcon className="size-4" />
        <span style={{ fontFamily }}>{fontFamily}</span>
        <ChevronDownIcon className="size-3" />
      </Button>
      <MenuContent className="w-40">
        {FONT_FAMILY_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            style={{ fontFamily: option }}
            onAction={() => handleClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  );
}
