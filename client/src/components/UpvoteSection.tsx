import { Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { useState } from "react";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
} from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "up-loading" | "down-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={3}>
      <IconButton
        aria-label="upvote"
        icon="chevron-up"
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("up-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "up-loading"}
      />
      {post.points}
      <IconButton
        aria-label="downvote"
        icon="chevron-down"
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("down-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "down-loading"}
      />
    </Flex>
  );
};
