// import  FocusLock from "react-focus-lock"
import { EditIcon } from "@chakra-ui/icons";
import {
  useDeleteSectionMutation,
  useDeleteLessonMutation,
} from "src/generated/graphql";
import {
  Box,
  Button,
  IconButton,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
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
import { withApollo } from "src/utils/withApollo";
import { v4 as uuidv4 } from "uuid";
import { IconType } from "react-icons";

interface Props {
  onCancel: () => void;
  elementType: string;
  sectionId:  string;
  lessonId: string;
  courseId: string;
}

// 2. Create the form
const Form:React.FC<Props> = ({
  onCancel,
  elementType,
  sectionId,
  lessonId,
  courseId,
}) => {
  const [deleteSection] = useDeleteSectionMutation();
  const [deleteLesson] = useDeleteLessonMutation();

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
                await deleteLesson({
                  variables: {
                    deleteLessonId: lessonId,
                  },
                  update: (cache, { data }) => {
                    cache.evict({
                      fieldName: "course",
                    });
                  },
                });
              } else if (elementType === "section") {
                await deleteSection({
                  variables: {
                    deleteSectionId: sectionId,
                    courseId: courseId,
                  },
                  update: (cache, { data }) => {
                    cache.evict({
                      fieldName: "course",
                    });
                  },
                });
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
  setKeepFocus: (keepFocus: boolean) => void;
  courseData: any;
  actionComponent: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  elementType: string;
  sectionId: string;
  lessonId: string;
  courseId: string;
}

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverEditForm:React.FC<PopOverEditProps> = ({setKeepFocus, actionComponent, elementType, sectionId, courseId, lessonId }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={() => {
          onClose();
          setKeepFocus(false);
        }}
        placement="right"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          {actionComponent ? (
            <IconButton
              aria-label="edit"
              onClick={() => {
                setKeepFocus(true);
              }}
              icon={actionComponent}
            ></IconButton>
          ) : (
            <Button
              onClick={() => {
                setKeepFocus(true);
              }}
              width={"10px"}
            >
              Add
            </Button>
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
              onCancel={() => {
                onClose();
                setKeepFocus(false);
              }}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default withApollo({ ssr: false })(PopoverEditForm);
