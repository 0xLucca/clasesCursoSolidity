import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({
      apiKey: "lPIlk3RwIrWNc6_VkykqiBw4rcrkcZ4G",
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Clase1_Dapp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#FF3F00",
          accentColorForeground: "#DEDCE5",
          borderRadius: "none",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
