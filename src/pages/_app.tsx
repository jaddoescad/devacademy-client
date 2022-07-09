import * as React from "react";
import App, { AppInitialProps } from "next/app";
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
  isFullMembership: boolean;
  minDev: number | undefined;
  authState: "loading" | "loaded";
  totalStake: number
}

class NextApp extends App<AppInitialProps & WithApolloProps<{}>> {
  state: AuthStateType = {
    isCurrencyDEV: true,
    web3: undefined,
    ethersProvider: undefined,
    web3Modal: undefined,
    address: undefined,
    isFullMembership: false,
    minDev: undefined,
    totalStake: 0,
    authState: "loading",
  };

  getProviderOptions = () => {
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

  web3Modal: any;

  onWalletConnect = async () => {
    const web3ForInjected: any = await detectEthereumProvider();
    if (!web3ForInjected) {
      // NOTE: If the localStorage cache and metamask extension do not exist,
      //       processing conflicts and will not be able to login, so clear the cache here.
      this.web3Modal.clearCachedProvider();
      return;
    }
    const isAuthorized = await getAccountAddress(new Web3(web3ForInjected));
    if (!isAuthorized) {
      return;
    }
    const provider = await this.web3Modal.connect().catch(() => {
      return undefined;
    });
    if (provider === undefined) {
      return undefined;
    }

    connectWallet(this.setProviders, this.web3Modal);
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        this.setState({ authState: "loaded" });
    });

    this.web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: this.getProviderOptions(),
    });
    this.setState({ web3Modal: this.web3Modal });

    if (this.web3Modal.cachedProvider === "injected") {
      this.onWalletConnect();
    }

    const settings = localStorage.getItem("settings");
    if (settings) {
      const { currency } = JSON.parse(settings);
      this.setState({ isCurrencyDEV: currency === "DEV" });
    }
    getMinimumDevForMembership().then((snapshot) => {
      this.setState({
        minDev: snapshot.data()?.minDev
      })
    })
  };

  setProviders = (
    web3: Web3,
    ethersProvider: providers.BaseProvider,
    address: String
  ) => {
    this.setState({ web3, ethersProvider, address });
  };

  toggleCurrency = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ currency: !this.state.isCurrencyDEV ? "DEV" : "USD" })
    );
    this.setState({ isCurrencyDEV: !this.state.isCurrencyDEV });
  };

  setMembership = (membership) => {
    this.setState({
      isFullMembership: membership?.isFullMembership,
      minDev: membership?.minDev || this.state.minDev,
      totalStake: membership?.totalStake || 0
    });
  };

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <AuthStateContext.Provider
        value={{
          authState: this.state.authState,
        }}
      >
        <FullMembershipContext.Provider
          value={{
            isFullMembership: this.state.isFullMembership,
            minDev: this.state.minDev,
            totalStake: this.state.totalStake,
            setMembership: this.setMembership,
          }}
        >
          <ApolloProvider client={client}>
            <ChakraProvider theme={theme}>
              <WalletContext.Provider
                value={{
                  web3: this.state.web3,
                  ethersProvider: this.state.ethersProvider,
                  setProviders: this.setProviders,
                  web3Modal: this.state.web3Modal,
                  address: this.state.address,
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
  }
}

export default NextApp;
