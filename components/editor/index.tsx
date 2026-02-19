"use client";
// InitializedMDXEditor.tsx
import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  imagePlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { basicDark } from "cm6-theme-basic-dark";
import "./dark-editor.css";
import { useTheme } from "next-themes";
import { Separator } from "@radix-ui/react-dropdown-menu";
import css from "styled-jsx/css";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, fieldChange, editorRef, ...props }: Props) => {
  const { resolvedTheme } = useTheme(); // Get the current theme (light or dark)

  const theme = resolvedTheme === "dark" ? [basicDark] : []; // Apply dark theme extension only in dark mode

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border"
      onChange={fieldChange}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            "": "Plain Text",
            css: "css",
            javascript: "Javascript (React)",
            typescript: "Typescript (React)",
            python: "python",
            java: "java",
            csharp: "csharp",
            cpp: "cpp",
            ruby: "ruby",
            go: "go",
            php: "php",
            rust: "rust",
            swift: "swift",
            kotlin: "kotlin",
            html: "html",
            markdown: "markdown",
            json: "json",
            yaml: "yaml",
            bash: "bash",
            sql: "sql",
            saas: "saas",
            txt: "txt",
            scss: "scss",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        quotePlugin(),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
};

export default Editor;
