import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { Wrapper } from "../../../components/Wrapper";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [, updatePost] = useUpdatePostMutation();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }
  return (
    <Layout variant="small">
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            await updatePost({ id: intId, ...values });
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Title" />
              <Box mt={4}>
                <InputField
                  textArea
                  name="text"
                  placeholder="text..."
                  label="Text"
                />
              </Box>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                variantColor="teal"
              >
                update post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditPost);
