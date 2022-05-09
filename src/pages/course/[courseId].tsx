import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navigation from "src/components/common/Navigation";
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
      minH="100vh"
      w="100%"
    >
      <Navigation />
      {typeof router?.query?.courseId === "string" ? (
        <CourseBody courseId={router.query.courseId} />
      ) : (
        <Box>Error Loading Course</Box>
      )}
    </Box>
  );
};

export default withApollo({ ssr: false })(Course);
