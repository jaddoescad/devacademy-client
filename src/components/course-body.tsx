import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
// import {
//   useGetPublishedCourseQuery,
//   useGetLessonContentLazyQuery,
// } from "src/generated/graphql";
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
import Navigation from "src/components/common/Navigation";
import FullMembershipContext from "src/context/fullMembershipContext";
import { useConnectWallet, useProvider } from "src/fixtures/wallet/hooks";
import WalletContext from "src/context/walletContext";
import {
  getPublishedArticle,
  getPublishedCourse,
} from "src/services/firestore";
import { InstructorNavigation } from "./common/InstructorNavigation";

interface CourseBodyProps {
  courseId: string;
}

export const CourseBody: React.FC<CourseBodyProps> = ({ courseId }) => {
  const router = useRouter();
  const { isFullMembership } = useContext(FullMembershipContext);
  const { accountAddress, ethersProvider } = useProvider();
  const { address } = useContext(WalletContext);
  const [course, setCourse] = useState<any>(null);
  const [lessonId, setLessonId] = useState<number | null>(null);
  const [article, setArticle] = useState<any>(null);
  const { connect, disconnect } = useConnectWallet();

  useEffect(() => {
    if (!router.isReady) return;
    getPublishedCourse(courseId as string).then((courseSnapshot) => {
      if (courseSnapshot.data()) {
        setCourse(courseSnapshot.data());
        const firstSectionId =
          courseSnapshot.data()?.courseCurriculum.sectionOrder[0];
        const firstArticleId =
          courseSnapshot.data()?.courseCurriculum.sections[firstSectionId]
            .lessonOrder[0];
        setLessonId(firstArticleId);
      }
    });
  }, [router.isReady]);

  useEffect(() => {
    //check if lessonId is an article
    if (!router.isReady) return;
    if (lessonId && course?.courseCurriculum?.articles?.[lessonId]?.isArticle) {
      getPublishedArticle(courseId, lessonId).then((courseSnapshot) => {
        if (courseSnapshot.data()) {
          setArticle(courseSnapshot.data()?.[lessonId].articleText);
        }
      });
    } else {
      if (lessonId) {
        console.log("frkfr", course.courseCurriculum?.articles?.[lessonId]);
      }
    }

    //if not article fetch article
  }, [lessonId]);

  return (
    <Flex flexDir={"column"} align="center" width={"100%"} height="100%" pb="50px">
      <Navigation isNotMaxW={true} courseTitle={course?.title} />

      <Flex flex={1} width="100%">
        <Box flex="1" height={"100%"}>
          {lessonId &&
          course.courseCurriculum?.articles?.[lessonId].videoEmbedUrl &&
          isFullMembership ? (
            <Box
              position={"relative"}
              pb={"56.25%"}
              // height={"0"}
              width={"100%"}
              overflow={"hidden"}
              backgroundColor={"black"}
              // mt={5}
            >
              <iframe
                src={
                  course.courseCurriculum?.articles?.[lessonId].videoEmbedUrl +
                  "&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"
                }
                width="100%"
                // height="300"
                frameBorder="0"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Untitled"
              ></iframe>
            </Box>
          ) : lessonId &&
            course.courseCurriculum?.articles?.[lessonId].isArticle &&
            isFullMembership ? (
            <Box ml={5} width="90%" height={"100%"}>
              <CourseDisplay textContent={article} />
            </Box>
          ) : !address ? (
            <Center
              color="white"
              width="100%"
              height={"70vh"}
              backgroundColor={"black"}
              fontSize="large"
              fontWeight="bold"
              flexDir={"column"}
            >
              <Text>Please connect to wallet</Text>
              <Button
                mt="3"
                onClick={connect}
                colorScheme={"teal"}
                color="white"
              >
                Connect
              </Button>
            </Center>
          ) : (
            <Center
              color="white"
              width="100%"
              height={"70vh"}
              backgroundColor={"black"}
              fontSize="large"
              fontWeight="bold"
              flexDir={"column"}
            >
              <Text>Please get a membership to access this course</Text>
              <Button
                mt="3"
                onClick={() =>
                  router.push(
                    "https://stakes.social/arbitrum-one/0xF83ffb295dbb01f97f908eE0C617DB85A3f02310"
                  )
                }
                colorScheme={"green"}
                color="white"
              >
                Get Access
              </Button>
            </Center>
          )}
        </Box>
        <Box
          backgroundColor={"white"}
          borderLeft={"1px solid lightgray;"}
          height="100%"
          width={"400px"}
        >
          <Box p="15px" fontWeight={"bold"} fontSize={"large"}>
            Course Content
          </Box>
          <Accordion defaultIndex={[0]} allowMultiple>
            {course?.courseCurriculum?.sectionOrder.map((key, index) => {
              const section = course?.courseCurriculum?.sections?.[key];
              return (
                <AccordionItem key={key}>
                  <Box>
                    <AccordionButton>
                      <Box flex="1" textAlign={"left"} fontWeight={"bold"}>
                        {section?.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p="0">
                      {section?.lessonOrder.map((lessonKey, index) => {
                        return (
                          <Box
                            p="4"
                            m="1px"
                            onClick={() => {
                              setLessonId(lessonKey);
                            }}
                            cursor={"pointer"}
                            key={lessonKey}
                            backgroundColor={
                              lessonId === lessonKey ? "lightgray" : "white"
                            }
                          >
                            <Box>
                              {
                                course?.courseCurriculum?.articles?.[lessonKey]
                                  ?.title
                              }
                            </Box>
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
      </Flex>
    </Flex>
  );
};

export default CourseBody;
