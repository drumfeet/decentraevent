import { isNil } from "ramda"
import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function RainbowWallet() {
  const { login, logout, db, handleLensLogin } = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

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
                      <Menu isOpen={isOpen} onClose={onClose}>
                        <MenuButton onClick={onOpen}>Login</MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              openConnectModal()
                            }}
                          >
                            EVM
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleLensLogin()
                            }}
                          >
                            Lens
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </>
                  )
                } else {
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
          )
        }}
      </ConnectButton.Custom>
    </>
  )
}
