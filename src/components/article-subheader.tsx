import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
// import {useDeleteArticleMutation} from "src/generated/graphql";

interface ArticleSubHeaderProps {
  lessonId: string;
  courseId: string;
}

export const ArticleSubHeader: React.FC<ArticleSubHeaderProps> = ({
  lessonId,
  courseId,
}) => {
  const router = useRouter();
  // const [deleteArticle] = useDeleteArticleMutation();
  return (
    <Box>
      <Button
        onClick={() => {
          router.push({
            pathname: `/course-creation-platform/${courseId}/${lessonId}/article-editor`,
          });
        }}
      >
        Preview Article
      </Button>
      <Button
        onClick={() => {
          // deleteArticle({
          //   variables: {
          //     lessonId,
          //   },
          //   update: (cache) => {
          //     cache.evict({ fieldName: "course" });
          //   },
          // })
        }}
      >
        Delete Article
      </Button>
    </Box>
  );
};

export default ArticleSubHeaderProps;
