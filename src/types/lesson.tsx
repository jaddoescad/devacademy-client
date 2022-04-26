export interface LessonOrder {
    lessonOrder?: string[];
    sectionId?: string;
    nextLessonOrder?: string[];
    currentLessonOrder?: string[];
    nextSectionId?: string;
    currentSectionId?: string;
    currentLessonId?: string,
    nextLessonId?: string,
    lesson?: any;
    nextLessons?: any;
    type: "same-section" | "different-section" | "no-change";
}