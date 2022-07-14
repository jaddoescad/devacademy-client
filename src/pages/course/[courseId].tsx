import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CourseBody } from "src/components/course-body";
import { withApollo } from "src/utils/withApollo";

interface CourseProps {}

export const Course: React.FC<CourseProps> = ({}) => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDir={"column"}
      backgroundColor={"white"}
      w="100%"
    >
      {typeof router?.query?.courseId === "string" ? (
        <CourseBody courseId={router.query.courseId} />
      ) : (
        <Box>Error Loading Course</Box>
      )}
    </Box>
  );
};

export default withApollo({ ssr: false })(Course);
