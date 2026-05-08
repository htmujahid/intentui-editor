import { Check, Terminal } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSearchParams } from "@/hooks/use-search-params";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tab, TabList, Tabs } from "./ui/tabs";

export function BlockViewerToolbar() {
  const item = {
    name: "@intentui-editor/editor-x",
    description:
      "A rich text editor built on Lexical with plugins, nodes, extensions, and toolbar support.",
  };
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const [params, setParams] = useSearchParams({ view: "preview" });
  const view = params.view as "preview" | "code";

  return (
    <div className="flex w-full shrink-0 flex-wrap items-center gap-2 pl-2">
      <Tabs
        selectedKey={view}
        onSelectionChange={(key) => setParams({ view: String(key) })}
      >
        <TabList>
          <Tab id="preview">Preview</Tab>
          <Tab id="code">Code</Tab>
        </TabList>
      </Tabs>
      <Separator
        orientation="vertical"
        className="mx-2 h-5! mt-1.5 hidden xl:block"
      />
      <span className="flex-1 text-left text-sm font-medium hidden xl:block">
        {item.description?.replace(/\.$/, "")}
      </span>
      <div className="ml-auto flex items-center gap-2">
        <Button
          intent="outline"
          size="sm"
          className="w-fit gap-1 px-2 shadow-none"
          onPress={() => {
            copyToClipboard(`npx shadcn@latest add ${item.name}`);
          }}
        >
          {isCopied ? <Check /> : <Terminal />}
          <span>npx shadcn add {item.name}</span>
        </Button>
      </div>
    </div>
  );
}
