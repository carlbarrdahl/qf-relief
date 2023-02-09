import { type AppType } from "next/dist/shared/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { mainnet, goerli } from "wagmi/chains";

import "../styles/globals.css";

import site from "config/site";

import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({ appName: site.title, chains });

const wagmiClient = createClient({ autoConnect: true, connectors, provider });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
