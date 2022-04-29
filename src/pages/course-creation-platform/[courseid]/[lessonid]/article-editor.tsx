import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateReactEditor from "src/components/react-editor";
import { useSetArticleTextMutation } from "src/generated/graphql";
import { withApollo } from "../../../../utils/withApollo";
import { useGetLessonQuery } from "src/generated/graphql";

interface ArticleEditorProps {}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editorChange, setEditorChange] = useState("saved");
  const [value, setValue] = React.useState("");
  const [setArticleText] = useSetArticleTextMutation();
  const router = useRouter();

  const { data, error, loading, fetchMore, variables } = useGetLessonQuery({
    variables: {
      lessonId:
        typeof router.query.lessonid === "string" ? router.query.lessonid : "",
    },
  });

  useEffect(() => {
    if (data && data.lesson && data.lesson.articleText) {
      setValue(data.lesson.articleText);
    }
  }, [data]);

  function reset() {
    setSeconds(0);
    setIsActive(true);
  }

  function toggle() {
    setIsActive(false);
  }

  const _setArticleText = async (articleid: string, value: string) => {
    await setArticleText({
      variables: {
        lessonId: articleid,
        articleText: value,
      },
      update: (cache) => {
        cache.evict({ fieldName: "course" });
      }
    })
      .then(() => {
        setEditorChange("saved");
      })
      .catch(() => {
        setEditorChange("error");
      });
  };

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
              _setArticleText(router.query.lessonid, value);
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
      <Box color={"white"}>{editorChange}</Box>
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
