import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import NavHoverBox from "./NavHoverBox";
import { useRouter, NextRouter } from "next/router";
import { useEffect } from "react";
import { IconType } from "react-icons";

interface SidePanelProps {
  courseid: string;
  icon: any;
  title: string;
  description: string;
  active: boolean;
  destination: string;
  navSize: string;
}

const NavItem: React.FC<SidePanelProps> = ({
  icon,
  title,
  description,
  active,
  navSize,
  courseid,
  destination,
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log(courseid);
  }, [courseid]);

  return (
    <Flex

      mt={30}
      flexDir="column"
      w={navSize == "small" ? "" : "100%"}
      
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu  placement="right">
        <Link
          backgroundColor={"#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={"100%"}
          alignItems="center"
          onClick={() => {
            router.push(`/course-creation-platform/${courseid}/${destination}`);
          }}
        >
          {/* <MenuButton> */}
            <Flex
                // justify-content: center;
                // align-items: center;
                justifyContent={navSize == "small" ? "center" : ""}
                alignItems={navSize == "small" ? "center" : ""}
            >
              <Icon
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              >
                {icon}
              </Icon>
              <Text mt="2px" ml={2} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          {/* </MenuButton> */}
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
