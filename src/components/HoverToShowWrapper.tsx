import { Box } from "@chakra-ui/react";
import React from "react";

interface HoverToShowWrapperProps {}

export const HoverToShowWrapper: React.FC<HoverToShowWrapperProps> = ({
  children,
}) => {
  const [hide, setHide] = React.useState(true);

  return (
    <Box
      width={"100%"}
      height="50px"
      onMouseEnter={(e) => {
        console.log("entered");
        setHide(false);
      }}
      onMouseLeave={(e) => {
        setHide(true);
      }}
    >
      <Box hidden={hide}>{children}</Box>
    </Box>
  );
};

export default HoverToShowWrapper;
