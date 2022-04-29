import React, { useEffect } from "react";
import Section from "./section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Text } from "@chakra-ui/react";
import PopoverEditForm from "./titleInputForm";
import {
  useInstructorCourseQuery,
  useChangeSectionOrderMutation,
  useChangeLessonOrderSameSectionMutation,
  useChangeLessonOrderDifferentSectionMutation,
} from "src/generated/graphql";
import HoverToShowWrapper from "./HoverToShowWrapper";

import {
  reorderSectionService,
  reorderLessonService,
} from "src/services/courseCurriculum";

interface Props {
  courseId: string;
}

const Board: React.FC<Props> = ({ courseId, ...props }) => {
  const [changeSection] = useChangeSectionOrderMutation();
  const [changeLessonOrderSameSection] =
    useChangeLessonOrderSameSectionMutation();
  const [changeLessonOrderDifferentSection] =
    useChangeLessonOrderDifferentSectionMutation();

  const {
    data: courseData,
    error,
    loading,
    fetchMore,
    variables,
  } = useInstructorCourseQuery({
    variables: {
      courseId: courseId,
    },
  });

  const onDragEnd = (result: any) => {
    if (courseData) {
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
          courseData,
          source.index,
          destination.index,
          changeSection,
          courseId
        );
        return;
      } else {
        // reordering lesson
        reorderLessonService(
          courseData,
          source,
          destination,
          changeLessonOrderSameSection,
          changeLessonOrderDifferentSection
        );
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

          {courseData?.course?.sectionOrder.map((key, index) => {
            return (
              <Box mt="3" key={key}>
                <Section
                  key={key}
                  sectionIndex={index}
                  title={
                    courseData?.course?.sections?.find((x) => x.id === key)
                      ?.title || ""
                  }
                  sectionId={key}
                  courseData={courseData}
                  courseId={courseId}
                />
              </Box>
            );
          })}
          <Box mt="3">
            <Box height="50px">
              <Box width="100%">
                <HoverToShowWrapper>
                  <PopoverEditForm
                    {...props}
                    courseData={courseData}
                    sectionIndex={courseData?.course?.sectionOrder.length}
                    elementType="section"
                    action="create"
                    courseId={courseId}
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
