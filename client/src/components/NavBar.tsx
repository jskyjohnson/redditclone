import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout,{ loading: logoutFetching }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let body = null;

  console.log(loading);
  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link> login </Link>
        </NextLink>
        <NextLink href="/register">
          <Link> register</Link>
        </NextLink>
      </>
    );
    //user not logged in
  } else {
    body = (
        <Flex align="center">
          <NextLink href="/create-post">
            <Button as={Link} mr={4}>
              💬 Create Post
            </Button>
          </NextLink>
          <Box mr={4}>{data.me.username}</Box>
          <Button
            variant="link"
            isLoading={logoutFetching}
            onClick={async () => {
              await logout();
              router.reload();
            }}
          >
            logout
          </Button>
        </Flex>
    );

    //user is logged in
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Home 🏡</Heading>
          </Link>
        </NextLink>

      <Box ml={"auto"}>
        {body}

      </Box>
      </Flex>
    </Flex>
  );
};
