import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SplitScreen() {
  const router = useRouter();

  return (
    <Stack>
      <Stack
        pt={"75"}
        minH={"50vh"}
        direction={["column", "column", "column", "row", "row"]}
      >
        <Flex flex={1} align={"flex-end"} justify={"center"}>
          <Image w={["400px", "500px"]} src="/stakeearnlearn.png" />
        </Flex>
        <Flex
          flex={1}
          align={"center"}
          justify={["center", "center", "center", "flex-start", "flex-start"]}
        >
          <Text
            color="white"
            m="5"
            fontSize={["15px", "20px"]}
            maxWidth={"37ch"}
            fontFamily={"Poppins"}
            align={["center", "center", "center", "left"]}
          >
            Dev Academy is an online education platform economically powered by
            Dev Protocol. Stake the DEV token on our platform and get full
            access to various courses from top instructors from all over the
            world, including an APY on your staked contribution.
          </Text>
        </Flex>
      </Stack>

      <Center>
        <Button
          color="white"
          backgroundColor={"FrontPageSecondary"}
          margin={5}
          size="lg"
          borderRadius={50}
          fontWeight={500}
          pl={10}
          pr={10}
          onClick={() => {
            router.push('/catalog')
          }}
        >
          Learn
        </Button>
      </Center>
    </Stack>
  );
}
