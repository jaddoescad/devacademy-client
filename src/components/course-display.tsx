import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
// import MarkdownIt from 'markdown-it'
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import {
  atelierCaveLight,
  atelierLakesideLight,
  codepenEmbed,
  monoBlue,
  nightOwl,
  ocean,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";

const gfm = require("remark-gfm");

interface CourseDisplayProps {
  textContent: string;
}

export const CourseDisplay: React.FC<CourseDisplayProps> = ({
  textContent,
}) => {
  const [value, setValue] = useState(textContent ? textContent : "");

  useEffect(() => {
    if (textContent) {
      setValue(textContent);
    } else {
      setValue("");
    }
  }, [textContent]);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          customStyle={{ background: "#f5f5f5" }}
          style={atomOneLight}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {String(children).replace(/\n$/, "")}
        </code>
      );
    },
  };
  return (
    <div className="custom-html-style" style={{ paddingBottom: "30px" }}>
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[gfm, remarkMath]}
        children={value}
      />
    </div>
  );
};

export default CourseDisplay;
