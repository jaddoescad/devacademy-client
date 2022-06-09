import Pagination from "src/components/pagination";
import { useRouter } from "next/router";
import React from "react";
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

const Post = () => {
  const router = useRouter();
  const limit = 3;
  // const { data, error, loading, fetchMore, variables } =
  //   usePaginatedCoursesQuery({
  //     variables: {
  //       limit: limit,
  //       offset: router.query.p
  //         ? (parseInt(router.query.p as string) - 1) * limit
  //         : 0 * limit,
  //     },
  //   });

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
      <Flex flex="1" flexDir={"column"} align="center">
        <Box pl={5} pr={5} height={"100%"} width="100%" maxWidth={"1200px"}>
          <Box mb="4" mt="4">
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Discover Awesome Courses
            </Text>
          </Box>

          {/* {data.courses.courses.map((course) => (
              <Box
                key={course.id}
                bg="white"
                w="100%"
                cursor={"pointer"}
                color="black"
                // borderRadius={"5px"}
                marginBottom={"30px"}
                onClick={() => {
                  router.push({
                    pathname: `/course/${course.id}`,
                  });
                }}
              >
                <Flex>
                  <Image
                    width={"220px"}
                    height={"150px"}
                    // borderTopRadius={"5px"}
                    overflow="hidden"
                    objectFit="cover"
                    src={course.promoImage}
                    alt={"course image"}
                  />

                  <Box ml="15px" flex={1}>
                    <Box
                      fontSize={"1.1rem"}
                      fontWeight={"bold"}
                      marginBottom={"10px"}
                    >
                      {course.title}
                    </Box>
                    <Text
                      fontSize={"0.9rem"}
                      noOfLines={3}
                      marginBottom={"10px"}
                      maxWidth={"850px"}

                      // isTruncated
                    >
                      {course.description}
                    </Text>
                    <Box fontSize={"0.8rem"}>
                      {`${
                        capitalize(course.instructor.firstName) +
                        " " +
                        capitalize(course.instructor.lastName)
                      }`}
                    </Box>
                  </Box>
                </Flex>
                <Box
                  marginTop="30px"
                  w={"100%"}
                  h={"1px"}
                  backgroundColor={"gray"}
                ></Box>
              </Box>
            ))}*/}
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
