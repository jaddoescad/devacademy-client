import React, { useEffect } from "react";
import { withApollo } from "../../../utils/withApollo";
import { useRouter } from "next/router";
import InstructorSidePanel from "src/components/common/instructorSidePanel";
import { useMeQuery } from "src/generated/graphql";
import { Box, Flex, Text } from "@chakra-ui/react";

interface CourseCurriculumPlatformProps {}

export const CourseCurriculum: React.FC<
  CourseCurriculumPlatformProps
> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({});

  return (
    <>
      {typeof router.query.courseid === "string" ? (
        <Flex>
          <InstructorSidePanel
            selected="landingPage"
            courseid={router.query.courseid}
            name={`${data?.me?.firstName} ${data?.me?.lastName}`}
          />
          <Flex
            pos="sticky"
            mr={10}
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={"100%"}
            borderRadius="15px"
            flexDir="column"
            justifyContent="space-between"
            color={"black"}
            bg={"white"}
          >
            <Text m="5" fontSize={"30px"}>
              Landing Page
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Box>Error Loading Landing Page</Box>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(CourseCurriculum);
