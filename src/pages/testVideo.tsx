import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {checkTranscode} from "src/services/checkTranscode";

interface testVideoProps {}

export const testVideo: React.FC<testVideoProps> = ({}) => {

    // useEffect(() => {
    //     console.log("checking")
    //     checkTranscode()
    // }, [])

  return (
    <Box>
      <iframe
        src="https://player.vimeo.com/video/702688891?h=71abbc418c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=243900"
        width="400"
        height="300"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Untitled"
      ></iframe>
    </Box>
  );
};

export default testVideo;
