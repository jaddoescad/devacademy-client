import Web3 from "web3";
import {
  ChainName,
  connectWallet,
  detectChain,
  disconnectWallet,
  getAccountAddress,
} from "./utility";
import { useContext, useEffect, useMemo, useState } from "react";
import WalletContext from "../../context/walletContext";
import {
  WEB3_PROVIDER_ENDPOINT_KEY,
  WEB3_PROVIDER_ENDPOINT_HOSTS,
} from "./constants";
import { providers } from "ethers";
import { whenDefined } from "@devprotocol/util-ts";
import { useNetworkInRouter } from "../../utility";
import StokenValueContext from "src/context/fullMembershipContext";

const providerUrl = (chain: ChainName) =>
  chain
    ? `${
        chain === "ethereum"
          ? WEB3_PROVIDER_ENDPOINT_HOSTS.MAIN
          : chain === "ropsten"
          ? WEB3_PROVIDER_ENDPOINT_HOSTS.ROPSTEN
          : chain === "arbitrum-one"
          ? WEB3_PROVIDER_ENDPOINT_HOSTS.ARB_ONE
          : chain === "arbitrum-rinkeby"
          ? WEB3_PROVIDER_ENDPOINT_HOSTS.ARB_RINKEBY
          : chain === "polygon"
          ? WEB3_PROVIDER_ENDPOINT_HOSTS.POLYGON
          : chain === "polygon-mumbai"
          ? WEB3_PROVIDER_ENDPOINT_HOSTS.POLYGON_MUMBAI
          : WEB3_PROVIDER_ENDPOINT_HOSTS.MAIN
      }/${WEB3_PROVIDER_ENDPOINT_KEY}`
    : undefined;
const nonConnectedWeb3 = (chain: ChainName) =>
  whenDefined(providerUrl(chain), (url) => new Web3(url));
const nonConnectedEthersProvider = (chain: ChainName) =>
  whenDefined(providerUrl(chain), (url) => new providers.JsonRpcProvider(url));
const nonConnectedWeb3L1 = new Web3(providerUrl("ethereum")!);
const nonConnectedEthersL1Provider = new providers.JsonRpcProvider(
  providerUrl("ethereum")
);

export const useConnectWallet = () => {
  const { web3Modal, setProviders } = useContext(WalletContext);
  const { setMembership } = useContext(StokenValueContext);
  const connect = async () => {
    console.log("connecting wallet");
    return connectWallet(setProviders, web3Modal)
      .then((result) => {
        console.log("connected wallet", result);
        return result;
      })
      .catch((err) => {
        console.log("error connecting wallet", err);
        return false;
      });
  };

  const disconnect = () => {
    disconnectWallet(setProviders, setMembership, web3Modal);
  };

  return { connect, disconnect };
};

export const useProvider = () => {
  const { requestedChain } = useNetworkInRouter();
  const { web3, ethersProvider } = useContext(WalletContext);
  const ncWeb3 = useMemo(
    () => nonConnectedWeb3(requestedChain ?? "ethereum"),
    [requestedChain]
  );
  const ncEthersProvider = useMemo(
    () => nonConnectedEthersProvider(requestedChain ?? "ethereum"),
    [requestedChain]
  );
  const [accountAddress, setAccountAddress] = useState<undefined | string>(
    undefined
  );
  useEffect(() => {
    getAccountAddress(web3).then((x) => setAccountAddress(x));
  }, [web3]);
  return {
    web3,
    ethersProvider,
    accountAddress,
    nonConnectedWeb3: ncWeb3,
    nonConnectedEthersProvider: ncEthersProvider,
    nonConnectedWeb3L1,
    nonConnectedEthersL1Provider,
  };
};

export const useDetectChain = (ethersProvider?: providers.BaseProvider) => {
  const [chain, setChain] = useState<
    undefined | { chainId?: number; name?: ChainName }
  >();
  useEffect(() => {
    detectChain(ethersProvider).then(setChain);
  }, [ethersProvider]);
  return { chainId: chain?.chainId, name: chain?.name };
};

export const useIsL1 = () => {
  const { nonConnectedEthersProvider } = useProvider();
  const { name: chain } = useDetectChain(nonConnectedEthersProvider);
  const isL1 = useMemo(
    () => whenDefined(chain, (c) => c === "ethereum"),
    [chain]
  );
  return { isL1 };
};
