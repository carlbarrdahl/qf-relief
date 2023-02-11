import { type AppType } from "next/dist/shared/lib/utils";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { mainnet, goerli, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";

import site from "config/site";

import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, goerli, optimism],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({ appName: site.title, chains });

const queryClient = new QueryClient();
const wagmiClient = createClient({ autoConnect: true, connectors, provider });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#1c1917",
            borderRadius: "medium",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default MyApp;
