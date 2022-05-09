import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import reorder, { reorderLessonMap } from "src/utility/reorder";
import {
  ChangeLessonOrderDifferentSectionDocument,
  ChangeLessonOrderDifferentSectionMutation,
  ChangeLessonOrderDifferentSectionMutationFn,
  ChangeLessonOrderDifferentSectionMutationHookResult,
  ChangeLessonOrderDifferentSectionMutationOptions,
  ChangeLessonOrderDifferentSectionMutationResult,
  ChangeLessonOrderSameSectionMutationFn,
  Exact,
  InstructorCourseDocument,
} from "src/generated/graphql";
import { LessonOrder } from "src/types/lesson";

export const createSectionService = async (
  data: any,
  sectionIndex: string,
  createSection: Function,
  courseId: string,
  title: string
) => {
  let sectionId = uuidv4();
  if (data?.course?.sectionOrder) {
    let sectionOrder = [
      ...data.course.sectionOrder.slice(0, sectionIndex),
      sectionId,
      ...data?.course?.sectionOrder.slice(
        sectionIndex,
        data?.course?.sectionOrder.length
      ),
    ];

    await createSection({
      variables: {
        sectionId: sectionId,
        courseId: courseId,
        title: title,
        sectionOrder: sectionOrder,
      },

      update: (cache: ApolloCache<any>) => {
        cache.evict({
          fieldName: "course",
        });
      },
    });
  } else {
    console.log("no section order");
  }
};

export const createLessonService = async (
  data: any,
  lessonIndex: string,
  createLesson: Function,
  sectionId: string,
  title: string
) => {
  const lessonId = uuidv4();
  var lessonOrder = data?.course?.sections?.find(
    (x) => x.id === sectionId
  )?.lessonOrder;
  console.log(data);
  if (lessonOrder) {
    lessonOrder = [
      ...lessonOrder.slice(0, lessonIndex),
      lessonId,
      ...lessonOrder.slice(lessonIndex, lessonOrder.length),
    ];
  } else {
    lessonOrder = [lessonId];
  }

  await createLesson({
    variables: {
      sectionId: sectionId,
      lessonOrder: lessonOrder,
      lessonId: lessonId,
      title: title,
    },
    update: (cache: ApolloCache<any>) => {
      cache.evict({
        fieldName: "course",
      });
    },
  });
};

export const changeSectionTitleService = async (
  sectionId: string,
  title: string,
  changeSectionTitle: Function
) => {
  changeSectionTitle({
    variables: {
      sectionId,
      title: title,
    },
    optimisticResponse: {
      __typename: "Mutation",
      changeSectionTitle: {
        __typename: "Section",
        id: sectionId,
        title: title,
      },
    },
    update: (cache: ApolloCache<any>) => {
      cache.evict({
        fieldName: "course",
      });
    },
  });
};

export const changeLessonTitleService = async (
  lessonId: string,
  title: string,
  changeLessonTitle: Function
) => {
  changeLessonTitle({
    variables: {
      lessonId: lessonId,
      title: title,
    },
    optimisticResponse: {
      __typename: "Mutation",
      changeLessonTitle: {
        __typename: "Lesson",
        id: lessonId,
        title: title,
      },
    },
    update: (cache: ApolloCache<any>) => {
      cache.evict({
        fieldName: "course",
      });
    },
  });
};

export const reorderSectionService = (
  courseData: any,
  sourceIndex: number,
  destinationIndex: number,
  changeSection: Function,
  courseId: string
) => {
  const ordered_ = reorder(
    courseData?.course?.sectionOrder,
    sourceIndex,
    destinationIndex
  ) as string[];
  changeSection({
    variables: {
      courseId: courseId,
      sectionOrder: ordered_,
    },
    optimisticResponse: {
      changeSectionOrder: {
        __typename: "Course",
        id: courseId,
        sectionOrder: ordered_,
      },
    },
    update: async (cache: ApolloCache<any>) => {
      cache.evict({
        fieldName: "course",
      });
    },
  });
};

// export type ChangeLessonOrderDifferentSectionMutationHookResult;
// export type ChangeLessonOrderDifferentSectionMutationResult;
// export type ChangeLessonOrderDifferentSectionMutationOptions;

export const reorderLessonService = (
  courseData: any,
  source: number,
  destination: number,
  changeLessonOrderSameSection: Function,
  changeLessonOrderDifferentSection: ChangeLessonOrderDifferentSectionMutationFn
  // changeLessonOrderDifferentSection: (
  //   options?:
  //     | MutationFunctionOptions<
  //         ChangeLessonOrderDifferentSectionMutation,
  //         Exact<{
  //           nextLessonOrder: string | string[];
  //           currentLessonOrder: string | string[];
  //           currentLessonId: string;
  //           currentSectionId: string;
  //           nextSectionId: string;
  //         }>,
  //         DefaultContext,
  //         ApolloCache<any>
  //       >
  //     | undefined
  // ) => Promise<
  //   FetchResult<
  //     ChangeLessonOrderDifferentSectionMutation,
  //     Record<string, any>,
  //     Record<string, any>
  //   >
  // >
) => {
  const lessonOrderData: LessonOrder = reorderLessonMap(
    courseData,
    source,
    destination
  );
  if (lessonOrderData.type === "same-section") {
    changeLessonOrderSameSection({
      variables: {
        sectionId: lessonOrderData.sectionId,
        lessonOrder: lessonOrderData.lessonOrder,
      },
      optimisticResponse: {
        changeLessonOrderSameSection: {
          __typename: "Section",
          id: lessonOrderData.sectionId,
          lessonOrder: lessonOrderData.lessonOrder,
        },
      },
      update: async (cache: ApolloCache<any>) => {
        cache.evict({
          fieldName: "course",
        });
      },
    });
  } else if (lessonOrderData.type === "different-section") {
    if (
      lessonOrderData.currentLessonOrder &&
      lessonOrderData.nextLessonOrder &&
      lessonOrderData.currentLessonId &&
      lessonOrderData.currentSectionId &&
      lessonOrderData.nextSectionId
    ) {
      changeLessonOrderDifferentSection({
        variables: {
          currentLessonOrder: lessonOrderData.currentLessonOrder,
          currentLessonId: lessonOrderData.currentLessonId,
          nextLessonOrder: lessonOrderData.nextLessonOrder,
          currentSectionId: lessonOrderData.currentSectionId,
          nextSectionId: lessonOrderData.nextSectionId,
        },
        optimisticResponse: {
          __typename: "Mutation",
          changeLessonOrderDifferentSection: {
            __typename: "OrderedLessonsInMultipleSections",
            nextSection: {
              __typename: "Section",
              id: lessonOrderData.nextSectionId,
              lessonOrder: lessonOrderData.nextLessonOrder,
              lessons: [
                ...lessonOrderData.nextLessons,
                {
                  __typename: "Lesson",
                  id: lessonOrderData.currentLessonId,
                  title: lessonOrderData.lesson.title,
                },
              ],
            },
            currentSection: {
              __typename: "Section",
              id: lessonOrderData.currentSectionId,
              lessonOrder: lessonOrderData.currentLessonOrder,
            },
            currentLesson: {
              __typename: "Lesson",
              id: lessonOrderData.currentLessonId,
              sectionId: lessonOrderData.nextSectionId,
              title: lessonOrderData.lesson.title,
            },
          },
        },
        update: async (cache: ApolloCache<any>, { data }) => {
          const query: any = cache.readQuery({
            query: InstructorCourseDocument,
            variables: {
              courseId: courseData.course.id,
            },
          });

          cache.evict({
            fieldName: "course",
          });
        },
      });
    } else {
      console.log("error reordering");
    }
  }
};
