import React from "react";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import NextLink from "next/link";
import { Box, Button, Flex, Center, Image, Text } from "@chakra-ui/react";
import { withApollo } from "../utils/withApollo";
import { useInstructorCoursesQuery } from "src/generated/graphql";
import { useIsAuth } from "src/utils/useIsAuth";

const Course = () => {
  useIsAuth();
  const { data, error, loading, fetchMore, variables } =
    useInstructorCoursesQuery();

  return (
    <div>
      <InstructorNavigation />
      {!data?.instructorCourses ? (
        <div>loading...</div>
      ) : (
        <Box color={"white"}>
          <Flex>
            <Box ml="100px" fontSize={"4xl"}>
              Courses
            </Box>
            <Button ml={"auto"} mt="10px" mr="100px" colorScheme="blue">
              <NextLink href="/create-course-title">Create Course</NextLink>
            </Button>
          </Flex>

          {data.instructorCourses.map((course) => (
            <NextLink
              href={`/course-creation-platform/${course.id}/landingPage`}
            >
              <Center
                ml="100px"
                mr="100px"
                mt="20px"
                mb="20px"
                cursor={"pointer"}
              >
                <Box
                  key={course.id}
                  width="100%"
                  bg="white"
                  height={"100px"}
                  color="black"
                >
                  <Box>
                    <Flex>
                      <Image
                        src="https://bit.ly/naruto-sage"
                        alt="naruto"
                        objectFit="cover"
                        w={"100px"}
                        h="100px"
                      />
                      <Box>
                        <Text mt="2" ml="2">
                          {course.title}
                        </Text>
                        <Text mt="auto" ml="2">
                          {"created at: " + course.createdAt}
                        </Text>
                        <Text mt="auto" ml="2">
                          DRAFT
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Center>
            </NextLink>
          ))}
        </Box>
      )}
    </div>
  );
};

export default withApollo({ ssr: false })(Course);
