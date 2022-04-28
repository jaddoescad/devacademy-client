import React, { useEffect } from "react";
import { useRouter } from "next/router";

interface LessonVideoPreviewProps {}

export const LessonVideoPreview: React.FC<LessonVideoPreviewProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.lessonVideoUrl);
  }, []);

  return (
    <iframe
      src={
        router.query.lessonVideoUrl +
        "&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"
      }
      width="1000"
      height="300"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen={false}
      title="Untitled"
    ></iframe>
  );
};

export default LessonVideoPreview;
