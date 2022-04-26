// import  FocusLock from "react-focus-lock"

import { EditIcon } from "@chakra-ui/icons";
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
  useDisclosure,
  HTMLChakraProps,
} from "@chakra-ui/react";
import React, { HTMLInputTypeAttribute, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import {
  useInstructorCourseQuery,
  useCreateSectionMutation,
  useCreateLessonMutation,
  useChangeSectionTitleMutation,
  useChangeLessonTitleMutation,
} from "src/generated/graphql";
import { withApollo } from "src/utils/withApollo";
import {
  createSectionService,
  createLessonService,
  changeSectionTitleService,
  changeLessonTitleService,
} from "src/services/courseCurriculum";


interface TextInputProps {
  id: string,
  label: string
}

// 1. Create a text input component
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({...props}, ref) => {

  const {
    id,
    label
  } = props as TextInputProps;

  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input ref={ref} id={id} />
    </FormControl>
  );
});

// 2. Create the form
const Form = ({
  firstFieldRef,
  onCancel,
  setOrdered,
  curriculumData,
  ordered,
  sectionIndex,
  elementType,
  lessonIndex,
  sectionId,
  lessonId,
  register,
  action,
  ...props
}) => {
  const [createSectionMutation] = useCreateSectionMutation();
  const [createLesson] = useCreateLessonMutation();
  const [changeSectionTitle] = useChangeSectionTitleMutation();
  const [changeLessonTitle] = useChangeLessonTitleMutation();

  const { data, error, loading, fetchMore, variables } =
    useInstructorCourseQuery({
      variables: {
        courseId: props.courseId,
      },
    });

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <TextInput
          label={elementType === "section" ? "Section Title" : "Lesson Title"}
          id="title"
          ref={firstFieldRef}
        />
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            //   isDisabled
            colorScheme="teal"
            onClick={async () => {
              if (elementType === "section" && action === "create") {
                createSectionService(
                  data,
                  sectionIndex,
                  createSectionMutation,
                  props.courseId,
                  firstFieldRef.current.value
                );
              } else if (elementType === "lesson" && action === "create") {
                createLessonService(
                  data,
                  lessonIndex,
                  createLesson,
                  sectionId,
                  firstFieldRef.current.value
                );
              } else if (elementType === "section" && action === "edit") {
                changeSectionTitleService(
                  sectionId,
                  firstFieldRef.current.value,
                  changeSectionTitle
                );
              } else if (elementType === "lesson" && action === "edit") {
                changeLessonTitleService(
                  lessonId,
                  firstFieldRef.current.value,
                  changeLessonTitle
                );
              }
            }}
          >
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverEditForm = (props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const [showAddItem, setShowAddItem] = React.useState(false);
  const [keepFocus, setKeepFocus] = React.useState(false);

  return (
    <Box height="50px">
      <Box
        w={["100%", "100%", "100%", "100%"]}
      >
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
            {props.actionComponent ? (
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setKeepFocus(true);
                }}
                icon={props.actionComponent}
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
                {...props}
                courseData={props.courseData}
                firstFieldRef={firstFieldRef}
                onCancel={() => {
                  onClose();
                  setKeepFocus(false);
                }}
              />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: false })(PopoverEditForm);
