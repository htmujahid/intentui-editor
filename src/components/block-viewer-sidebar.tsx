import { Checkbox } from "@/components/ui/checkbox";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure-group";

import {
  BLOCK_FORMAT_ITEM_LABELS,
  BLOCK_INSERT_ITEM_LABELS,
  type BlockFormatItemKey,
  type BlockInsertItemKey,
  COMPONENT_PICKER_ITEM_LABELS,
  type ComponentPickerItemKey,
  FOOTER_ITEM_LABELS,
  type FooterItemKey,
  PLUGIN_ITEM_LABELS,
  type PluginItemKey,
  TOOLBAR_ITEM_LABELS,
  type ToolbarItemKey,
  useBlockViewer,
} from "./block-viewer-provider";

function enabledLabel(enabled: number, total: number) {
  return enabled === total ? "All enabled" : `${enabled} of ${total} enabled`;
}

function SectionHeader({
  title,
  enabled,
  total,
}: {
  title: string;
  enabled: number;
  total: number;
}) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <span className="font-medium">{title}</span>
      <span className="text-xs text-muted-fg">
        {enabledLabel(enabled, total)}
      </span>
    </div>
  );
}

function ToolbarSection() {
  const { toolbarItems, toggleToolbarItem } = useBlockViewer();
  const allKeys = Object.keys(TOOLBAR_ITEM_LABELS) as ToolbarItemKey[];
  const enabled = allKeys.filter((k) => toolbarItems[k]).length;

  return (
    <Disclosure id="toolbar">
      <DisclosureTrigger>
        <SectionHeader title="Toolbar" enabled={enabled} total={allKeys.length} />
      </DisclosureTrigger>
      <DisclosurePanel>
        <div className="flex flex-col gap-2">
          {allKeys.map((key) => (
            <Checkbox
              key={key}
              isSelected={toolbarItems[key]}
              onChange={() => toggleToolbarItem(key)}
            >
              {TOOLBAR_ITEM_LABELS[key]}
            </Checkbox>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

function BlockFormatSection() {
  const { blockFormatItems, toggleBlockFormatItem } = useBlockViewer();
  const allKeys = Object.keys(BLOCK_FORMAT_ITEM_LABELS) as BlockFormatItemKey[];
  const enabled = allKeys.filter((k) => blockFormatItems[k]).length;

  return (
    <Disclosure id="block-format">
      <DisclosureTrigger>
        <SectionHeader
          title="Block Format"
          enabled={enabled}
          total={allKeys.length}
        />
      </DisclosureTrigger>
      <DisclosurePanel>
        <div className="flex flex-col gap-2">
          {allKeys.map((key) => (
            <Checkbox
              key={key}
              isSelected={blockFormatItems[key]}
              onChange={() => toggleBlockFormatItem(key)}
            >
              {BLOCK_FORMAT_ITEM_LABELS[key]}
            </Checkbox>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

function BlockInsertSection() {
  const { blockInsertItems, toggleBlockInsertItem } = useBlockViewer();
  const allKeys = Object.keys(BLOCK_INSERT_ITEM_LABELS) as BlockInsertItemKey[];
  const enabled = allKeys.filter((k) => blockInsertItems[k]).length;

  return (
    <Disclosure id="block-insert">
      <DisclosureTrigger>
        <SectionHeader
          title="Block Insert"
          enabled={enabled}
          total={allKeys.length}
        />
      </DisclosureTrigger>
      <DisclosurePanel>
        <div className="flex flex-col gap-2">
          {allKeys.map((key) => (
            <Checkbox
              key={key}
              isSelected={blockInsertItems[key]}
              onChange={() => toggleBlockInsertItem(key)}
            >
              {BLOCK_INSERT_ITEM_LABELS[key]}
            </Checkbox>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

function FooterSection() {
  const { footerItems, toggleFooterItem } = useBlockViewer();
  const allKeys = Object.keys(FOOTER_ITEM_LABELS) as FooterItemKey[];
  const enabled = allKeys.filter((k) => footerItems[k]).length;

  return (
    <Disclosure id="footer">
      <DisclosureTrigger>
        <SectionHeader title="Footer" enabled={enabled} total={allKeys.length} />
      </DisclosureTrigger>
      <DisclosurePanel>
        <div className="flex flex-col gap-2">
          {allKeys.map((key) => (
            <Checkbox
              key={key}
              isSelected={footerItems[key]}
              onChange={() => toggleFooterItem(key)}
            >
              {FOOTER_ITEM_LABELS[key]}
            </Checkbox>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

function ComponentPickerSection() {
  const { componentPickerItems, toggleComponentPickerItem } = useBlockViewer();
  const allKeys = Object.keys(
    COMPONENT_PICKER_ITEM_LABELS,
  ) as ComponentPickerItemKey[];
  const enabled = allKeys.filter((k) => componentPickerItems[k]).length;

  return (
    <Disclosure id="component-picker">
      <DisclosureTrigger>
        <SectionHeader
          title="Component Picker"
          enabled={enabled}
          total={allKeys.length}
        />
      </DisclosureTrigger>
      <DisclosurePanel>
        <div className="flex flex-col gap-2">
          {allKeys.map((key) => (
            <Checkbox
              key={key}
              isSelected={componentPickerItems[key]}
              onChange={() => toggleComponentPickerItem(key)}
            >
              {COMPONENT_PICKER_ITEM_LABELS[key]}
            </Checkbox>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

function MiscSection() {
  const { pluginItems, togglePluginItem } = useBlockViewer();
  const allKeys = Object.keys(PLUGIN_ITEM_LABELS) as PluginItemKey[];
  const enabled = allKeys.filter((k) => pluginItems[k]).length;

  return (
    <Disclosure id="misc">
      <DisclosureTrigger>
        <SectionHeader title="Misc" enabled={enabled} total={allKeys.length} />
      </DisclosureTrigger>
      <DisclosurePanel>
        <div className="flex flex-col gap-2">
          {allKeys.map((key) => (
            <Checkbox
              key={key}
              isSelected={pluginItems[key]}
              onChange={() => togglePluginItem(key)}
            >
              {PLUGIN_ITEM_LABELS[key]}
            </Checkbox>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export function BlockViewerSidebar() {
  return (
    <aside className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto rounded-xl border border-border bg-bg p-4 text-sm">
      <h2 className="text-base font-semibold">Customize</h2>
      <DisclosureGroup>
        <ToolbarSection />
        <BlockFormatSection />
        <BlockInsertSection />
        <ComponentPickerSection />
        <MiscSection />
        <FooterSection />
      </DisclosureGroup>
    </aside>
  );
}
