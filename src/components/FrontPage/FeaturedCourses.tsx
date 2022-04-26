import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import FrontPageCourse from "./FrontPageCourse";

export default function FeaturedCourses() {
  return (
    <Center marginTop={"100px"}>
      <Box bg="FrontPageSecondary" flex={"1"} >
        <Center color={"white"} fontSize={"25px"} fontWeight={"600"} pt="7">
          Featured Courses
        </Center>
        <Center>
          <SimpleGrid p={4} columns={[1, 1, 1, 3, 3]} spacing={10}>
            <FrontPageCourse title = "The Complete Java Course" author= "Rayan Slim" iurl="https://firebasestorage.googleapis.com/v0/b/learnthepart-75aed.appspot.com/o/Group%201%201%20(1)%20(1).png?alt=media&token=2dfb3c28-c103-4e0f-ac1f-0f34609f52f5" />
            <FrontPageCourse title = "End to End Python Bootcamp" author = "Sarmad Tanveer" iurl="https://firebasestorage.googleapis.com/v0/b/learnthepart-75aed.appspot.com/o/Group%201%20(1)%20(1).png?alt=media&token=35451322-8906-4594-8f47-6f7420452fc9" />
            <FrontPageCourse title = "Getting Started with Web3" author = "Jose Portilla" iurl="https://firebasestorage.googleapis.com/v0/b/learnthepart-75aed.appspot.com/o/Group%202%20(1).png?alt=media&token=3cd2d5f3-c819-4553-80d2-238fc07d3b52" />
          </SimpleGrid>
        </Center>
      </Box>
    </Center>
  );
}
