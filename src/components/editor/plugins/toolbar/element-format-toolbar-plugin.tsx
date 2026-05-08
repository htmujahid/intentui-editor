import { useState } from "react";

import { $isLinkNode } from "@lexical/link";
import { $findMatchingParent } from "@lexical/utils";
import {
  $isElementNode,
  $isRangeSelection,
  type BaseSelection,
  type ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  IndentDecreaseIcon,
  IndentIncreaseIcon,
} from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar";
import { getSelectedNode } from "@/components/editor/utils/get-selected-node";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

const ELEMENT_FORMAT_OPTIONS: {
  [key in Exclude<ElementFormatType, "start" | "end" | "">]: {
    icon: React.ReactNode;
    name: string;
  };
} = {
  left: {
    icon: <AlignLeftIcon className="size-4" />,
    name: "Left Align",
  },
  center: {
    icon: <AlignCenterIcon className="size-4" />,
    name: "Center Align",
  },
  right: {
    icon: <AlignRightIcon className="size-4" />,
    name: "Right Align",
  },
  justify: {
    icon: <AlignJustifyIcon className="size-4" />,
    name: "Justify Align",
  },
};

export function ElementFormatToolbarPlugin({
  separator = true,
}: {
  separator?: boolean;
}) {
  const { activeEditor } = useToolbarContext();
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left");

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      let matchingParent;
      if ($isLinkNode(parent)) {
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || "left",
      );
    }
  };

  useUpdateToolbarHandler($updateToolbar);

  return (
    <>
      <div className="flex items-center gap-0.5">
        {Object.entries(ELEMENT_FORMAT_OPTIONS).map(([value, option]) => (
          <Toggle
            key={value}
            intent="outline"
            size="sq-sm"
            aria-label={option.name}
            isSelected={elementFormat === value}
            onChange={() => {
              setElementFormat(value as ElementFormatType);
              activeEditor.dispatchCommand(
                FORMAT_ELEMENT_COMMAND,
                value as ElementFormatType,
              );
            }}
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
      {separator && <Separator orientation="vertical" className="!h-7" />}
      <div className="flex items-center gap-0.5">
        <Toggle
          intent="outline"
          size="sq-sm"
          aria-label="Outdent"
          onChange={() =>
            activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
          }
        >
          <IndentDecreaseIcon className="size-4" />
        </Toggle>
        <Toggle
          intent="outline"
          size="sq-sm"
          aria-label="Indent"
          onChange={() =>
            activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
          }
        >
          <IndentIncreaseIcon className="size-4" />
        </Toggle>
      </div>
    </>
  );
}
