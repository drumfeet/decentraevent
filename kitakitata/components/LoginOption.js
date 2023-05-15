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

export default function LoginOption({ isOpen, onClose, openConnectModal }) {
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
