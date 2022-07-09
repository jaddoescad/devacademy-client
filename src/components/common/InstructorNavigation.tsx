import React, { useContext, useEffect } from "react";
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
import { firebase, uiConfig } from "src/firebase";
import AuthStateContext from "src/context/authStateContext";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'

interface InstructorNavigationProps {
  editorChange?: String;
}

export const InstructorNavigation: React.FC<InstructorNavigationProps> = ({
  editorChange,
}) => {
  const { authState } = useContext(AuthStateContext);

  var body;

  useEffect(() => {
    console.log(firebase.auth().currentUser);
  }, [authState]);

  if (authState === "loaded" && firebase.auth().currentUser) {
    body = (
      <Box>
        <Flex alignItems="center">
          <Box fontWeight={"medium"} mr={"4"} ml={"2"}>
            <NextLink href="/catalog">Student</NextLink>
          </Box>
          <Menu>
            <MenuButton>
              <Avatar
                name={firebase.auth().currentUser?.displayName as string}
              />
            </MenuButton>
            <MenuList color="black">
              <MenuItem>
                <Flex flexDirection={"column"}>
                  <Box>{firebase.auth().currentUser?.displayName}</Box>
                  <Box fontSize={"12"}>
                    {firebase.auth().currentUser?.email}
                  </Box>
                </Flex>
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await firebase.auth().signOut();
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
  } else {
    // user not logged in
    body = (
      <Box>
        <Box mr={2}>
          <NextLink href="/login">login</NextLink>
        </Box>
        <NextLink href="/register">register</NextLink>
      </Box>
    );
  }

  return (
    <Flex bg="#212121" color={"white"} p={4}>
      <IconButton
        variant="link"
        colorScheme="white"
        aria-label="go back"
        _focusVisible={{
          outline: "none",
          // boxShadow: "0 0 2px 2px #51a7e8"
        }}
        icon={<ArrowBackIcon w={6} h={6}/>}
      />
      {editorChange && <Flex alignItems={"center"}>{editorChange}</Flex>}
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
