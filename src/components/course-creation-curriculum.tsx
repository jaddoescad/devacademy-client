import React, { useEffect } from "react";
import Section from "./section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Text } from "@chakra-ui/react";
import PopoverEditForm from "./titleInputForm";
import HoverToShowWrapper from "./HoverToShowWrapper";
import {
  reorderSectionService,
  reorderLessonService,
} from "src/services/courseCurriculum";
import {
  getCourse,
  getInstructorCourseCurriculumObserver,
} from "src/services/firestore";
import { useRouter } from "next/router";

interface Props {
  courseId: string;
}

const Board: React.FC<Props> = ({ courseId, ...props }) => {
  const router = useRouter();

  const [keepFocus, setKeepFocus] = React.useState(false);
  const [course, setCourse] = React.useState<any>();

  useEffect(() => {
    if (!router.isReady) return;
    const unsub = getInstructorCourseCurriculumObserver(
      courseId as string,
      setCourse
    );

    return () => {
      unsub();
    };
  }, [router.isReady]);

  useEffect(() => {
    console.log("course", course);
  }, [course]);

  const onDragEnd = (result: any) => {
    if (course) {
      // dropped nowhere
      if (!result.destination) {
        return;
      }

      const source = result.source;
      const destination = result.destination;

      // did not move anywhere - can bail early
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      // reordering section
      if (result.type === "SECTION") {
        reorderSectionService(
          course,
          source.index,
          destination.index,
          courseId
        );
        return;
      } else {
        // reordering lesson
        reorderLessonService(course, source, destination, courseId);
      }
    }
  };

  const board = (
    <Droppable
      droppableId="board"
      type="SECTION"
      direction="vertical"
      isCombineEnabled={false}
    >
      {(sectionDropplabeProvided) => (
        <Box
          ref={sectionDropplabeProvided.innerRef}
          {...sectionDropplabeProvided.droppableProps}
          m="10"
        >
          <Text mr="5" mt="5" fontSize={"30px"}>
            Course Curriculums
          </Text>
          {console.log(course)}
          {course?.courseCurriculum?.sectionOrder?.map((key, index) => {
            return (
              <Box mt="3" key={key}>
                <Section
                  key={key}
                  sectionIndex={index}
                  title={
                    course?.courseCurriculum?.sections?.[key].title || "error: title does not exist"
                  }
                  sectionId={key}
                  courseData={course}
                  courseId={courseId}
                />
              </Box>
            );
          })}
          <Box mt="3">
            <Box height="50px">
              <Box width="100%">
                <HoverToShowWrapper keepFocus={keepFocus}>
                  <PopoverEditForm
                    {...props}
                    course={course}
                    courseData={course}
                    sectionIndex={
                      course?.sectionOrder?.length
                        ? course.course?.sectionOrder?.length
                        : 0
                    }
                    elementType="section"
                    action="create"
                    courseId={courseId}
                    setKeepFocus={setKeepFocus}
                  />
                </HoverToShowWrapper>
              </Box>
            </Box>
          </Box>
          {sectionDropplabeProvided.placeholder}
        </Box>
      )}
    </Droppable>
  );

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box>{board}</Box>
      </DragDropContext>
    </React.Fragment>
  );
};

export default Board;
