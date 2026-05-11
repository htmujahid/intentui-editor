
import { InsertLayoutDialog } from "@/components/editor/plugins/layout-plugin";
import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

export function ColumnsLayoutPickerPlugin() {
  return new ComponentPickerOption("Columns Layout", {
    icon: <ViewColumnsIcon className="size-4" />,
    keywords: ["columns", "layout", "grid"],
    onSelect: (_, editor, showModal) =>
      showModal("Insert Columns Layout", (onClose) => (
        <InsertLayoutDialog activeEditor={editor} onClose={onClose} />
      )),
  });
}
