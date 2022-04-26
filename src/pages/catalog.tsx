import Pagination from "src/components/pagination";
import { useRouter } from "next/router";
import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "src/components/common/Navigation";
import { usePaginatedCoursesQuery } from "src/generated/graphql";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

const Post = () => {
  const router = useRouter();
  const limit = 3;
  const { data, error, loading, fetchMore, variables } =
    usePaginatedCoursesQuery({
      variables: {
        limit: limit,
        offset: router.query.p
          ? (parseInt(router.query.p as string) - 1) * limit
          : 0 * limit,
      },
    });

  const handlePageClick = (pageNumber: number) => {
    console.log(pageNumber);
    router.push({
      pathname: "/catalog",
      query: {
        p: pageNumber,
      },
    });
  };

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      {!data?.courses ? (
        <div>loading...</div>
      ) : (
        <div>
          <div>
            {data.courses.courses.map((course) => (
              <Box
                key={course.id}
                bg="blue"
                w="200px"
                p={4}
                color="white"
                m={1}
              >
                <Box>{course.title}</Box>
                <Box>
                  {course.instructor.firstName}
                  {course.instructor.lastName}
                </Box>
              </Box>
            ))}
          </div>
          <Pagination
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
          />
        </div>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(Post);
