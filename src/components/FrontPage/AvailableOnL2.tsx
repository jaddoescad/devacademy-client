import {
  Box,
  Flex,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";


export default function AvailableOnL2() {

  return (
    <>
      <Box marginTop="150px">
        <Center>
          <Text fontSize={["40", "50"]} fontWeight="800" color={"white"}>
            Available On L2
          </Text>
        </Center>
        <Center>
          <Text
            textAlign={"center"}
            fontSize="20"
            p="6"
            color={"gray.200"}
            maxWidth="700px"
          >
            The Dev token can be purchased on Uniswap. It is also available on
            Arbitrum and Polygon.
          </Text>
        </Center>
        <Center>
          <Flex flexDirection={["column", "column", "row-reverse"]}>
            <Center>
              <Button
                backgroundColor={"FrontPageSecondary"}
                margin={5}
                size="lg"
                borderRadius={50}
                fontWeight={500}
                pl={20}
                pr={20}
                color="white"
              >
                Bridge Dev
              </Button>
            </Center>
            <Center>
              <Button
                backgroundColor={"FrontPageSecondary"}
                margin={5}
                size="lg"
                borderRadius={50}
                fontWeight={500}
                pl={20}
                pr={20}
                color="white"

              >
                Buy Dev
              </Button>
            </Center>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
