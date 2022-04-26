import { ReactNode } from "react";

import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Center,
  Text
  // Image,
} from "@chakra-ui/react";
import { Img } from '@chakra-ui/react'

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from 'next/image'

export default function AvailableOnL2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Center mt="200px" backgroundColor="FrontPageSecondary" p={10}>
    <Box color="white">
      2022 copyright: Devacademy.app

      </Box>
    </Center>

    </>
  );
}
