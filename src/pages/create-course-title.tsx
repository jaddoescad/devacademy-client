import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { InputField } from "src/components/InputField";
import { Wrapper } from "src/components/Wrapper";
import { useIsAuth } from "src/utils/useIsAuth";
import { withApollo } from "../utils/withApollo";
import { createCourse } from "src/services/firestore";
import {firebase} from "src/firebase";

interface CreateCourseProps {}

export const CreateCourse: React.FC<CreateCourseProps> = ({}) => {
  const router = useRouter();

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
              createCourse(values.courseTitle, firebase.auth().currentUser?.uid)
                .then((docRef) => {
                  router.push({
                    pathname: "/instructor",
                    query: { title: values.courseTitle },
                  });
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
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
