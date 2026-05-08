import { PlusIcon } from "lucide-react";

import { useEditorModal } from "@/components/editor/editor-hooks/use-modal";
import { Button } from "@/components/ui/button";
import { Menu, MenuContent } from "@/components/ui/menu";

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal();

  return (
    <>
      {modal}
      <Menu>
        <Button intent="outline" size="sm" className="gap-1 px-2">
          <PlusIcon className="size-4" />
          <span className="text-sm">Insert</span>
        </Button>
        <MenuContent>{children}</MenuContent>
      </Menu>
    </>
  );
}
