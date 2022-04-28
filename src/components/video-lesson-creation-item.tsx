import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { checkTranscode } from "src/services/checkTranscode";
import { useRouter } from "next/router";

interface VideoLessonCreationItemProps {
  lessonVideoUrl: any;
}

export const VideoLessonCreationItem: React.FC<
  VideoLessonCreationItemProps
> = ({ lessonVideoUrl }) => {
  const checkIfProcessing = (lessonVideoUrl) => {
    // checkTranscode(lessonVideoUrl)
  };

  useEffect(() => {
    // checkIfProcessing(lessonVideoUrl)
  }, []);

  return (
    <>
      {/* <iframe
        src={
          lessonVideoUrl +
          "&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"
        }
        width="1000"
        height="300"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={false}
        title="Untitled"
      ></iframe> */}
      <iframe
        src={
          lessonVideoUrl +
          "&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900;controls=0"
        }
        width="100"
        height="100"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={false}
        title="Untitled"
      ></iframe>
    </>
  );
};

export default VideoLessonCreationItem;
