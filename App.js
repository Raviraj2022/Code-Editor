import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import LocalStorage from "../hooks/LocalStorage";
export default function App() {
  const [html, setHtml] = LocalStorage("html", "");
  const [css, setCss] = LocalStorage("css", "");
  const [js, setJs] = LocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
  <body>
  ${html}
  </body>
  <style>${css}</style>
  <script>${js}</script>
  </html>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="Pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}
