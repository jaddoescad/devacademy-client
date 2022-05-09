import { Box } from "@chakra-ui/react";
import React from "react";

interface HoverToShowWrapperProps {
    keepFocus?: boolean;
    keepLessonFocus?: boolean;
}

export const HoverToShowWrapper: React.FC<HoverToShowWrapperProps> = ({
  children,
  keepFocus,
  keepLessonFocus
}) => {
  const [hide, setHide] = React.useState(true);

  return (
    <Box
    flex={1}
      height="50px"
      onMouseEnter={(e) => {
        console.log("entered");
        setHide(false);
      }}
      onMouseLeave={(e) => {
        setHide(true);
      }}
    >
      <Box hidden={keepFocus || keepLessonFocus ? false : hide}>{children}</Box>
    </Box>
  );
};

export default HoverToShowWrapper;
