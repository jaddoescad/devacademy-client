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


interface Props {
  onCancel: () => void;
  elementType: string;
  sectionId: string;
  lessonId: string;
  courseId: string;
}

// 2. Create the form
const Form: React.FC<Props> = ({
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
                    lessonId: lessonId,
                    sectionId: sectionId,
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
  courseData: any;
  actionComponent:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  elementType: string;
  sectionId: string;
  lessonId: string;
  courseId: string;
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
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={() => {
          setKeepFocus(true)
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
            <IconButton aria-label="edit" icon={actionComponent}></IconButton>
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
