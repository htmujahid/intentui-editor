import { TableCellsIcon } from "@heroicons/react/24/outline";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { InsertTableDialog } from "@/components/editor/plugins/table-plugin";
import { MenuItem } from "@/components/ui/menu";

export function InsertTable() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <MenuItem
      onAction={() =>
        showModal("Insert Table", (onClose) => (
          <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }
    >
      <div className="flex items-center gap-1">
        <TableCellsIcon className="size-4" />
        <span>Table</span>
      </div>
    </MenuItem>
  );
}
