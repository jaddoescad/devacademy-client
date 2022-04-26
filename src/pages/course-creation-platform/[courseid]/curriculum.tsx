import React, { useEffect } from "react";
import { withApollo } from "../../../utils/withApollo";
import { useRouter } from "next/router";
import InstructorSidePanel from "src/components/common/instructorSidePanel";
import { useMeQuery } from "src/generated/graphql";
import { Box, Flex, Text } from "@chakra-ui/react";
import CourseCreateCurriculum from "src/components/course-creation-curriculum";
import dynamic from "next/dynamic";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";

interface CourseCurriculumPlatformProps {}

export const CourseCurriculum: React.FC<
  CourseCurriculumPlatformProps
> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({});

  return (
    <>
      { typeof router?.query?.courseid === "string" ? (
        <Box bg={"white"} overflowY={"scroll"} height="100vh">
          <InstructorNavigation />
          <Flex>
            <InstructorSidePanel
              selected="curriculum"
              courseid={router.query.courseid}
              name={`${data?.me?.firstName} ${data?.me?.lastName}`}
            />
            <Box
              pos="sticky"
              w={"100%"}
              flexDir="column"
              justifyContent="space-between"
              color={"black"}
              bg={"white"}
              ml={"50px"}
              mr={"50px"}
              mb={"50px"}
              mt={"20px"}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            >
              <CourseCreateCurriculum courseId={router.query.courseid} />
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box>
          Error Loading Curriculum
        </Box>
      )}
    </>
  );
};

const DynamicComponentWithNoSSR = dynamic(
  () => Promise.resolve(CourseCurriculum),
  {
    ssr: false,
  }
);

export default withApollo({ ssr: false })(DynamicComponentWithNoSSR);
