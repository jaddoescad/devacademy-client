import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import LessonItem from "./lesson-item";
import { grid } from "./constants";
import PopoverEditForm from "./titleInputForm";

// import { useInstructorCourseQuery } from "src/generated/graphql";
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
  courseData: any;
}

const InnerLessonList: React.FC<InnerLessonListProps> = ({
  courseId,
  sectionId,
  courseData,
  ...props
}) => {
  const [keepFocus, setKeepFocus] = useState(false);

  return (
    <Box>
      {courseData?.courseCurriculum?.sections?.[sectionId]?.lessonOrder?.map(
        (lessonId, lessonIndex) => {
          const lesson = courseData?.courseCurriculum?.articles?.[lessonId];
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
                    lesson={lesson}
                    courseData={courseData}
                    {...props}
                  />
                </Box>
              )}
            </Draggable>
          );
        }
      )}
      <HoverToShowWrapper keepFocus={keepFocus}>
        <Box height="50px">
          <Box>
            <PopoverEditForm
              course={courseData}
              elementType="lesson"
              action="create"
              courseId={courseId}
              lessonIndex={
                courseData?.courseCurriculum.sections?.[sectionId]?.lessonOrder
                  ?.length
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
  courseData: any;
}

const InnerList: React.FC<InnerListProps> = ({
  dropProvided,
  title,
  courseData,
  ...props
}) => {
  return (
    <Box>
      <Box minH={scrollContainerHeight} pb={grid} ref={dropProvided.innerRef}>
        <InnerLessonList courseData={courseData} {...props} />
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
  courseData: any;
}

const LessonList: React.FC<LessonListProps> = ({
  ignoreContainerClipping,
  internalScroll,
  isDropDisabled,
  listType,
  title,
  sectionId,
  courseId,
  courseData,
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
            courseData={courseData}
            dropProvided={dropProvided}
          />
        </DraggableContainer>
      )}
    </Droppable>
  );
};

export default LessonList;
