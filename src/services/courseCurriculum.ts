import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import reorder, { reorderLessonMap } from "src/utility/reorder";
// import {
//   ChangeLessonOrderDifferentSectionDocument,
//   ChangeLessonOrderDifferentSectionMutation,
//   ChangeLessonOrderDifferentSectionMutationFn,
//   ChangeLessonOrderDifferentSectionMutationHookResult,
//   ChangeLessonOrderDifferentSectionMutationOptions,
//   ChangeLessonOrderDifferentSectionMutationResult,
//   ChangeLessonOrderSameSectionMutationFn,
//   Exact,
//   InstructorCourseDocument,
// } from "src/generated/graphql";
import { LessonOrder } from "src/types/lesson";
import {
  createSection,
  createLesson,
  changeSectionTitle,
  changeLessonTitle,
  reorderSection,
  changeLessonOrderSameSection,
  changeLessonOrderDifferentSection,
} from "src/services/firestore";

export const createSectionService = async (
  data: any,
  sectionIndex: string,
  courseId: string,
  title: string
) => {
  let sectionId = uuidv4();
  var sectionOrder = data?.courseCurriculum?.sectionOrder;

  if (data?.courseCurriculum?.sectionOrder) {
    sectionOrder = [
      ...sectionOrder.slice(0, sectionIndex),
      sectionId,
      ...sectionOrder.slice(sectionIndex, sectionOrder.length),
    ];
  } else {
    sectionOrder = [sectionId];
  }
  return createSection(sectionId, courseId, title, sectionOrder);
};

export const createLessonService = async (
  course: any,
  lessonIndex: string,
  sectionId: string,
  title: string,
  courseId: string
) => {
  const lessonId = uuidv4();

  var lessonOrder =
    course?.courseCurriculum?.sections?.[sectionId]?.lessonOrder;

  if (lessonOrder) {
    lessonOrder = [
      ...lessonOrder.slice(0, lessonIndex),
      lessonId,
      ...lessonOrder.slice(lessonIndex, lessonOrder.length),
    ];
  } else {
    lessonOrder = [lessonId];
  }

  return createLesson(sectionId, lessonOrder, lessonId, title, courseId);
};

export const changeSectionTitleService = async (
  sectionId: string,
  courseId: string,
  title: string
) => {
  changeSectionTitle(sectionId, courseId, title);
};

export const changeLessonTitleService = async (
  lessonId: string,
  courseId: string,
  title: string
) => {
  changeLessonTitle(lessonId, courseId, title);
};

export const reorderSectionService = (
  courseData: any,
  sourceIndex: number,
  destinationIndex: number,
  courseId: string
) => {
  const ordered_ = reorder(
    courseData?.courseCurriculum?.sectionOrder,
    sourceIndex,
    destinationIndex
  ) as string[];
  return reorderSection(ordered_, courseId);
};

export const reorderLessonService = (
  courseData: any,
  source: number,
  destination: number,
  courseId: string
) => {
  const lessonOrderData: LessonOrder = reorderLessonMap(
    courseData,
    source,
    destination
  );
  if (lessonOrderData.type === "same-section") {
    changeLessonOrderSameSection(
      courseId,
      lessonOrderData.sectionId,
      lessonOrderData.lessonOrder
    );
  } else if (lessonOrderData.type === "different-section") {
    if (
      lessonOrderData.currentLessonOrder &&
      lessonOrderData.nextLessonOrder &&
      lessonOrderData.currentLessonId &&
      lessonOrderData.currentSectionId &&
      lessonOrderData.nextSectionId
    ) {
      changeLessonOrderDifferentSection(
        lessonOrderData.currentLessonOrder,
        lessonOrderData.currentLessonId,
        lessonOrderData.nextLessonOrder,
        lessonOrderData.nextLessonId,
        lessonOrderData.currentSectionId,
        lessonOrderData.nextSectionId,
        courseId
      );

      // changeLessonOrderDifferentSection({
      //   variables: {
      //     currentLessonOrder: lessonOrderData.currentLessonOrder,
      //     currentLessonId: lessonOrderData.currentLessonId,
      //     nextLessonOrder: lessonOrderData.nextLessonOrder,
      //     currentSectionId: lessonOrderData.currentSectionId,
      //     nextSectionId: lessonOrderData.nextSectionId,
      //   },
      //   optimisticResponse: {
      //     __typename: "Mutation",
      //     changeLessonOrderDifferentSection: {
      //       __typename: "OrderedLessonsInMultipleSections",
      //       nextSection: {
      //         __typename: "Section",
      //         id: lessonOrderData.nextSectionId,
      //         lessonOrder: lessonOrderData.nextLessonOrder,
      //         lessons: [
      //           ...lessonOrderData.nextLessons,
      //           {
      //             __typename: "Lesson",
      //             id: lessonOrderData.currentLessonId,
      //             title: lessonOrderData.lesson.title,
      //           },
      //         ],
      //       },
      //       currentSection: {
      //         __typename: "Section",
      //         id: lessonOrderData.currentSectionId,
      //         lessonOrder: lessonOrderData.currentLessonOrder,
      //       },
      //       currentLesson: {
      //         __typename: "Lesson",
      //         id: lessonOrderData.currentLessonId,
      //         sectionId: lessonOrderData.nextSectionId,
      //         title: lessonOrderData.lesson.title,
      //       },
      //     },
      //   },
      //   update: async (cache: ApolloCache<any>, { data }) => {
      //     const query: any = cache.readQuery({
      //       query: InstructorCourseDocument,
      //       variables: {
      //         courseId: courseData.course.id,
      //       },
      //     });
      //     cache.evict({
      //       fieldName: "course",
      //     });
      //   },
      // });
    } else {
      console.log("error reordering");
    }
  }
};
