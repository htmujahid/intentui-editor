import { ImageIcon } from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { InsertImageDialog } from "@/components/editor/extensions/images-extension";
import { MenuItem } from "@/components/ui/menu";

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <MenuItem
      onAction={() => {
        showModal("Insert Image", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ));
      }}
    >
      <div className="flex items-center gap-1">
        <ImageIcon className="size-4" />
        <span>Image</span>
      </div>
    </MenuItem>
  );
}
