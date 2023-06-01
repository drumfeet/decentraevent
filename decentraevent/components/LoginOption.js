import { AppContext } from "@/context/AppContext"
import {
  Stack,
  Button,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"
import { useContext } from "react"
import { toast } from "react-toastify"

export default function LoginOption({
  isOpen,
  onClose,
  openConnectModal,
  isConnected,
  userSignedTx,
}) {
  const { setIsLoginModalOpen, loginWithLens } = useContext(AppContext)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Stack>
              <Button
                onClick={() => {
                  setIsLoginModalOpen(false)
                  openConnectModal()
                  if (isConnected && !userSignedTx) {
                    toast("Sign Tx required for login")
                  }
                }}
              >
                Polygon
              </Button>
              <Button
                onClick={() => {
                  loginWithLens()
                }}
              >
                Lens
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
