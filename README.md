# intentui-editor

A visual builder for a feature-rich [Lexical](https://lexical.dev) editor that generates production-ready React + TypeScript code.

## Overview

intentui-editor is a configurator: toggle features in the left sidebar, see the editor update live, then switch to the **Code** view to copy a self-contained TSX component you can drop into your own project. The editor itself is built on Lexical (Meta's text editor framework) and styled with [intentui](https://intentui.com) components on top of [Tailwind CSS](https://tailwindcss.com) v4.

## Features

**Toolbar**
- Block formats: paragraph, h1–h3, numbered/bulleted/check lists, quote, code block
- Inline: bold, italic, underline, strikethrough, sub/superscript, code
- Font family, font size, font color, background color
- Element/text alignment, link insertion, clear formatting
- Block insert: divider, image, table, columns, embeds (Twitter, YouTube)
- Undo/redo with history

**Footer actions**
- Character count, speech-to-text, share, import/export
- Markdown toggle, view-only mode, clear editor, tree view

**Plugins**
- Slash command picker, emoji picker, @mentions
- Draggable blocks, autocomplete, autolink
- Floating text and link toolbars, context menu
- Auto-embed (Twitter, YouTube), tab indentation

**Content types**
- Images (paste & drop), tables, multi-column layouts
- Code blocks with [Shiki](https://shiki.style) syntax highlighting
- Date/time elements, mentions, emojis, hashtags

**Code generation**
- Each sidebar toggle maps to a spec (imports, extensions, nodes, plugins, JSX)
- Specs are merged and deduplicated into one TSX file rendered with Shiki

**Accessibility & theming**
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/) primitives throughout
- Dark / light / system theme — press `d` to toggle

## Tech stack

- React 19, TypeScript, Vite
- Lexical (`@lexical/code`, `list`, `table`, `markdown`, `link`, `history`, `file`, `hashtag`)
- Tailwind CSS v4 + intentui / shadcn-style components
- React Aria Components
- Shiki, Recharts, Motion, Sonner, Embla Carousel, date-fns, Lucide icons

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server runs at <http://localhost:5173>.

### Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `pnpm dev`      | Vite dev server with HMR                 |
| `pnpm build`    | Type-check (`tsc -b`) + production build |
| `pnpm lint`     | Run ESLint                               |
| `pnpm preview`  | Preview the production build locally     |

## Project structure

```
src/
├── App.tsx                              # Top-level layout (sidebar + viewer + toolbar)
├── main.tsx                             # React entry point
├── components/
│   ├── block-viewer-provider.tsx        # State for the configurator
│   ├── block-viewer-sidebar.tsx         # Feature toggles
│   ├── block-viewer-toolbar.tsx         # Preview/Code switcher
│   ├── code-viewer.tsx                  # Code view (Shiki)
│   ├── theme-provider.tsx               # Dark/light/system theme
│   ├── blocks/
│   │   └── editor-x.tsx                 # The full editor block rendered in the preview
│   ├── editor/                          # Lexical extensions, nodes, plugins, themes, transformers
│   └── ui/                              # intentui / shadcn-style components
├── hooks/
└── lib/
    ├── editor-feature-registry.ts       # Maps sidebar toggles → code artifacts
    ├── generate-editor-code.ts          # Assembles the generated TSX component
    └── highlight-code.ts                # Shiki-based highlighting
```

## How code generation works

Sidebar state is held in `BlockViewerProvider`. Each toggle resolves to a spec in `src/lib/editor-feature-registry.ts` describing the imports, extensions, nodes, plugins, and JSX it needs. `src/lib/generate-editor-code.ts` merges those specs — deduplicating imports and ordering them (external packages before internal `@/` paths) — into one self-contained component. The Code view in the toolbar renders that source with Shiki so you can copy it straight into your own project.

## Contributing

Issues and pull requests are welcome.

## License

TBD.
