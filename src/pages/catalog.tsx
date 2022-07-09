import Pagination from "src/components/pagination";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Image,
  Text,
  Center,
  Grid,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Navigation from "src/components/common/Navigation";
// import { usePaginatedCoursesQuery } from "src/generated/graphql";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";
import { capitalize } from "src/utils/capitalize";
import { firebase } from "src/firebase";
import { getPublishedCourses } from "src/services/firestore";
import { DocumentData } from "firebase/firestore";
import {SubscriptionAlert} from 'src/components/subscription-alert'

const Post = () => {
  const router = useRouter();
  const limit = 3;
  const [coursesSet, setCoursesSet] = useState(false);
  const [courses, setCourses] = useState<DocumentData[]>([]);


  useEffect(() => {
    if (firebase.auth().currentUser?.uid && !coursesSet) {
      getPublishedCourses(firebase.auth().currentUser?.uid).then(
        (querySnapshot) => {
          let courses_: DocumentData[] = [];
          querySnapshot.docs.forEach((doc) => {
            courses_.push({ ...doc.data(), id: doc.id });
          });
          setCourses(courses_);
          setCoursesSet(true);
        }
      );
    }
  }, [firebase.auth().currentUser?.uid]);

  const handlePageClick = (pageNumber: number) => {
    console.log(pageNumber);
    router.push({
      pathname: "/catalog",
      query: {
        p: pageNumber,
      },
    });
  };

  // if (!loading && !data) {
  //   return (
  //     <div>
  //       <div>you got query failed for some reason</div>
  //       <div>{error?.message}</div>
  //     </div>
  //   );
  // }

  return (
    <Box
      display="flex"
      flexDir={"column"}
      backgroundColor={"white"}
      height="100vh"
      w="100%"
    >
      <Navigation />
      <SubscriptionAlert />
      <Flex flex="1" flexDir={"column"} align="center">
        <Box pl={5} pr={5} height={"100%"} width="100%" maxWidth={"1200px"}>
          <Box mb="4" mt="4">
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Discover Awesome Courses
            </Text>
          </Box>

          {courses.map((course) => (
            <Box
              width={"300px"}
              key={course.id}
              bg="white"
              cursor={"pointer"}
              color="black"
              border={"1px solid #007ab6"}
              marginBottom={"30px"}
              onClick={() => {
                router.push({
                  pathname: `/course/${course.id}`,
                });
              }}
            >
              <Box>
                <Image
                  width={"100%"}
                  height={"150px"}
                  // borderTopRadius={"5px"}
                  overflow="hidden"
                  objectFit="cover"
                  src={course.imageUrl}
                  alt={"course image"}
                />

                <Flex flexDir={"column"} h="75px" m="15px" flex={1}>
                  <Box
                    fontSize={"1rem"}
                    fontWeight={"bold"}
                    flex={1}
                  >
                    {course.title}
                  </Box>
                  <Box fontSize={"0.8rem"}>{`${course.instructorName}`}</Box>
                </Flex>
              </Box>
            </Box>
          ))}
          <Box>
            {/* <Pagination
                total={data.courses.count}
                pageSize={variables!.limit}
                value={router.query.p ? parseInt(router.query.p as string) : 1}
                onPageChange={handlePageClick}
                hasNextPage={
                  parseInt(router.query.p as string) ===
                  Math.ceil(data.courses.count / variables!.limit)
                    ? false
                    : true
                }
                hasPreviousPage={true}
              /> */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default withApollo({ ssr: false })(Post);
