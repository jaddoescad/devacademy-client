import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import styled from "styled-components";
import {
  useConnectWallet,
  useDetectChain,
  useProvider,
} from "../../fixtures/wallet/hooks";
import { Drawer, Popover } from "antd";
import { ChainName } from "../../fixtures/wallet/utility";
import { switchChain } from "../../fixtures/wallet/switch";
import { providers } from "ethers";
import truncateEthAddress from "truncate-eth-address";
import EthereumEthLogo from "../components/Svgs/svg/EthereumEthLogo.svg";
import ArbitrumLogo from "../components/Svgs/svg/ArbitrumLogo.svg";
import PolygonLogo from "../components/Svgs/svg/PolygonLogo.svg";
import WalletContext from "../../context/walletContext";
import { useCallback, useContext } from "react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { isDenyProperty } from "src/config/utils";
import { useMemo } from "react";
import { Space } from "antd";
import {
  useGetSTokenPositions,
  useGetStokenRewards,
} from "src/fixtures/dev-kit/hooks";
import { toNaturalNumber } from "src/fixtures/utility";
import { useDetectSTokens } from "src/fixtures/dev-kit/hooks";
import { getStokenPositions } from "src/fixtures/dev-kit/client";

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
  useColorModeValue,
  Stack,
  HStack,
  IconButton,
  useColorMode,
  Center,
  Img,
} from "@chakra-ui/react";
import StokenValueContext from "src/context/fullMembershipContext";
import { getMinimumDevForMembership } from "src/services/firestore";

const Grid = styled.div`
  display: grid;
`;

const NavOpenedWallet = styled(Grid)`
  gap: 1rem;
  border: 4px solid whitesmoke;
  border-radius: 20px;
  padding: 1rem;
`;

const NavOpenedC = styled(Grid)`
  grid-auto-flow: column;
  justify-content: space-between;
`;

const NavOpenedN = styled(Grid)`
  grid-auto-flow: row;
  justify-items: start;
  gap: 1rem;
`;

const Testnet = styled.h4`
  margin: 0;
  opacity: 0.5;
`;

const NetworkSwitch = styled(Button)`
  padding: 0;
  display: grid;
  gap: 0.2rem;
  grid-auto-flow: column;
  align-items: center;
`;

const NetworkSwitchWithLogo = styled(NetworkSwitch)`
  padding: 0;
  display: grid;
  grid-template-columns: 2rem auto 1fr;
  justify-items: center;
`;

const GrayCircle = styled.span`
  color: lightgray;
  &::before {
    content: "●";
  }
`;

const GreenCircle = styled.span`
  color: #00b050;
  &::before {
    content: "●";
  }
`;

const Links = ["Dashboard", "Projects", "Team"];

const ConnectedOrDisconnected = ({ chainName }: { chainName: ChainName }) => {
  const { ethersProvider } = useProvider();
  const { name } = useDetectChain(ethersProvider);
  return chainName === name ? <GreenCircle /> : <GrayCircle />;
};

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const createSwitchNetwork =
  (router: NextRouter, provider?: providers.BaseProvider) =>
  (chainName: ChainName) =>
  async () => {
    const res = await switchChain(chainName, provider);
  };

export default function Navigation({ isNotMaxW, courseTitle }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { connect, disconnect } = useConnectWallet();
  const { accountAddress, ethersProvider } = useProvider();
  const switchNetwork = createSwitchNetwork(router, ethersProvider);
  const { address } = useContext(WalletContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name } = useDetectChain(ethersProvider);
  const propertyAddress = "0xfb049b86Da8D2F4e335eF2281537f5dddbE77393";
  const { fullMembership, setFullMembership } = useContext(StokenValueContext);

  const { name: network } = useDetectChain(ethersProvider);
  const isDeny = isDenyProperty(network, propertyAddress);
  const { sTokens } = useDetectSTokens(propertyAddress, accountAddress);

  React.useEffect(() => {
    setFullMembership(true);
    if (!isDeny) {
      if (accountAddress && sTokens) {
        sTokens.forEach((sToken) => {
          getStokenPositions(ethersProvider!, sToken).then((positionStoken) => {
            getMinimumDevForMembership().then((minDev) => {
              const totalStake = parseFloat(
                toNaturalNumber(positionStoken?.amount).toFixed()
              );

              if (totalStake > minDev.data()?.minDev) {
                setFullMembership(true);
              }
            });
          });
        });
      }
    }
  }, [isDeny, accountAddress, sTokens]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} width="100%" px={4}>
        <Center>
          <Box w={"100%"} maxW={isNotMaxW ? "100%" : "1200px"}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
              <HStack spacing={8} alignItems={"center"}>
                <Link
                  onClick={() => {
                    router.replace("/catalog");
                  }}
                >
                  <Box boxSize="120px" pt={8} pl={5} mt={5} objectFit="cover">
                    <Img src={"/logo-black.png"} />
                  </Box>
                </Link>

                {courseTitle && (
                  <Box fontWeight={"bold"} color={"black"}>
                    {courseTitle}
                  </Box>
                )}
              </HStack>

              <Flex alignItems={"center"}>
                {address && (
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {name}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={switchNetwork("ethereum")}>
                        Ethereum
                      </MenuItem>
                      <MenuItem onClick={switchNetwork("polygon")}>
                        Polygon
                      </MenuItem>
                      <MenuItem onClick={switchNetwork("arbitrum-one")}>
                        Arbitrum
                      </MenuItem>
                      <MenuItem onClick={switchNetwork("arbitrum-rinkeby")}>
                        Arbitrum Rinkeby
                      </MenuItem>
                      <MenuItem onClick={switchNetwork("polygon-mumbai")}>
                        Polygon Mumbai
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}

                {!address ? (
                  <>
                    <Button
                      onClick={connect}
                      variant={"solid"}
                      colorScheme={"teal"}
                      size={"sm"}
                      mr={4}
                    >
                      Connect
                    </Button>
                  </>
                ) : (
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {truncateEthAddress(address)}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                    </MenuList>
                  </Menu>
                )}
                <Button
                  onClick={() =>
                    router.push(
                      "https://stakes.social/arbitrum-one/0xF83ffb295dbb01f97f908eE0C617DB85A3f02310"
                    )
                  }
                  variant={"solid"}
                  colorScheme={"green"}
                  size={"sm"}
                  mr={4}
                >
                  Get Access
                </Button>
              </Flex>
            </Flex>

            {isOpen ? (
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4}>
                  {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
        </Center>
      </Box>
    </>
  );
}
