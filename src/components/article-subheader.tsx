import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface ArticleSubHeaderProps {
  lessonId: string;
  courseId: string;
}

export const ArticleSubHeader: React.FC<ArticleSubHeaderProps> = ({
  lessonId,
  courseId,
}) => {
  const router = useRouter();
  return (
    <Box>
      <Button
        onClick={() => {
          router.push(
            {
              pathname: "/article-editor",
              query: {
                lessonId: lessonId,
                courseId: courseId,
              },
            },
            "/article-editor",
            { shallow: true }
          );
        }}
      >
        Preview Article
      </Button>
    </Box>
  );
};

export default ArticleSubHeaderProps;
