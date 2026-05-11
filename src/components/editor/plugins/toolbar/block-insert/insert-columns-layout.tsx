
import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { InsertLayoutDialog } from "@/components/editor/plugins/layout-plugin";
import { MenuItem } from "@/components/ui/menu";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";

export function InsertColumnsLayout() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <MenuItem
      onAction={() =>
        showModal("Insert Columns Layout", (onClose) => (
          <InsertLayoutDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }
    >
      <div className="flex items-center gap-1">
        <ViewColumnsIcon />
        <span>Columns Layout</span>
      </div>
    </MenuItem>
  );
}
