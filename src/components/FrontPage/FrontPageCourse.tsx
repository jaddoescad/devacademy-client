// Sample card from Airbnb
import { Box, Badge, Stack, Flex, Image, AspectRatio } from "@chakra-ui/react";
 
interface Course {
  iurl: string;
  title: string;
  author: string;
}


const FrontPageCourse: React.FC<Course> = (props: Course) => {
  return (
    <Box w="250px" borderWidth="1px" borderColor={"#1D1E26"}  borderRadius="lg" overflow="hidden">
      <AspectRatio  width={"100%"} ratio={6 / 4}>
          <Image src={props.iurl} alt={props.iurl} />
          </AspectRatio>

        <Stack padding={"5"}  bg="#37384A">
          <Box height="50px" fontWeight="semibold" color={"white"} as="h4" lineHeight="tight" mb="5">
            {props.title}
          </Box>
          <Box color={"lightgray"}  fontSize="15">{props.author}</Box>
        </Stack>
    </Box>
  );
}

export default FrontPageCourse;