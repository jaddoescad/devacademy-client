import React, { useEffect } from "react";
import { withApollo } from "../../../utils/withApollo";
import { useRouter } from "next/router";
import InstructorSidePanel from "src/components/common/instructorSidePanel";
import { useMeQuery } from "src/generated/graphql";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { InputField } from "src/components/InputField";
import { Form, Formik } from "formik";
import { Wrapper } from "src/components/Wrapper";
import NextLink from "next/link";
import { toErrorMap } from "src/utils/toErrorMap";
import FileUpload from "src/components/image-upload";
import { uploadImageToFirebase } from "src/firebase.js";
import {
  useSaveLandingPageMutation,
  useInstructorCourseLandingPageQuery,
} from "src/generated/graphql";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({});
  const [saveLandingPage] = useSaveLandingPageMutation();
  const courseId = router.query.courseid;

  const {
    data: courseData,
    error,
    loading: courseLoading,
    fetchMore,
    variables,
  } = useInstructorCourseLandingPageQuery({
    variables: {
      courseId: router.query.courseid as string,
    },
  });

  useEffect(() => {
    console.log(courseData);
  }, [courseData]);

  return (
    <>
      {typeof courseId === "string" && !loading ? (
        <Box bg={"white"} overflowY={"scroll"} height="100vh">
          <InstructorNavigation />
          <Flex>
            <InstructorSidePanel
              selected="curriculum"
              courseid={courseId}
              name={`${data?.me?.firstName} ${data?.me?.lastName}`}
            />
            <Box
              pos="sticky"
              w={"100%"}
              flexDir="column"
              justifyContent="space-between"
              color={"black"}
              bg={"white"}
              ml={"50px"}
              mr={"50px"}
              mb={"50px"}
              mt={"20px"}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            >
              <Wrapper variant="small">
                <Formik
                  enableReinitialize
                  initialValues={{
                    title: courseData?.instructorCourse.title,
                    description: courseData?.instructorCourse.description,
                    file: "",
                  }}
                  onSubmit={async (values, { setErrors }) => {
                    if (values.file) {
                      uploadImageToFirebase(values.file).then((url) => {
                        saveLandingPage({
                          variables: {
                            title: values.title || "",
                            description: values.description || "",
                            promoImage: url,
                            courseId: courseId,
                          },
                          optimisticResponse: {
                            __typename: "Mutation",
                            saveLandingPage: {
                              __typename: "Course",
                              id: courseId,
                              title: values.title || "",
                              description: values.description,
                              promoImage: url,
                            },
                          },
                          update: (cache, { data }) => {
                            cache.evict({ fieldName: "instructorCourses" });
                          },
                        });

                        //upload image
                      });
                    } else {
                      saveLandingPage({
                        variables: {
                          title: values.title || "",
                          description: values.description || "",
                          promoImage: courseData?.instructorCourse.promoImage || "",
                          courseId: courseId,
                        },
                        update: (cache, { data }) => {
                          cache.evict({ fieldName: "instructorCourses" });
                        },
                      });
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <InputField
                        name="title"
                        placeholder="title"
                        label="Title"
                      />
                      <InputField
                        textarea
                        name="description"
                        placeholder="Description"
                        label="Description"
                      />
                      <FileUpload
                        name="image"
                        label="image"
                        promoImage={courseData?.instructorCourse.promoImage}
                      />
                      <Box mt={4}></Box>
                      <Button
                        mt={4}
                        type="submit"
                        isLoading={isSubmitting}
                        color="teal"
                      >
                        save
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Wrapper>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box>Error Loading Landing Page</Box>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(LandingPage);
