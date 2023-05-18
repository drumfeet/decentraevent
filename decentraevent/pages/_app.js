import { AppContextProvider } from "@/context/AppContext"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/styles/theme"

import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { ToastContainer } from "react-toastify"

const { chains, provider } = configureChains([polygon], [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: "DecentraEvent",
  chains,
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider theme={theme}>
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}
