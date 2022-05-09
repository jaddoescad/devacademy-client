import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  useGetPublishedCourseQuery,
  useGetLessonContentLazyQuery,
} from "src/generated/graphql";
import { useRouter } from "next/router";
import { propertySymbol } from "src/fixtures/dev-kit/client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CourseDisplay } from "src/components/course-display";

interface CourseBodyProps {
  courseId: string;
}

export const CourseBody: React.FC<CourseBodyProps> = ({ courseId }) => {
  const router = useRouter();

  const { data, error, loading, fetchMore, variables } =
    useGetPublishedCourseQuery({
      variables: {
        getPublishedCourseId: courseId,
      },
    });

  const [getLessonContent, { data: lessonData, loading: lessonLoading }] =
    useGetLessonContentLazyQuery();

  useEffect(() => {
    console.log(lessonData?.lesson?.videoEmbedUrl);
  }, [lessonData]);

  useEffect(() => {
    console.log("hello", data?.getPublishedCourse?.sections);
  }, [data]);

  return (
    <Flex flex="1" flexDir={"column"} align="center" height={"100%"}>
      <Box pl={5} pr={5} height={"100%"} width="100%" maxWidth={"1200px"}>
        <Flex minH={"1000px"}>
          <Box mr="100px">
            <Box mt="25px" fontSize={"25px"} fontWeight={"bold"}>
              {data?.getPublishedCourse?.title}
            </Box>
            <Box>
              {lessonData?.lesson?.videoEmbedUrl ? (
                <Box>
                  <iframe
                    src={
                      lessonData?.lesson?.videoEmbedUrl +
                      "&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"
                    }
                    width="400"
                    height="300"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Untitled"
                  ></iframe>
                </Box>
              ) : lessonData?.lesson?.articleText ? (
                <Box>
                  <CourseDisplay
                    textContent={lessonData?.lesson?.articleText}
                  />
                </Box>
              ) : (
                <Box>No Content</Box>
              )}
            </Box>
            <Box>
              <Box>{data?.getPublishedCourse?.description}</Box>
            </Box>
          </Box>
          <Box>
            <Box height="100%" backgroundColor={"gray"} width={"200px"}>
              <Box pt="25px" fontWeight={"bold"} fontSize={"xl"}>
                Course Content
              </Box>
              <Accordion>
                {data?.getPublishedCourse?.sectionOrder.map((key, index) => {
                  const section = data?.getPublishedCourse?.sections?.find(
                    (x) => x.id === key + "_published"
                  );
                  return (
                    <AccordionItem key={key}>
                      <Box mt="3">
                        <AccordionButton>
                          <Box>{section?.title}</Box>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          {section?.lessonOrder.map((lessonKey, index) => {
                            const lesson = section?.lessons?.find(
                              (x) => x.id === lessonKey + "_published"
                            );
                            return (
                              <Box
                                onClick={() => {
                                  console.log(lesson?.id);
                                  lesson?.id &&
                                    getLessonContent({
                                      variables: {
                                        lessonId: lesson?.id,
                                      },
                                    });
                                }}
                                cursor={"pointer"}
                                mt="3"
                                key={lessonKey}
                              >
                                <Box>{lesson?.title}</Box>
                              </Box>
                            );
                          })}
                        </AccordionPanel>
                      </Box>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CourseBody;
