import { Button, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { SelectHTMLAttributes, useEffect } from "react";
import { Wrapper } from "src/components/Wrapper";
import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCreateCourseMutation } from "src/generated/graphql";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { useIsAuth } from "src/utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

type InputFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
};

const CourseCategory: React.FC<InputFieldProps> = (props) => {
  const router = useRouter();
  const [createCourse] = useCreateCourseMutation();
  useIsAuth();

  useEffect(() => {
    if (
      router.query.title === undefined ||
      router.query.title === "" ||
      router.query.title === null
    ) {
      router.replace("/create-course-title");
    }
  }, []);

  return (
    <>
      <InstructorNavigation />
      <Wrapper variant="small">
        <Formik
          initialValues={{ courseCategory: "" }}
          onSubmit={async (values, { setErrors }) => {
            const title = router.query.title?.toString();
            if (title) {
              const { errors } = await createCourse({
                variables: { title: title },
                update: (cache) => {
                  cache.evict({
                    fieldName: "instructorCourses",
                  });
                },
              });

              if (errors) {
                setErrors({
                  courseCategory: "An error has occured",
                });
              } else {
                router.replace({
                  pathname: "/instructor",
                });
              }
            } else {
              setErrors({
                courseCategory: "unable to create course, title was not added",
              });
            }
          }}
        >
          {({ isSubmitting, setFieldValue, errors }) => (
            <Form>
              <FormControl isInvalid={!!errors.courseCategory}>
                <Select
                  name="courseCategory"
                  id="courseCategory"
                  placeholder="Select option"
                  onChange={(e) =>
                    setFieldValue("courseCategory", e.target.value)
                  }
                >
                  <option value="Design">Design</option>
                  <option value="Software">Software</option>
                  <option value="Writing">Writing</option>
                </Select>
                {/* <div>
                {errors}
              </div> */}
                {errors.courseCategory ? (
                  <FormErrorMessage>{errors.courseCategory}</FormErrorMessage>
                ) : null}
                <div></div>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  color="teal"
                >
                  Next
                </Button>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(CourseCategory);
