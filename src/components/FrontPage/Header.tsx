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
  // Image,
} from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  
  return (
    <>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link>
          <Box boxSize="120px" pt={8} pl={5} objectFit="cover">
            <Img src={"/logo-white.png"} />
          </Box>
        </Link>

        <Button
          backgroundColor={"FrontPageSecondary"}
          margin={5}
          borderRadius={50}
          fontWeight={500}
          pl={10}
          pr={10}
          color="white"
          onClick={() => {
            router.push('/catalog')
            
          }}
        >
          Learn
        </Button>
      </Flex>
    </>
  );
}
