// import { InstructorCourseQuery } from 'src/generated/graphql';
import { LessonOrder } from "src/types/lesson";
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderLessonMap = (
  courseData,
  source: any,
  destination: any
): LessonOrder => {
  const sections = courseData?.courseCurriculum?.sections;

  const sectionSource = sections?.[source.droppableId];
  const sectionDestination = sections?.[destination.droppableId];

  if (sectionSource && sectionDestination && sections) {
    const current = sectionSource?.lessonOrder
      ? [...sectionSource?.lessonOrder]
      : [];
    const next = sectionDestination?.lessonOrder
      ? [...sectionDestination?.lessonOrder]
      : [];
    const target = current[source.index];
    const targetDestination = next[destination.index];

    // // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(
        current,
        source.index,
        destination.index
      ) as string[];

      // const result = {
      //   ...courseData,
      //   sections: {
      //     ...sections,
      //     [sectionDestination?.id]: {
      //       ...sections.find((x) => x.id === source.droppableId),
      //       lessonOrder: [...reordered],
      //     },
      //   },
      // };
      return {
        lessonOrder: [...reordered],
        sectionId: sectionDestination?.id,
        type: "same-section",
      };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const lessons = sections?.[source.droppableId]?.lessons;
    const lesson = lessons?.[target];

    const nextLessons = sections?.[destination.droppableId]?.lessons;

    return {
      nextLessonOrder: [...next],
      currentLessonOrder: [...current],
      nextSectionId: destination.droppableId,
      currentSectionId: source.droppableId,
      currentLessonId: target,
      nextLessonId: targetDestination,
      lesson: lesson,
      nextLessons: nextLessons,
      type: "different-section",
    };
  }

  return {
    type: "no-change",
  };
};
