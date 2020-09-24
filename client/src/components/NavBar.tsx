import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
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
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button variant="link"> logout </Button>
      </Flex>
    );

    //user is logged in
  }
  return (
    <Flex bg="tan" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};