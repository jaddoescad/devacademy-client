import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { InputField } from "src/components/InputField";
import { Wrapper } from "src/components/Wrapper";
import { useIsAuth } from "src/utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface CreateCourseProps {}

export const CreateCourse: React.FC<CreateCourseProps> = ({}) => {
  const router = useRouter();
  useIsAuth()

  return (
    <>
      <InstructorNavigation />
      <Wrapper variant="small">
        <Formik
          initialValues={{ courseTitle: "" }}
          onSubmit={async (values, { setErrors }) => {
            if (
              values.courseTitle === "" ||
              values.courseTitle === undefined ||
              values.courseTitle === null
            ) {
              setErrors({
                courseTitle: "Title can't be empty",
              });
            } else {
              router.push(
                {
                  pathname: "/create-course-category",
                  query: { title: values.courseTitle },
                },
                "/choose-category",
                { shallow: true }
              );
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="courseTitle"
                placeholder="Graphic Design Basics, ..."
                label="Title"
                maxLength={50}
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                color="teal"
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(CreateCourse);