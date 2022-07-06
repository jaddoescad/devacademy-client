export function checkNoVideo(courseCurriculum) {
    Object.keys(courseCurriculum.articles).forEach((lessonId) => {
    if (!courseCurriculum.articles[lessonId].isArticle && !courseCurriculum.articles[lessonId].videoEmbedUrl) {
            throw("Error, please make sure to have a content in each lesson")
       }
    });
}
