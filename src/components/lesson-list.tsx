import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import LessonItem from "./lesson-item";
import { grid } from "./constants";
import PopoverEditForm from "./titleInputForm";

import { useInstructorCourseQuery } from "src/generated/graphql";
import { Box, Text } from "@chakra-ui/react";

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
                    isDragging={dragSnapshot.isDragging}
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

      <Box height="50px">
        <Box>
          <PopoverEditForm
            elementType="lesson"
            action="create"
            lessonIndex={
              data.course?.sections?.find((x) => x.id === sectionId)
                ?.lessonOrder.length
            }
            sectionId={sectionId}
            {...props}
          />
        </Box>
      </Box>
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
      {title}
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
  // static defaultProps = {
  //   listId: "LIST",
  // };

  return (
    <Droppable
      droppableId={sectionId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={false}
    >
      {(dropProvided, dropSnapshot) => (
        <DraggableContainer
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <Box
              overflowX="hidden"
              overflowY="auto"
              maxHeight={scrollContainerHeight}
            >
              <InnerList
                title={title}
                dropProvided={dropProvided}
                sectionId={sectionId}
                courseId={courseId}
              />
            </Box>
          ) : (
            <InnerList
              sectionId={sectionId}
              courseId={courseId}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </DraggableContainer>
      )}
    </Droppable>
  );
};

export default LessonList;
