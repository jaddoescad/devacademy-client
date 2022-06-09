import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
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
import { useProvider } from "src/fixtures/wallet/hooks";
import WalletContext from "src/context/walletContext";

interface CourseBodyProps {
  courseId: string;
}

export const CourseBody: React.FC<CourseBodyProps> = ({ courseId }) => {
  const router = useRouter();
  const { fullMembership } = useContext(FullMembershipContext);
  const { accountAddress, ethersProvider } = useProvider();
  const { address } = useContext(WalletContext);


  
  // const { data, error, loading, fetchMore, variables } =
    // useGetPublishedCourseQuery({
    //   variables: {
    //     getPublishedCourseId: courseId,
    //   },
    // });

  // const [getLessonContent, { data: lessonData, loading: lessonLoading }] =
    // useGetLessonContentLazyQuery();



  useEffect(() => {
    const firstSectionId = data?.getPublishedCourse?.sectionOrder[0];
    if (firstSectionId && data?.getPublishedCourse?.sections) {
      const firstLessonId = data?.getPublishedCourse?.sections.find(
        (x) => x.id === firstSectionId + "_published"
      )?.lessonOrder[0];
      if (firstLessonId) {
        getLessonContent({
          variables: {
            lessonId: firstLessonId + "_published",
          },
        });
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("lessonData id", lessonData?.lesson?.id);
    console.log("address is", address);
  }, [lessonData, address]);

  return (
    <Flex flexDir={"column"} align="center" width={"100%"} height="100vh">
      <Navigation
        isNotMaxW={true}
        courseTitle={data?.getPublishedCourse?.title}
      />

      <Flex pl={5} border={"2px solid lightgray;"} maxH={"80vh"} width="100%">
        <Box flex="1" height={"100%"}>
          {lessonData?.lesson?.videoEmbedUrl && fullMembership ? (
            <Box
              position={"relative"}
              pb={"56.25%"}
              // height={"0"}
              width={"100%"}
              overflow={"hidden"}
              backgroundColor={"black"}
              mt={5}
            >
              <iframe
                src={
                  lessonData?.lesson?.videoEmbedUrl +
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
          ) : lessonData?.lesson?.articleText && fullMembership ? (
            <Box ml={5} width="90%" height={"90%"}>
              <CourseDisplay textContent={lessonData?.lesson?.articleText} />
            </Box>
          ) : !address ? (
            <Box color="white" width="100%" height={"70vh"} backgroundColor={"black"}>
              Please Connect to Wallet
            </Box>
          ) : (
            <Box color="white" width="100%" height={"70vh"} backgroundColor={"black"}>
              Please get Stoken membership to access this course
            </Box>
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
          <Accordion allowMultiple>
            {data?.getPublishedCourse?.sectionOrder.map((key, index) => {
              const section = data?.getPublishedCourse?.sections?.find(
                (x) => x.id === key + "_published"
              );
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
                        const lesson = section?.lessons?.find(
                          (x) => x.id === lessonKey + "_published"
                        );
                        return (
                          <Box
                            p="4"
                            m="1px"
                            onClick={() => {
                              lesson?.id &&
                                getLessonContent({
                                  variables: {
                                    lessonId: lesson?.id,
                                  },
                                });
                            }}
                            cursor={"pointer"}
                            key={lessonKey}
                            backgroundColor={
                              lessonData?.lesson?.id === lesson?.id
                                ? "lightgray"
                                : "white"
                            }
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
      </Flex>
    </Flex>
  );
};

export default CourseBody;
