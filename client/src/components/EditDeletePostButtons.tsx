import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";

import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  authorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  authorId,
}) => {
  const [, deletePost] = useDeletePostMutation();

  const [{ data: meData }] = useMeQuery();
  //const [,editPost] = useEditPostMutation();

  if (!(meData?.me?.id === authorId)) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} icon="edit" aria-label="Edit post" mr={2} />
      </NextLink>

      <IconButton
        icon="delete"
        aria-label="Delete post"
        onClick={() => {
          deletePost({ id: id });
        }}
      />
    </Box>
  );
};
