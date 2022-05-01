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
import VideoLessonCreationItem from "./video-lesson-creation-item";
import { useRouter } from "next/router";
import { ArticleSubHeader } from "./article-subheader";
import { deleteVideo } from "src/services/deleteVideo";
import HoverToShowWrapper from "./HoverToShowWrapper";

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

  lessonId: string;
}

const LessonItem: React.FC<Props> = ({
  lessonId,
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
  const [uploadVideo, setUploadVideo] = React.useState(false);
  const [createArticle, setCreateArticle] = React.useState(false);
  const [videoOrArticle, setVideoOrArticle] = React.useState(false);
  const [showExtension, setShowExtension] = React.useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [setVideoUrlMutation] = useSetVideoUrlMutation();
  const router = useRouter();
  const [keepFocus, setKeepFocus] = React.useState(false);
  const [keepLessonFocus, setKeepLessonFocus] = React.useState(false);

  setKeepLessonFocus
  const lesson = data?.course?.sections
    ?.find((x) => x.id === sectionId)
    ?.lessons?.find((x) => x.id === lessonId);

  function deleteVideoPgsql() {
    setVideoUrlMutation({
      variables: {
        lessonId: lessonId,
        videoEmbedUrl: "",
        videoUri: "",
      },
      optimisticResponse: {
        __typename: "Mutation",
        setVideoUrl: {
          __typename: "Lesson",
          id: lessonId,
          videoEmbedUrl: "",
          videoUri: "",
        },
      },
      update: (cache) => {
        cache.evict({ fieldName: "course" });
      },
    });
  }

  return (
    <Box>
      <Box width={"100%"} h="40px">
        <Box>
          <HoverToShowWrapper keepLessonFocus={keepLessonFocus}>
            <PopoverEditForm
              action="create"
              elementType="lesson"
              lessonIndex={lessonIndex}
              sectionId={sectionId}
              courseId={courseId}
              setKeepLessonFocus={setKeepLessonFocus}
            />
          </HoverToShowWrapper>
        </Box>
      </Box>
      <Box
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
              <HoverToShowWrapper keepFocus={keepFocus}>
                <Flex flex={1}>
                  <PopoverEditForm
                    elementType="lesson"
                    action="edit"
                    courseId={courseId}
                    sectionId={sectionId}
                    lessonId={lessonId}
                    actionComponent={<FiEdit2 />}
                    setKeepFocus={setKeepFocus}
                  />
                  <PopoverDeleteForm
                    elementType="lesson"
                    sectionId={sectionId}
                    lessonId={lessonId}
                    setKeepFocus={setKeepFocus}
                    actionComponent={<FiTrash />}
                  />
                </Flex>
              </HoverToShowWrapper>

              {!lesson?.videoEmbedUrl && !lesson?.isArticle && (
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
            </Flex>
          }
          {lesson?.videoEmbedUrl && lesson?.videoEmbedUrl !== "" ? (
            <>
              <Button
                onClick={async () => {
                  try {
                    await deleteVideo(lesson.videoUri);
                    deleteVideoPgsql();
                  } catch (error) {
                    deleteVideoPgsql();
                  }
                  // setVideoUrl(lesson.videoUrl);
                }}
              >
                delete
              </Button>
              <Button
                onClick={() => {
                  router.push(
                    {
                      pathname: "/lesson-video-preview",
                      query: {
                        lessonVideoUrl: lesson?.videoEmbedUrl,
                      },
                    },
                    "/lesson-video-preview",
                    { shallow: true }
                  );
                }}
              >
                Preview Video
              </Button>
            </>
          ) : lesson?.isArticle ? (
            <ArticleSubHeader courseId={courseId} lessonId={lessonId} />
          ) : (
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
                            // setCreateArticle(true);

                            // create article
                            router.push({
                              pathname: `/course-creation-platform/${courseId}/${lessonId}/article-editor`,
                            });
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LessonItem;
