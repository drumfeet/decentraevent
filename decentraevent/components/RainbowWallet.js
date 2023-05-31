import { isNil } from "ramda"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import LoginOption from "./LoginOption"

export default function RainbowWallet() {
  const { login, logout, db, isLoginModalOpen, setIsLoginModalOpen } =
    useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [userSignedTx, setUserSignedTx] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleLoginModalOpen = () => {
    console.log("handleLoginModalOpen")
    setIsLoginModalOpen(true)
  }

  const handleLoginModalClose = () => {
    console.log("handleLoginModalClose")
    setIsLoginModalOpen(false)
  }

  const onLoginSuccess = () => {
    console.log(">>onLoginSuccess()")
    setUserSignedTx(true)
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
              setIsConnected(true)
              login(account?.address, onLoginSuccess)
            }
          }, [connected])

          useEffect(() => {
            if (isNil(account)) {
              setUserSignedTx(false)
              setIsConnected(false)
              logout()
            }
          }, [account])

          const conditionalProps = !ready
            ? {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              }
            : {}

          return (
            <>
              <LoginOption
                isOpen={isLoginModalOpen}
                onClose={handleLoginModalClose}
                openConnectModal={openConnectModal}
                isConnected={isConnected}
                userSignedTx={userSignedTx}
              />

              {(() => {
                if (!connected) {
                  return (
                    <>
                      <Button
                        {...conditionalProps}
                        px="51px"
                        py="14px"
                        onClick={() => {
                          handleLoginModalOpen()
                        }}
                      >
                        Login
                      </Button>
                    </>
                  )
                } else if (connected && !userSignedTx) {
                  return (
                    <>
                      <Button
                        {...conditionalProps}
                        px="51px"
                        py="14px"
                        onClick={() => {
                          login(account?.address, onLoginSuccess)
                        }}
                      >
                        Sign Tx
                      </Button>
                    </>
                  )
                }
                if (chain?.unsupported) {
                  return (
                    <Button
                      {...conditionalProps}
                      onClick={openChainModal}
                      type="button"
                    >
                      Wrong network
                    </Button>
                  )
                }
                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <>
                      <Menu
                        {...conditionalProps}
                        isOpen={isOpen}
                        onClose={onClose}
                      >
                        <MenuButton as={Button} onClick={onOpen}>
                          {account?.address.slice(0, 4)}..
                          {account?.address.slice(-4)}
                        </MenuButton>
                        <MenuList fontSize="18px" fontWeight="400">
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
            </>
          )
        }}
      </ConnectButton.Custom>
    </>
  )
}
