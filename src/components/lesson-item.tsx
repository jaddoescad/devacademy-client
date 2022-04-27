import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { borderRadius, grid } from "./constants";
import PopoverEditForm from "./titleInputForm";
import { Box, Center, Flex, IconButton } from "@chakra-ui/react";
import {
  useInstructorCourseQuery,
  useSetVideoUrlMutation,
} from "src/generated/graphql";
import { Icon, Text, Button } from "@chakra-ui/react";
import { FiEdit2, FiTrash, FiTrash2, FiMenu } from "react-icons/fi";
import PopoverDeleteForm from "./deleteForm";
import MyDropzone from "./dropzone";
import ReactPlayer from "react-player";

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent

interface Props {
  courseId: string;
  sectionId: string;
  lessonIndex: number;
  provided: any;
  isGroupedOver: boolean;
  isDragging: boolean;
  lessonId: string;
}

const LessonItem: React.FC<Props> = ({
  lessonId,
  isDragging,
  isGroupedOver,
  provided,
  lessonIndex,
  sectionId,
  courseId,
}) => {
  const { data } = useInstructorCourseQuery({
    variables: {
      courseId: courseId,
    },
  });

  const [showAddLessonItem, setShowLessonItem] = React.useState(false);
  const [showHeaderItem, setShowHeaderItem] = React.useState(false);
  const [keepFocus, setKeepFocus] = React.useState(false);
  const [uploadVideo, setUploadVideo] = React.useState(false);
  const [createArticle, setCreateArticle] = React.useState(false);
  const [videoOrArticle, setVideoOrArticle] = React.useState(false);
  const [showExtension, setShowExtension] = React.useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [setVideoUrlMutation] = useSetVideoUrlMutation();

  const lesson = data?.course?.sections
    ?.find((x) => x.id === sectionId)
    ?.lessons?.find((x) => x.id === lessonId);

  return (
    <Box>
      <Box width={"100%"} h="40px">
        <Box>
          <PopoverEditForm
            action="create"
            elementType="lesson"
            setKeepFocus={setKeepFocus}
            lessonIndex={lessonIndex}
            sectionId={sectionId}
            courseId={courseId}
          />
        </Box>
      </Box>
      <Box
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Box
          padding={"20px"}
          backgroundColor="white"
          border={"1px solid #212121"}
          onMouseOverCapture={() => setShowHeaderItem(true)}
          onMouseLeave={() => setShowHeaderItem(false)}
        >
          {
            <Flex align={"center"}>
              <Text>{lesson?.title}</Text>
              <Flex flex={1}>
                {/* <Icon ml="2" w={3.5} h={3.5} as={FiEdit2} /> */}

                <PopoverEditForm
                  elementType="lesson"
                  action="edit"
                  courseId={courseId}
                  test="dingdong"

                  sectionId={sectionId}
                  setKeepFocus={setKeepFocus}
                  lessonId={lessonId}
                  actionComponent={<FiEdit2 />}
                />
                <PopoverDeleteForm
                  elementType="lesson"
                  sectionId={sectionId}
                  setKeepFocus={setKeepFocus}
                  lessonId={lessonId}
                  actionComponent={<FiTrash />}
                />
              </Flex>
              {!lesson?.videoUrl && (
                <Button
                  onClick={() => {
                    if (showExtension === true) {
                      setShowExtension(false);
                      setVideoOrArticle(false);
                      setUploadVideo(false);
                      setCreateArticle(false);
                    } else {
                      setVideoOrArticle(true);
                      setShowExtension(true);
                    }
                  }}
                >
                  {videoOrArticle || uploadVideo || createArticle
                    ? "Cancel"
                    : "Add Content"}
                </Button>
              )}
              <Box>
                <Icon ml="2" w={3.5} h={3.5} as={FiMenu} />
              </Box>
            </Flex>
          }
          {!lesson?.videoUrl || lesson?.videoUrl === "" ? (
            <>
              {showExtension && (
                <>
                  {videoOrArticle && (
                    <Center>
                      <Flex>
                        <Button
                          onClick={() => {
                            setUploadVideo(true);
                            setVideoOrArticle(false);
                            setCreateArticle(false);
                          }}
                        >
                          Video
                        </Button>

                        <Button
                          onClick={() => {
                            setUploadVideo(false);
                            setVideoOrArticle(false);
                            setCreateArticle(true);
                          }}
                        >
                          Article
                        </Button>
                      </Flex>
                    </Center>
                  )}
                  {uploadVideo && (
                    <Box>
                      <MyDropzone lessonId={lessonId} />
                    </Box>
                  )}
                  {createArticle && <Box>Create Article</Box>}
                </>
              )}
            </>
          ) : (
            <>
              {/* <ReactPlayer controls={true} url={lesson.videoUrl} /> */}
              {/* <iframe
                src={lesson.videoUrl+"&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"}
                width="400"
                height="300"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                title="Untitled"
              ></iframe> */}
              <iframe
                src="https://player.vimeo.com/video/702688891?h=71abbc418c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"
                width="400"
                height="300"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Untitled"
              ></iframe>
              {console.log(lesson.videoUrl)}
              <Button
                onClick={() => {
                  // setVideoUrl(lesson.videoUrl);
                  setVideoUrlMutation({
                    variables: {
                      lessonId: lessonId,
                      videoUrl: "",
                    },
                    optimisticResponse: {
                      __typename: "Mutation",
                      setVideoUrl: {
                        __typename: "Lesson",
                        id: lessonId,
                        videoUrl: "",
                      },
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "course" });
                    },
                  });
                }}
              >
                delete
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LessonItem;
