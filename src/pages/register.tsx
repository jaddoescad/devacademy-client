import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import {
  useRegisterMutation,
  MeQuery,
  MeDocument,
} from "src/generated/graphql";
import { toErrorMap } from "src/utils/toErrorMap";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { notAuth } from "src/utils/useIsAuth";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  notAuth()

  return (
    <>
    <InstructorNavigation />
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const resp = await register({
              variables: {
                options: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                },
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.instructor,
                  },
                });
              },
            });

            if (resp.data?.register.errors) {
              console.log(resp.data?.register.errors);
              setErrors(toErrorMap(resp.data?.register.errors));
            } else {
              router.push("/instructor");
            }
          } catch (err) {
            console.log(err);
            setErrors({
              password: "An unexpected error occured. Please try again later.",
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box color={"white"} mt={4}>
              <InputField
                name="firstName"
                placeholder="First Name"
                label="First Name"
              />
              <InputField
                name="lastName"
                placeholder="lastname"
                label="Last Name"
              />
              <InputField name="email" placeholder="Email" label="Email" />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} color="teal">
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
