import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const { loading, data, error, called, client } = usePostsQuery({
    variables,
  });

  //console.log(client);
  if (!loading && !data) {
    return (
      <>
        <div> Query failed... </div>

        <div>{error?.message}</div>
      </>
    );
  }
  return (
    <Layout>
      test loading
      {data}
      {loading && !data ? (
        <div>loading...</div>
      ) : (
        <Stack>
          {data!.posts.posts.map((p) =>
            !p ? null : ( //Delete post protection (no null posts)
              <div key={p.id}>
                <Flex
                  marginBottom={8}
                  key={p.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                >
                  <Box>
                    <UpvoteSection post={p} />
                  </Box>
                  <Box flex={1}>
                    <Flex align="center">
                      <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                        <Link>
                          <Heading fontSize="xl"> {p.title}</Heading>
                        </Link>
                      </NextLink>

                      <Box ml="auto">
                        <EditDeletePostButtons
                          id={p.id}
                          authorId={p.author.id}
                        />
                      </Box>
                    </Flex>

                    <Text ml={4}> Posted by {p.author.username} </Text>
                    <Text mt={4}> {p.textSnippet}</Text>
                  </Box>
                </Flex>
              </div>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            m="auto"
            mb={8}
          >
            load more...
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default Index;
