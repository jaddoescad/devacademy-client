import React, { Component, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "./constants";
import { Draggable } from "react-beautiful-dnd";
import LessonList from "./lesson-list";
import { Box, Button, Flex, Text,IconButton } from "@chakra-ui/react";
import PopoverEditForm from "./titleInputForm";
import {
  useChangeSectionTitleMutation,
  useInstructorCourseQuery,
} from "src/generated/graphql";
import { FiEdit2, FiTrash, FiTrash2, FiMenu } from "react-icons/fi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import PopoverDeleteForm from "./deleteForm";

interface Props {
  sectionId: string;
  sectionIndex: number;
  title: string;
  courseData: any;
  courseId: string;
}

const Section: React.FC<Props> = ({
  sectionId,
  sectionIndex,
  title,
  courseData,
  courseId,
  ...props
}) => {
  const [showHeaderItem, setShowHeaderItem] = React.useState(false);
  const [showAddSectionItem, setShowSectionItem] = React.useState(false);
  const [keepFocus, setKeepFocus] = React.useState(false);
  const [keepFocusSection, setKeepFocusSection] = React.useState(false);


  return (
    <Draggable key={sectionId} draggableId={sectionId} index={sectionIndex}>
      {(sectionDraggableProvided, snapshot) => (
        <Box
          {...sectionDraggableProvided.draggableProps}
          ref={sectionDraggableProvided.innerRef}
        >
          <Box
            onMouseOver={() => setShowSectionItem(true)}
            onMouseLeave={() => setShowSectionItem(false)}
            height="50px"
            width={"100%"}
          >
            <Box >
              <PopoverEditForm
                {...props}
                setKeepFocus={setKeepFocusSection}
                sectionIndex={sectionIndex}
                elementType="section"
                courseData={courseData}
                courseId={courseId}
              />
            </Box>
          </Box>
          <Box
            border={"1px solid #212121"}
            backgroundColor="#F1F1F1"
            pl="5"
            pr="5"
          >
            <Box>
              <Box
                h={"75px"}
                pt="5"
                fontSize={"18"}
                {...sectionDraggableProvided.dragHandleProps}
                onMouseOver={() => setShowHeaderItem(true)}
                onMouseLeave={() => setShowHeaderItem(false)}
              >
                <Flex align={"center"}>
                  <Text>{title}</Text>
                  <Flex flex={1} 
                              
                  >
                    <Flex
                      flex={1}
                    >
                      <PopoverEditForm
                        elementType="section"
                        action="edit"
                        sectionId={sectionId}
                        setKeepFocus={setKeepFocus}
                        actionComponent={<FiEdit2 />}
                      />
                      <PopoverDeleteForm
                        elementType="section"
                        courseId={courseId}
                        sectionId={sectionId}
                        setKeepFocus={setKeepFocus}
                        actionComponent={<FiTrash />}
                      />
                    </Flex>
                    <Box>
                    <PopoverDeleteForm
                        courseId={courseId}
                        actionComponent={<FiMenu />}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              <LessonList
                sectionId={sectionId}
                listType="LESSON"
                courseId={courseId}
                internalScroll={false}
                title={title}
                isDropDisabled
                ignoreContainerClipping
              />
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default Section;
