import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Button,
} from "@chakra-ui/react";

import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiMoreHorizontal,
  FiArchive
} from "react-icons/fi";

import NavItem from "./NavItem";
import { useRouter } from "next/router";
import { Book } from "react-feather";

//prop types
interface SidePanelProps {
  courseid: string;
  name: string;
  selected: string;
}

const InstructorSidePanel: React.FC<SidePanelProps> = ({ courseid, name, selected }) => {
  const [navSize, changeNavSize] = useState("large");
  const router = useRouter();

  return (
    <Flex
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      w={navSize == "small" ? "75px" : "400px"}
      flexDir="column"
      justifyContent="space-between"
      color={"black"}
      bg={"white"}
      h="calc(100vh - 100px)"
      mt="5"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          aria-label="menu"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem
          description=""
          active={selected === "curriculum" ? true : false}
          navSize={navSize}
          icon={<Book />}
          title="Curriculum"
          courseid={courseid}
          destination="curriculum"
        />
        <NavItem
          description=""
          active={selected=== "landingPage" ? true : false}
          navSize={navSize}
          icon={<FiArchive />}
          title="Landing Page"
          courseid={courseid}
          destination="landingPage"
        />

        <Button>
          Submit Course
        </Button>

      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar
            size="sm"
            name={name}
          />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {name}
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default InstructorSidePanel;