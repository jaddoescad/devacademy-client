import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "src/generated/graphql";
import { toErrorMap } from "src/utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";
import { InstructorNavigation } from "src/components/common/InstructorNavigation";
import { notAuth } from "src/utils/useIsAuth";

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  notAuth()
  return (
    <>
      <InstructorNavigation />
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const resp = await login({
              variables: {
                options: {
                  email: values.email,
                  password: values.password,
                },
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.instructor,
                  },
                });
                cache.evict({ fieldName: "courses:{}" });
              },
            });

            if (resp.data?.login.errors) {
              console.log(resp.data?.login.errors);
              setErrors(toErrorMap(resp.data?.login.errors));
            } else if (resp.data?.login.instructor) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/catalog");
              }
            } else {
              setErrors({
                email: " ",
                password: "an unexpected error occured",
              });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="email" label="Email" />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Flex mt={2}>
                <NextLink href="/forgot-password">
                  <Link ml="auto">forgot password?</Link>
                </NextLink>
              </Flex>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                color="teal"
              >
                login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Login);
