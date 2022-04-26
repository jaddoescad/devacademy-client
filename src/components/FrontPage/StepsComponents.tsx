import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Center,
} from "@chakra-ui/react";

interface FeatureProps {
  title: string;
  text: string;
  number: string;
}

const Feature = ({ title, text, number }: FeatureProps) => {
  return (
    <Stack>
      <Center>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"#36374A"}
          mb={1}
        >
          <Text color={"white"} fontSize={25} fontWeight={600}>{number}</Text>
        </Flex>
      </Center>
      <Center >
        <Text textAlign={"center"} color="white" fontWeight={900}>
          {title}
        </Text>
      </Center>
      <Center  >
        <Text color="white"  textAlign={"center"} textColor={"gray.400"}>{text}</Text>
      </Center>
    </Stack>
  );
};

export default function StepsComponent() {
  return (
      <Center marginTop={"100px"}>
    <SimpleGrid
      p={4}
      maxWidth="1200px"
      paddingLeft="100px"
      paddingRight="100px"
      paddingTop="40px"
      paddingBottom="40px"
      bg="FrontPageSecondary"
      rounded={10}
      columns={[1, 1, 1, 4, 4]}
      spacing={10}
    >
      <Feature
        number="1"
        title="Buy DEV"
        text="In order to purchase the DEV token, you need an Ethereum wallet like Metamask. Use your wallet to exchange your Eth for Dev on Uniswap."
      />
      <Feature
        number="2"
        title="Stake DEV"
        text="After you buy the DEV Token, stake a predefined number of tokens on the Dev Academy property. You will then receive a SToken in your wallet which will validate your stake."
      />
      <Feature
        number="3"
        title="Get Access"
        text="Once you've staked a predefined number of DEV tokens, the SToken you receive will be validated giving you full access to the courses."
      />
      <Feature
        number="4"
        title="Earn Rewards"
        text="Once you've staked your DEV tokens, you and Dev Academy will start receiving rewards for your contribution."
      />
    </SimpleGrid>
    </Center>

  );
}
