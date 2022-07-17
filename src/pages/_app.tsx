import * as React from "react";
import App, { AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import WalletContext from "../context/walletContext";
import Web3 from "web3";
import Web3Modal from "web3modal";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink";
import { ChakraProvider } from "@chakra-ui/react";
import { WithApolloProps } from "next-with-apollo";
import {
  WEB3_PROVIDER_ENDPOINT_HOSTS,
  WEB3_PROVIDER_ENDPOINT_KEY,
} from "../fixtures/wallet/constants";
import { getAccountAddress } from "../fixtures/wallet/utility";
import { providers } from "ethers";
import { connectWallet } from "../fixtures/wallet/utility";
import { theme } from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import FullMembershipContext from "src/context/fullMembershipContext";
import { firebase } from "src/firebase";
import AuthStateContext, { authState } from "src/context/authStateContext";
import "src/styles.css";
import "focus-visible/dist/focus-visible";
import { getMinimumDevForMembership } from "src/services/firestore";
import { detectStokens, getStokenPositions } from "src/fixtures/dev-kit/client";
import { toNaturalNumber } from "src/utility";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://api.devprotocol.xyz/v1/graphql",
  cache,
});

interface AuthStateType {
  isCurrencyDEV: any;
  web3: any;
  ethersProvider: any;
  web3Modal: any;
  address: any;
  isFullMembership: boolean | null;
  minDev: number | undefined;
  authState: "loading" | "loaded";
  totalStake: number;
}
const NextApp: React.FC<AppInitialProps & AppProps & WithApolloProps<{}>> = ({
  Component,
  pageProps,
}) => {
  const [isCurrencyDEV, setIsCurrencyDEV] = React.useState<any>(true);
  const [web3, setWeb3] = React.useState<any>(undefined);
  const [ethersProvider, setEthersProvider] = React.useState<any>(undefined);
  const [address, setAddress] = React.useState<any>(undefined);
  const [isFullMembership, setIsFullMembership] = React.useState<any>(null);
  const [minDev, setMinDev] = React.useState<any>(undefined);
  const [totalStake, setTotalStake] = React.useState<any>(0);
  const [authState, setAuthState] = React.useState<any>("loading");
  const [web3Modal, setWeb3Modal] = React.useState<any>(null);
  const propertyAddress = process.env.NEXT_PUBLIC_PROPERTY_ADDRESS;

  const getProviderOptions = () => {
    const walletLink = new WalletLink({
      appName: "name",
      appLogoUrl:
        "https://github.com/dev-protocol/asset.stakes.social/blob/main/public/wallet/coinbase-wallet.jpg?raw=true",
      darkMode: false,
    });
    const INFURA_ID = "75ebe953349644b6998136d868f5cd97";
    const { FORTMATIC_KEY } = process.env;
    const walletLinkProvider = walletLink.makeWeb3Provider(
      `${WEB3_PROVIDER_ENDPOINT_HOSTS.MAIN}/${WEB3_PROVIDER_ENDPOINT_KEY}`,
      1
    );
    const web3ForInjected = detectEthereumProvider();

    return {
      injected: {
        package: web3ForInjected,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: FORTMATIC_KEY,
        },
      },
      "custom-walletlink": {
        display: {
          logo: "https://github.com/dev-protocol/asset.stakes.social/blob/main/public/wallet/walletlink.jpg?raw=true",
          name: "WalletLink",
          description: "Scan with WalletLink to connect",
        },
        package: walletLinkProvider,
        connector: async (provider: any) => {
          await provider.enable();

          return provider;
        },
      },
    };
  };

  const onWalletConnect = async () => {
    const web3ForInjected: any = await detectEthereumProvider();
    if (!web3ForInjected) {
      // NOTE: If the localStorage cache and metamask extension do not exist,
      //       processing conflicts and will not be able to login, so clear the cache here.
      web3Modal.clearCachedProvider();
      return;
    }
    const isAuthorized = await getAccountAddress(new Web3(web3ForInjected));
    if (!isAuthorized) {
      return;
    }
    const provider = await web3Modal.connect().catch(() => {
      return undefined;
    });
    if (provider === undefined) {
      return undefined;
    }

    connectWallet(setProviders, web3Modal);
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      setAuthState("loaded");
    });

    const web3Modal_ = new Web3Modal({
      cacheProvider: true,
      providerOptions: getProviderOptions(),
    });

    setWeb3Modal(web3Modal_);

    const settings = localStorage.getItem("settings");
    if (settings) {
      const { currency } = JSON.parse(settings);
      setIsCurrencyDEV(currency === "DEV");
    }
    getMinimumDevForMembership().then((snapshot) => {
      setMinDev(snapshot.data()?.minDev);
    });
  }, []);

  React.useEffect(() => {
    if (web3Modal?.cachedProvider === "injected") {
      onWalletConnect();
    }
  }, [web3Modal]);

  React.useEffect(() => {
    var totalStakeAmount = 0;
    if (address && ethersProvider) {
      getMinimumDevForMembership().then((minDev) => {
        detectStokens(ethersProvider, propertyAddress, address).then(
          (stokens) => {
            stokens?.forEach(( stoken, i) => {
              getStokenPositions(ethersProvider!, stoken).then(
                (positionStoken) => {
                  const stokenStake = parseFloat(
                    toNaturalNumber(positionStoken?.amount).toFixed()
                  );
                  totalStakeAmount = totalStakeAmount + stokenStake;
                  if (stokens.length === i + 1) {
                    setTotalStake(totalStakeAmount);
                  }
                }
              );
            });
            setMinDev(minDev.data()?.minDev);
            if (totalStakeAmount > minDev.data()?.minDev) {
              setIsFullMembership(true);
            } else {
              setIsFullMembership(true);
            }
          }
        );
      });
    }
  }, [address, ethersProvider, web3Modal]);

  const setProviders = (
    web3: Web3,
    ethersProvider: providers.BaseProvider,
    address: String
  ) => {
    setWeb3(web3);
    setEthersProvider(ethersProvider);
    setAddress(address);
  };

  const toggleCurrency = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ currency: !isCurrencyDEV ? "DEV" : "USD" })
    );
    setIsCurrencyDEV(!isCurrencyDEV);
  };

  const setMembership = (membership) => {
    setIsFullMembership(membership?.isFullMembership);
    setMinDev(membership?.minDev || minDev);
    setTotalStake(membership?.totalStake || 0);
  };

  // const { Component, pageProps, apollo } = this.props;

  return (
    <AuthStateContext.Provider
      value={{
        authState: authState,
      }}
    >
      <FullMembershipContext.Provider
        value={{
          isFullMembership: isFullMembership,
          minDev: minDev,
          totalStake: totalStake,
          setMembership: setMembership,
        }}
      >
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <WalletContext.Provider
              value={{
                web3: web3,
                ethersProvider: ethersProvider,
                setProviders: setProviders,
                web3Modal: web3Modal,
                address: address,
              }}
            >
              <Head>
                <title>Dev Academy</title>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
              </Head>
              {<Component {...pageProps} />}
            </WalletContext.Provider>
          </ChakraProvider>
        </ApolloProvider>
      </FullMembershipContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default NextApp;
