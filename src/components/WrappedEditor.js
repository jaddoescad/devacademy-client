import React from "react";
import Editor from "react-markdown-editor-lite";
import { Plugins } from "react-markdown-editor-lite";


export const FullScreen = Plugins.FullScreen
export const Clear = Plugins.Clear
export const TabInsert = Plugins.TabInsert

export default function WrappedEditor({ editorRef, ...props }) {
    Editor.unuse(FullScreen);
    Editor.unuse(Clear);
    Editor.use(TabInsert, {tabMapValue: 1});
    
  return <Editor {...props} ref={editorRef} />;
}