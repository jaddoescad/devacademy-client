import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { atomOneLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import gfm from "remark-gfm";
import { uploadImageToFirebase } from "src/services/firStorage";

const Editor = dynamic(() => import("./WrappedEditor.js"), {
  ssr: false,
});

const ForwardRefEditor = forwardRef((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

ForwardRefEditor.displayName = "Editor"

const CreateReactEditor = (props) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const courseId = router.query.courseCreated;

  useEffect(() => {
    // setValue(props.editorStateReducer?.[props.articleIdToEdit])
    //get editor from postgres
  }, []);

  const handleEditorChange = ({ html, text }) => {
    var newValue = text;

    if (text.substring(0, 2) !== "# ") {
      if (text[0] == "#") {
        newValue = newValue.slice(0, 1) + " " + newValue.substring(1);
        props.setValue(newValue);
        setTimeout(() => {
          editorRef.current.setSelection({ start: 2, end: 2 });
        }, 0);
      } else {
        newValue = "# " + newValue;
        props.setValue(newValue);
        setTimeout(() => {
          editorRef.current.setSelection({ start: 2, end: 2 });
        }, 0);
      }
    } else {
      props.setValue(newValue);
    }

    props.reset();
    // props.dispatch(saveEditorsState(props.articleIdToEdit, courseId, newValue))
    props.setEditorChange("Not Saved");
    // props.dispatch(updateEditor([props.articleIdToEdit], newValue))
  };

  const onImageUpload = (file) => {
    return new Promise((resolve) => {
      // const storage = firebaseApp.storage()
      const reader = new FileReader();
      reader.onload = (data) => {
        // const storageRef = storage.ref()
        // var userRef = storageRef.child('images').child(uuidv4())
        uploadImageToFirebase(file, "editor-images").then((downloadURL) => {
          if (!downloadURL) return;
          resolve(downloadURL);
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          customStyle={{ background: "#f5f5f5" }}
          style={atomOneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >{String(children).replace(/\n$/, "")}</SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {String(children).replace(/\n$/, "")}
        </code>
      );
    },
  };

  return (
      <ForwardRefEditor
        style={{ height: "90vh", width: "100%" }}
        value={props.value}
        ref={editorRef}
        renderHTML={(text) => (
          <ReactMarkdown
            components={components}
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[gfm, remarkMath]}
          >
          text
          </ReactMarkdown>
        )}
        placeholder="Start typing here..."
        onImageUpload={onImageUpload}
        onChange={handleEditorChange}
      />
  );
};

export default CreateReactEditor;
