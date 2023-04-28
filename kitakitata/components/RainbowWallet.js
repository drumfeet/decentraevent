import { isNil } from "ramda"
import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import LoginOption from "./LoginOption"

export default function RainbowWallet() {
  const { login, logout, db, isLoginModalOpen, setIsLoginModalOpen } =
    useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const handleLoginModalOpen = () => {
    console.log("handleLoginModalOpen")
    setIsLoginModalOpen(true)
  }

  const handleLoginModalClose = () => {
    console.log("handleLoginModalClose")
    setIsLoginModalOpen(false)
  }

  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading"
          const connected =
            db &&
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated")

          useEffect(() => {
            console.log("useEffect connected", connected)
            if (connected) {
              login(account?.address)
            }
          }, [connected])

          useEffect(() => {
            if (isNil(account)) {
              logout()
            }
          }, [account])

          return (
            <>
              <LoginOption
                isOpen={isLoginModalOpen}
                onClose={handleLoginModalClose}
                openConnectModal={openConnectModal}
              />

              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <>
                        <Text
                          onClick={() => {
                            handleLoginModalOpen()
                          }}
                        >
                          Login
                        </Text>
                      </>
                    )
                  }
                  if (chain?.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    )
                  }
                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <>
                        <Menu isOpen={isOpen} onClose={onClose}>
                          <MenuButton onClick={onOpen}>
                            {account?.address.slice(0, 8)}
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={async () => {
                                await router.push("/user-profile")
                              }}
                            >
                              Profile
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                openAccountModal()
                              }}
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </>
                    </div>
                  )
                })()}
              </div>
            </>
          )
        }}
      </ConnectButton.Custom>
    </>
  )
}
