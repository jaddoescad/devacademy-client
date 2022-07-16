import React, { useContext } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { useDetectSTokens } from "src/fixtures/dev-kit/hooks";
import StokenValueContext from "src/context/fullMembershipContext";
import {
  useConnectWallet,
  useDetectChain,
  useProvider,
} from "src/fixtures/wallet/hooks";
import { useRouter } from "next/router";

interface SubscriptionAlertProps {}

export const SubscriptionAlert: React.FC<SubscriptionAlertProps> = ({}) => {
  const { accountAddress, ethersProvider } = useProvider();
  const propertyAddress = process.env.NEXT_PUBLIC_PROPERTY_ADDRESS;
  const { sTokens } = useDetectSTokens(propertyAddress, accountAddress);
  const { isFullMembership, totalStake, minDev } =
    useContext(StokenValueContext);
  const { connect, disconnect } = useConnectWallet();

  const { name: network } = useDetectChain(ethersProvider);

  const router = useRouter();

  return (
    <Alert
      status={isFullMembership && accountAddress && network === "arbitrum-one" ? "success" : "error"}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {accountAddress && network === "arbitrum-one" ? (
          <Flex>
            <Text color="black" mr="1">
              {"You are staking "}
            </Text>
            <Text color="red">{Number(totalStake).toFixed(2) + " DEV"}</Text>
            <Text color="black" ml="1">
              {" tokens on  Dev Academy."}
            </Text>
            <Text color="black" ml="1">
              {"You need"}
            </Text>
            <Text ml="1" mr="1" color="red">
              {minDev + " DEV"}
            </Text>
            <Text color="black">{"Tokens."}</Text>
          </Flex>
        ) : (
          <>
            <Text>Please connect wallet on Arbitrum network</Text>{" "}
            {!accountAddress && <Button mt="3" onClick={connect} colorScheme={"teal"} color="white">
              Connect
            </Button>}
          </>
        )}
      </AlertTitle>
      <AlertDescription fontWeight={"medium"} maxWidth="sm">
        {isFullMembership && accountAddress && network === "arbitrum-one" ? (
          "Enjoy unlimited access to all our courses"
        ) : (
          <Box>
            {accountAddress && network === "arbitrum-one" && (
              <>
                <Text>You do not have access to courses.</Text>
                <Button
                  onClick={() =>
                    router.push(
                      "https://stakes.social/arbitrum-one/0xF83ffb295dbb01f97f908eE0C617DB85A3f02310"
                    )
                  }
                  mt="4"
                  colorScheme={"green"}
                  color="white"
                >
                  Get Access
                </Button>
              </>
            )}
          </Box>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default SubscriptionAlert;
