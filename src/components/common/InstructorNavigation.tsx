import React, { ReactComponentElement, useEffect } from "react";
import {
  Box,
  Link,
  Flex,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "src/generated/graphql";
import { isServer } from "src/utils/isServer";
import { useApolloClient } from "@apollo/client";

interface InstructorNavigationProps {}

export const InstructorNavigation: React.FC<
  InstructorNavigationProps
> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const { data, loading } = useMeQuery({
    // skip: isServer(),
  });

  var body;

  // data is loading
  if (loading) {
    // user not logged in
    body = (
      <Box>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </Box>
    );
  } else if (!data?.me) {
    body = (
      <Box>
        <Flex>
          <NextLink href="/login">
            <Link mr={2}>login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>register</Link>
          </NextLink>
        </Flex>
      </Box>
    );
    // user is logged in
  } else {
    body = (
      <Box >
        <Flex alignItems="center">
          <Box fontWeight={"medium"} mr={"4"} ml={"2"}>
            <NextLink href="/catalog">
              <Link>Student</Link>
            </NextLink>
          </Box>
          <Menu >
            <MenuButton>
              <Avatar
                as={Button}
                name={data.me.firstName + " " + data.me.lastName}
              />
            </MenuButton>
            <MenuList color="black">
              <MenuItem>
                <Flex flexDirection={"column"}>
                  <Box>{data.me.firstName + " " + data.me.lastName}</Box>
                  <Box fontSize={"12"}>{data.me.email}</Box>
                </Flex>
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                }}
              >
                logout
              </MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    );
  }

  return (
    <Flex bg="#212121" color={"white"} p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
