import { ApolloCache } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import reorder, {reorderLessonMap} from "src/utility/reorder";

export const createSectionService = async (
  data: any,
  sectionIndex: string,
  createSection: Function,
  courseId: string,
  title: string
) => {
  let sectionId = uuidv4();
  // data?.course?.sectionOrder
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

export const reorderLessonService = (
  courseData: any,
  source: number,
  destination: number,
  changeLessonOrderSameSection: Function,
  changeLessonOrderDifferentSection: Function,
) => {
  const data = reorderLessonMap(courseData, source, destination);
  if (data.type === "same-section") {
    changeLessonOrderSameSection({
      variables: {
        sectionId: data.sectionId,
        lessonOrder: data.lessonOrder,
      },
      optimisticResponse: {
        changeLessonOrderSameSection: {
          __typename: "Section",
          id: data.sectionId,
          lessonOrder: data.lessonOrder,
        },
      },
      update: async (cache: ApolloCache<any>) => {
        cache.evict({
          fieldName: "course",
        });
      },
    });
  } else if (data.type === "different-section") {
    changeLessonOrderDifferentSection({
      variables: {
        currentLessonOrder: data.currentLessonOrder,
        currentLessonId: data.currentLessonId,
        nextLessonOrder: data.nextLessonOrder,
        currentSectionId: data.currentSectionId,
        nextSectionId: data.nextSectionId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        changeLessonOrderDifferentSection: {
          __typename: "OrderedLessonsInMultipleSections",
          nextSection: {
            __typename: "Section",
            id: data.nextSectionId,
            lessonOrder: data.nextLessonOrder,
            lessons: [
              ...data.nextLessons,
              {
                __typename: "Lesson",
                id: data.currentLessonId,
                title: data.lesson.title,
              },
            ],
          },
          currentSection: {
            __typename: "Section",
            id: data.currentSectionId,
            lessonOrder: data.currentLessonOrder,
          },
          currentLesson: {
            __typename: "Lesson",
            id: data.currentLessonId,
            sectionId: data.nextSectionId,
            title: data.lesson.title,
          },
        },
      },
      update: async (cache: ApolloCache<any>) => {
        cache.evict({
          fieldName: "course",
        });
      },
    });
  }
};
