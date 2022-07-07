import React, { useEffect } from "react";
import { withApollo } from "../../../utils/withApollo";
import { useRouter } from "next/router";
import InstructorSidePanel from "src/components/common/instructorSidePanel";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { InputField } from "src/components/InputField";
import { Form, Formik } from "formik";
import { Wrapper } from "src/components/Wrapper";
import NextLink from "next/link";
import FileUpload from "src/components/image-upload";
import { uploadImageToFirebase } from "src/services/firStorage";
import {
  getCourse,
  saveCourseInfoWithImage,
  saveCourseInfoWithoutImage,
} from "src/services/firestore";
import { firebase } from "src/firebase";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const router = useRouter();

  const courseId = router.query.courseid;
  const [course, setCourse] = React.useState<any>();

  useEffect(() => {
    if (!router.isReady) return;
    getCourse(courseId as string).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("snapshot", docSnap);

        setCourse(docSnap.data());
        console.log("course data", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, [router.isReady]);

  return (
    <>
      {typeof courseId === "string" ? (
        <Box bg={"white"} overflowY={"scroll"} height="100vh">
          <InstructorNavigation />
          <Flex>
            <InstructorSidePanel
              selected="curriculum"
              courseid={courseId}
              name={firebase.auth().currentUser?.displayName as string}
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
                <Text mr="5" mt="5" mb="5" fontSize={"30px"}>
                  Landing Page
                </Text>{" "}
                <Formik
                  enableReinitialize
                  validate={() => ({})}
                  initialValues={{
                    title: course?.title,
                    description: course?.description,
                    file: "",
                  }}
                  onSubmit={ (values, { setErrors, setSubmitting }) => {

                    setSubmitting(true)
                    if (values.file) {
                      uploadImageToFirebase(values.file, 'course-cover-image').then((url) => {
                        
                        saveCourseInfoWithImage(
                          courseId,
                          values.title,
                          values.description,
                          url
                        ).finally(() => {
                          setSubmitting(false)

                        });
                        //upload image
                      });
                    } else {
                      saveCourseInfoWithoutImage(
                        courseId,
                        values.title,
                        values.description
                      ).finally(() => {
                        setSubmitting(false)

                      });
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form
                      id="landing-page-form"
                    >
                      <InputField
                        name="title"
                        placeholder="title"
                        label="Title"
                        maxLength={60}
                      />
                      <InputField
                        textarea
                        name="description"
                        placeholder="Description"
                        label="Description"
                      />
                      <FileUpload
                        name="image"
                        label="Course Image"
                        promoImage={course?.imageUrl}
                      />
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
