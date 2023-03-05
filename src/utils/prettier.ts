import type { format } from "prettier";
import type { default as parserBabel } from "prettier/parser-babel";
import type { default as parserHtml } from "prettier/parser-html";
import type { default as parserPostcss } from "prettier/parser-postcss";
import type { default as parserTypescript } from "prettier/parser-typescript";

let prettier:
  | [
      typeof format,
      typeof parserHtml,
      typeof parserTypescript,
      typeof parserBabel,
      typeof parserPostcss,
    ]
  | undefined;

const loadPrettier = async () => {
  if (!prettier) {
    prettier = await Promise.all([
      // @ts-ignore xxx
      import("prettier/standalone.js").then((r) => r.default.format),
      // @ts-ignore xxx
      import("prettier/esm/parser-html.mjs").then((r) => r.default),
      // @ts-ignore xxx
      import("prettier/esm/parser-typescript.mjs").then((r) => r.default),
      // @ts-ignore xxx
      import("prettier/esm/parser-babel.mjs").then((r) => r.default),
      // @ts-ignore xxx
      import("prettier/esm/parser-postcss.mjs").then((r) => r.default),
    ]);
  }
  return prettier;
};

export const prettierFormat = async (content: string) => {
  const [format, parserHtml, parserTypeScript, parserBabel, parserPostcss] = await loadPrettier();

  return format(content, {
    parser: "vue",
    plugins: [parserHtml, parserTypeScript, parserBabel, parserPostcss],
    semi: false,
    singleQuote: true,
  });
};
