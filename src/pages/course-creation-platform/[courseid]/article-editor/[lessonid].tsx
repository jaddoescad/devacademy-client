import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateReactEditor from "src/components/react-editor";
// import { useSetArticleTextMutation } from "src/generated/graphql";
import { withApollo } from "../../../../utils/withApollo";
// import { useGetLessonQuery } from "src/generated/graphql";
import { getArticle, saveArticle } from "src/services/firestore";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";

interface ArticleEditorProps {}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editorChange, setEditorChange] = useState("saved");
  const [value, setValue] = React.useState("");
  // const [setArticleText] = useSetArticleTextMutation();
  const router = useRouter();
  const articleId = router.query.lessonid;

  function reset() {
    setSeconds(0);
    setIsActive(true);
  }

  function toggle() {
    setIsActive(false);
  }

  const _setArticleText = async (articleid: string, value: string) => {
    if (typeof router?.query?.courseid === "string") {
      await saveArticle(router.query.courseid, articleid, value);
      setEditorChange("Saved");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getArticle(router.query.courseid, router.query.lessonid).then(
        (snapshot) => {
          setValue(
            snapshot.data()?.[router.query.lessonid as string]?.["articleText"]
          );
        }
      );
    }
  }, [router.isReady]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 1) {
          if (
            editorChange === "Not Saved" &&
            typeof router?.query?.lessonid === "string"
          ) {
            if (navigator.onLine) {
              setEditorChange("Saving...");
              toggle();
              if (typeof router.query.lessonid === "string") {
                _setArticleText(router.query.lessonid, value);
              }
            }
          }
        }
        setSeconds((seconds) => seconds + 1);
      }, 500);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      <InstructorNavigation editorChange={editorChange} />
      <div
        style={{
          paddingLeft: 0,
          backgroundColor: "white",
          width: "100%",
          // height: "100vh",
        }}
      >
        <CreateReactEditor
          reset={reset}
          setEditorChange={setEditorChange}
          setValue={setValue}
          value={value}
        />
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(ArticleEditor);
