import { Fragment } from "react";

/** Renders editable copy: new lines become line breaks, *words* become accented italics. */
export function RichText({ text, accentClassName }: { text: string; accentClassName?: string | undefined }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
              <em key={j} className={accentClassName}>{part.slice(1, -1)}</em>
            ) : (
              <Fragment key={j}>{part.replace(/\*/g, "")}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}

/** Plain version for places that cannot hold markup, such as page titles. */
export function plainText(text: string) {
  return text.replace(/\*/g, "").replace(/\s*\n\s*/g, " ").trim();
}
