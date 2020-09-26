import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "noloading"
  >("noloading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="updoot"
        icon="chevron-up"
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            value: 1,
            postId: post.id,
          });
          setLoadingState("noloading");
        }}
        isLoading={loadingState === "updoot-loading"}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            value: -1,
            postId: post.id,
          });
          setLoadingState("noloading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        aria-label="downdoot"
        icon="chevron-down"
      />
    </Flex>
  );
};
