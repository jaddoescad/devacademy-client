import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import LessonItem from "./lesson-item";
import { grid } from "./constants";
import PopoverEditForm from "./titleInputForm";

import { useInstructorCourseQuery } from "src/generated/graphql";
import { Box, Text } from "@chakra-ui/react";
import HoverToShowWrapper from "./HoverToShowWrapper";

const scrollContainerHeight = 250;

interface StyledDivProps {
  isDraggingOver: boolean;
  isDropDisabled: boolean;
  isDraggingFrom: boolean;
}

const DraggableContainer = styled.div<StyledDivProps>`
  background-color: "transparent";
`;

interface InnerLessonListProps {
  courseId: string;
  sectionId: string;
}

const InnerLessonList: React.FC<InnerLessonListProps> = ({
  courseId,
  sectionId,
  ...props
}) => {
  const [keepFocus, setKeepFocus] = useState(false);
  

  const { data, error, loading, fetchMore, variables } =
    useInstructorCourseQuery({
      variables: {
        courseId: courseId,
      },
    });

  if (!data?.course?.sections?.find((x) => x.id === sectionId)?.lessonOrder) {
    return <div>error</div>;
  }

  return (
    <Box>
      {data.course?.sections
        ?.find((x) => x.id === sectionId)
        ?.lessonOrder.map((lessonId, lessonIndex) => {
          return (
            <Draggable
              key={lessonId}
              draggableId={lessonId}
              index={lessonIndex}
              shouldRespectForceTouch={false}
            >
              {(dragProvided, dragSnapshot) => (
                <Box>
                  <LessonItem
                    key={lessonId}
                    lessonId={lessonId}
                    lessonIndex={lessonIndex}
                    sectionId={sectionId}
                    courseId={courseId}
                    isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                    provided={dragProvided}
                    {...props}
                  />
                </Box>
              )}
            </Draggable>
          );
        })}
      <HoverToShowWrapper keepFocus={keepFocus}>
        <Box height="50px">
          <Box>
            <PopoverEditForm
              elementType="lesson"
              action="create"
              courseId={courseId}
              lessonIndex={
                data.course?.sections?.find((x) => x.id === sectionId)
                  ?.lessonOrder.length
              }
              sectionId={sectionId}
              setKeepFocus={setKeepFocus}
              {...props}
            />
          </Box>
        </Box>
      </HoverToShowWrapper>
    </Box>
  );
};

interface InnerListProps {
  dropProvided: DroppableProvided;
  title: string;
  courseId: string;
  sectionId: string;
}

const InnerList: React.FC<InnerListProps> = ({
  dropProvided,
  title,
  ...props
}) => {
  return (
    <Box>
      <Box minH={scrollContainerHeight} pb={grid} ref={dropProvided.innerRef}>
        <InnerLessonList {...props} />
        {dropProvided.placeholder}
      </Box>
    </Box>
  );
};

interface LessonListProps {
  sectionId: string;
  title: string;
  courseId: string;
  ignoreContainerClipping: boolean;
  internalScroll: boolean;
  listType: string;
  isDropDisabled: boolean;
}

const LessonList: React.FC<LessonListProps> = ({
  ignoreContainerClipping,
  internalScroll,
  isDropDisabled,
  listType,
  title,
  sectionId,
  courseId,
}) => {
  return (
    <Droppable
      droppableId={sectionId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={false}
      isCombineEnabled={false}
    >
      {(dropProvided, dropSnapshot) => (
        <DraggableContainer
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <InnerList
            sectionId={sectionId}
            courseId={courseId}
            title={title}
            dropProvided={dropProvided}
          />
        </DraggableContainer>
      )}
    </Droppable>
  );
};

export default LessonList;
