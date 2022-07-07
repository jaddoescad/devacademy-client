import { Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { deleteArticle } from "src/services/firestore";
import PopoverDeleteForm from "./deleteForm";

interface ArticleSubHeaderProps {
  lessonId: string;
  courseId: string;
}

export const ArticleSubHeader: React.FC<ArticleSubHeaderProps> = ({
  lessonId,
  courseId,
}) => {
  const router = useRouter();
  const [keepFocus, setKeepFocus] = React.useState(false);
  // const [deleteArticle] = useDeleteArticleMutation();
  return (
    <Box>
      <Button
        onClick={() => {
          router.push({
            pathname: `/course-creation-platform/${courseId}/article-editor/${lessonId}`,
          });
        }}
      >
        Preview Article
      </Button>
      <PopoverDeleteForm
                    elementType="article"
                    lessonId={lessonId}
                    courseId={courseId}
                    setKeepFocus={setKeepFocus}
                    actionComponent={<FiTrash />}
      />
      {/* <Button
        onClick={() => {
          deleteArticle(lessonId, courseId)
          
        }}
      >
        Delete Article
      </Button> */}
    </Box>
  );
};

export default ArticleSubHeaderProps;
