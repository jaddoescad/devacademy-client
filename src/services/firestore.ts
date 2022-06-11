import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  deleteField,
  arrayRemove,
} from "firebase/firestore";
import { db } from "src/firebase";

//add data
export const createCourse = (title, uid) => {
  return addDoc(collection(db, "instructorCourses"), {
    uid,
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const createUser = (uid, name, email) => {
  return setDoc(doc(db, "instructor", uid), {
    uid,
    name,
    email,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const saveCourseInfoWithImage = (
  courseId,
  title,
  description,
  imageUrl
) => {
  console.log(imageUrl);
  const courseRef = doc(db, "instructorCourses", courseId);
  return updateDoc(courseRef, {
    title,
    description,
    imageUrl,
    updatedAt: new Date(),
  });
};

export const saveCourseInfoWithoutImage = (courseId, title, description) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  return updateDoc(courseRef, {
    title,
    description,
    updatedAt: new Date(),
  });
};

export const createSection = (sectionId, courseId, title, sectionOrder) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        sectionOrder,
        sections: {
          [sectionId]: {
            id: sectionId,
            courseId,
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

export const createLesson = (
  sectionId,
  lessonOrder,
  lessonId,
  title,
  courseId
) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        articles: {
          [lessonId]: {
            id: lessonId,
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        sections: {
          [sectionId]: {
            lessonOrder,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

//update data

export const changeSectionTitle = async (sectionId, courseid, title) => {
  const sectionRef = doc(db, "instructorCourses", courseid);
  return setDoc(
    sectionRef,
    {
      courseCurriculum: {
        sections: {
          [sectionId]: {
            title,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

export const changeLessonTitle = async (lessonId, courseid, title) => {
  const lessonRef = doc(db, "instructorCourses", courseid);
  return setDoc(
    lessonRef,
    {
      courseCurriculum: {
        articles: {
          [lessonId]: {
            title,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

export const reorderSection = async (sectionOrder, courseId) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        sectionOrder,
        updatedAt: new Date(),
      },
    },
    { merge: true }
  );
};

export const changeLessonOrderSameSection = (
  courseId,
  sectionId,
  lessonOrder
) => {
  const courseRef = doc(db, "instructorCourses", courseId);

  console.log("changeLessonOrderSameSection");
  console.log(lessonOrder);
  console.log(sectionId);
  console.log(courseId);
  console.log("changeLessonOrderSameSection");
  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        sections: {
          [sectionId]: {
            lessonOrder,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

export const changeLessonOrderDifferentSection = (
  currentLessonOrder,
  currentLessonId,
  nextLessonOrder,
  nextLessonId,
  currentSectionId,
  nextSectionId,
  courseId
) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        sections: {
          [currentSectionId]: {
            lessonOrder: currentLessonOrder,
            updatedAt: new Date(),
          },
          [nextSectionId]: {
            lessonOrder: nextLessonOrder,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

export const saveVideo = (lessonId, courseId, videoUrl, videoEmbedUrl) => {
  const lessonRef = doc(db, "instructorCourses", courseId);
  return setDoc(
    lessonRef,
    {
      courseCurriculum: {
        articles: {
          [lessonId]: {
            videoUrl,
            videoEmbedUrl,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

//read data
export const getInstructorCourses = async (uid) => {
  const q = query(collection(db, "instructorCourses"), where("uid", "==", uid));
  return getDocs(q);
};

export const getCourse = async (id) => {
  const docRef = doc(db, "instructorCourses", id);
  return getDoc(docRef);
};

//live data
export const getInstructorCourseCurriculumObserver = (courseId, setCourse) => {
  console.log("here");
  return onSnapshot(
    doc(db, "instructorCourses", courseId),
    (doc) => {
      console.log("course data observer", doc.data());
      setCourse(doc.data());
    },
    (error) => {
      console.log(error);
    }
  );

  // return unsub;
};

//delete data
export const deleteSection = (sectionId, courseId, courseData) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  const sectionOrder = courseData.courseCurriculum.sectionOrder;
  var index = sectionOrder.indexOf(sectionId);
  if (index !== -1) {
    sectionOrder.splice(index, 1);
  }

  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        sectionOrder: sectionOrder,
      },
    },
    { merge: true }
  );
};

export const deleteLesson = (lessonId, sectionId, courseId, courseData) => {
  const courseRef = doc(db, "instructorCourses", courseId);
  const lessonOrder =
    courseData.courseCurriculum.sections[sectionId].lessonOrder;
  var index = lessonOrder.indexOf(lessonId);
  if (index !== -1) {
    lessonOrder.splice(index, 1);
  }

  return setDoc(
    courseRef,
    {
      courseCurriculum: {
        sections: {
          [sectionId]: {
            lessonOrder: lessonOrder,
            updatedAt: new Date(),
          },
        },
      },
    },
    { merge: true }
  );
};

export const deleteVideoUrl = (lessonId,  courseId) => {
  const courseRef = doc(db, "instructorCourses", courseId);

  return setDoc(courseRef, {
    courseCurriculum: {
      articles: {
        [lessonId]: {
          videoUrl: null,
          videoEmbedUrl: null,
          updatedAt: new Date(),
        },
      },
    },
  }, { merge: true });
};
