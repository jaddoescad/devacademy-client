export function checkNoVideo(courseCurriculum) {

    courseCurriculum.sectionOrder.forEach((sectionId) => {
        courseCurriculum.sections[sectionId].lessonOrder.forEach((lessonId) => {
            if (!courseCurriculum.articles[lessonId].isArticle && !courseCurriculum.articles[lessonId].videoEmbedUrl) {
                throw("Error, please make sure to have a content in each lesson")
           }
        })
    })
}
