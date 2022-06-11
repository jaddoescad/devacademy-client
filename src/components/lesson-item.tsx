import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { borderRadius, grid } from "./constants";
import PopoverEditForm from "./titleInputForm";
import { Box, Center, Flex, IconButton } from "@chakra-ui/react";
// import {
//   useInstructorCourseQuery,
//   useSetVideoUrlMutation,
// } from "src/generated/graphql";
import { Icon, Text, Button } from "@chakra-ui/react";
import { FiEdit2, FiTrash, FiTrash2, FiMenu } from "react-icons/fi";
import PopoverDeleteForm from "./deleteForm";
import MyDropzone from "./dropzone";
import ReactPlayer from "react-player";
import VideoLessonCreationItem from "./video-lesson-creation-item";
import { useRouter } from "next/router";
import { ArticleSubHeader } from "./article-subheader";
import { deleteVideo } from "src/services/deleteVideo";
import {deleteVideoUrl} from "src/services/firestore";
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
  lesson: any;
  courseData: any;
}

const LessonItem: React.FC<Props> = ({
  lessonId,
  isGroupedOver,
  provided,
  lessonIndex,
  sectionId,
  courseId,
  lesson,
  courseData,
}) => {
  // const { data } = useInstructorCourseQuery({
  //   variables: {
  //     courseId: courseId,
  //   },
  // });

  const [showAddLessonItem, setShowLessonItem] = React.useState(false);
  const [showHeaderItem, setShowHeaderItem] = React.useState(false);
  const [uploadVideo, setUploadVideo] = React.useState(false);
  const [createArticle, setCreateArticle] = React.useState(false);
  const [videoOrArticle, setVideoOrArticle] = React.useState(false);
  const [showExtension, setShowExtension] = React.useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  // const [setVideoUrlMutation] = useSetVideoUrlMutation();
  const router = useRouter();
  const [keepFocus, setKeepFocus] = React.useState(false);
  const [keepLessonFocus, setKeepLessonFocus] = React.useState(false);

  useEffect(() => {
    console.log("lesson", lesson);
  }, [lesson]);

  return (
    <Box>
      <Box width={"100%"} h="40px">
        <Box>
          <HoverToShowWrapper keepLessonFocus={keepLessonFocus}>
            <PopoverEditForm
              course={courseData}
              action="create"
              elementType="lesson"
              lessonIndex={lessonIndex}
              sectionId={sectionId}
              courseId={courseId}
              setKeepFocus={setKeepLessonFocus}
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
                    courseId={courseId}
                    setKeepFocus={setKeepFocus}
                    actionComponent={<FiTrash />}
                    courseData={courseData}
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
          {lesson?.videoEmbedUrl && lesson?.videoEmbedUrl !== "" && lesson.videoUrl && lesson.videoUrl !== "" ? (
            <>
              <Button
                onClick={async () => {
                  try {
                    await deleteVideo(lesson.videoUrl);
                    deleteVideoUrl(lessonId, courseId);
                  } catch (error) {
                    // deleteVideoPgsql();
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
                      <MyDropzone lessonId={lessonId} courseId={courseId} />
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
