import React, { ReactComponentElement, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "src/generated/graphql";
// import { isServer } from "src/utils/isServer";
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
        <Box mr={2}>
          <NextLink href="/login">login</NextLink>
        </Box>
        <NextLink href="/register">register</NextLink>
      </Box>
    );
  } else if (!data?.me) {
    body = (
      <Box>
        <Flex>
          <Box mr={2}>
            <NextLink href="/login">login</NextLink>
          </Box>
          <NextLink href="/register">register</NextLink>
        </Flex>
      </Box>
    );
    // user is logged in
  } else {
    body = (
      <Box>
        <Flex alignItems="center">
          <Box fontWeight={"medium"} mr={"4"} ml={"2"}>
            <NextLink href="/catalog">Student</NextLink>
          </Box>
          <Menu>
            <MenuButton>
              <Avatar
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
