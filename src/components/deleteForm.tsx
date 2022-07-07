import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import FocusLock from "react-focus-lock";
import { deleteSection, deleteLesson, deleteArticle } from "src/services/firestore";
import { withApollo } from "src/utils/withApollo";
import { deleteVideo } from "src/services/deleteVideo";
import { deleteVideoUrl, setIsArticle } from "src/services/firestore";

interface Props {
  onCancel: () => void;
  elementType: string;
  sectionId: string;
  lessonId: string;
  courseId: string;
  courseData?: any;
  videoUrl?: string
}

// 2. Create the form
const Form: React.FC<Props> = ({
  onCancel,
  elementType,
  sectionId,
  lessonId,
  courseId,
  courseData,
  videoUrl
}) => {


  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Text>Are you sure you want to delete?</Text>
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            //   isDisabled
            colorScheme="red"
            onClick={async () => {
              if (elementType === "lesson") {
                deleteLesson(lessonId, sectionId, courseId, courseData)
              } else if (elementType === "section") {
                deleteSection(sectionId, courseId, courseData);
              } else if (elementType === "article") {
                deleteArticle(lessonId, courseId)
              } else if (elementType === "video") {
                await deleteVideo(videoUrl);
                deleteVideoUrl(lessonId, courseId);
              }
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

interface PopOverEditProps {
  courseData?: any;
  actionComponent:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  elementType: string;
  sectionId: string;
  lessonId: string;
  courseId: string;
  videoUrl?: string;
  setKeepFocus: (value: boolean) => void;
}

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverEditForm: React.FC<PopOverEditProps> = ({
  actionComponent,
  elementType,
  sectionId,
  courseId,
  lessonId,
  setKeepFocus,
  videoUrl,
  courseData
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={() => {
          setKeepFocus(true);
          onOpen();
        }}
        onClose={() => {
          setKeepFocus(false);
          onClose();
        }}
        placement="right"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          {actionComponent ? (
            <IconButton aria-label="action" icon={actionComponent}></IconButton>
          ) : (
            <Button width={"10px"}>Add</Button>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form
              elementType={elementType}
              sectionId={sectionId}
              lessonId={lessonId}
              courseId={courseId}
              courseData={courseData}
              videoUrl={videoUrl}
              onCancel={() => {
                setKeepFocus(false);
                onClose();
              }}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default withApollo({ ssr: false })(PopoverEditForm);
