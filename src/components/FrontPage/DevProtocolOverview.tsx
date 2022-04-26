import {
  Button,
  Flex,
  Heading,
  Img,
  Stack,
  Text,
  Box,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function DevProtocolOverview() {
  return (
    <Stack pt={20} >
      <Stack minH={"50vh"} direction={["column-reverse", "column-reverse", "column-reverse", "row" ]}>
        <Flex ml={["0", "0", "0", "10", "0"]} textAlign={["center", "center", "center", "left", "left"]} flex={1} align={"center"} justify={["left", "center"]}>
          <Box>
            <Text color={"#B6C0D5"} fontSize={"30px"} fontWeight={"900"} >
              Powered by
            </Text>
            <Text color={"white"} fontSize={"40px"} fontWeight={"900"} mt={"-3"} mb={"3"}>
              Dev Protocol
            </Text>
            <Text color="white" fontSize={"18px"} maxWidth={"50ch"} m={["10", "10", "0", "0", "0"]}>
            Dev Protocol allows you to start your own economy easily with a powerful blockchain 
            solution designed to help grow your creator business. Dev Academy integrates the 
            Dev Protocol Staking as a service solution. Students get access to courses by staking 
            on the Dev Academy property. This allows them to earn an APY and fund the course creators 
            at the same time.
            </Text>
          </Box>
        </Flex>

        <Flex  flex={1} align={"center"} justify={["center", "center",  "center",  "right",  "right"]}>
            <Img w={["300px", "300px", "300px", "400px"]}  src="https://firebasestorage.googleapis.com/v0/b/learnthepart-75aed.appspot.com/o/devlogo%20(1).png?alt=media&token=7a61b329-7e84-40ec-ae26-9e2798c998a8" />
        </Flex>
      </Stack>
    </Stack>
  );
}
