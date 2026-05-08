import { useCallback, useState } from "react";

import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import { $getSelection, $isRangeSelection, type BaseSelection } from "lexical";

import { parseColor } from "@react-stately/color";
import { PaintBucketIcon } from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/editor/editor-hooks/use-update-toolbar";
import { Button } from "@/components/ui/button";
import { ColorArea } from "@/components/ui/color-area";
import { ColorField } from "@/components/ui/color-field";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  ColorSlider,
  ColorSliderTrack,
} from "@/components/ui/color-slider";
import { ColorSwatch } from "@/components/ui/color-swatch";
import { ColorThumb } from "@/components/ui/color-thumb";
import { Input } from "@/components/ui/input";
import { Popover, PopoverBody, PopoverContent } from "@/components/ui/popover";

function safeParse(value: string) {
  try {
    return parseColor(value);
  } catch {
    return parseColor("#ffffff");
  }
}

export function FontBackgroundToolbarPlugin() {
  const { activeEditor } = useToolbarContext();
  const [bgColor, setBgColor] = useState("#ffffff");

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#ffffff",
        ),
      );
    }
  };

  useUpdateToolbarHandler($updateToolbar);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        { tag: "historic" },
      );
    },
    [activeEditor],
  );

  const value = safeParse(bgColor);

  return (
    <ColorPicker
      value={value}
      onChange={(c) => {
        const next = c.toString("hexa");
        setBgColor(next);
        applyStyleText({ "background-color": next });
      }}
    >
      <Popover>
        <Button
          intent="outline"
          size="sq-sm"
          aria-label="Background color"
          data-slot="control"
          className="flex-col gap-0.5 p-1"
        >
          <PaintBucketIcon className="size-3.5" />
          <ColorSwatch className="size-auto! h-1 w-4 rounded-full" />
        </Button>
        <PopoverContent className="[--gutter:--spacing(3)]">
          <PopoverBody>
            <div className="space-y-(--gutter) py-2">
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                className="size-48"
              />
              <ColorSlider colorSpace="hsb" channel="hue">
                <ColorSliderTrack>
                  <ColorThumb />
                </ColorSliderTrack>
              </ColorSlider>
              <ColorSlider channel="alpha">
                <ColorSliderTrack>
                  <ColorThumb />
                </ColorSliderTrack>
              </ColorSlider>
              <ColorField aria-label="Background color" className="font-mono">
                <Input />
              </ColorField>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ColorPicker>
  );
}
