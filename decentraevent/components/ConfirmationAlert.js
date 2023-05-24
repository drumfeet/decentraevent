import { useRef } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react"

const ConfirmationAlert = ({
  isOpen,
  onClose,
  onConfirmation,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
}) => {
  const cancelRef = useRef()

  const handleConfirmation = () => {
    onConfirmation()
    onClose()
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCloseOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="24px" fontWeight="500" align="center">
              {title}
            </AlertDialogHeader>
            <Divider borderColor="black" />
            <AlertDialogBody my="24px">{message}</AlertDialogBody>
            <AlertDialogFooter>
              <HStack>
                <Button ref={cancelRef} onClick={onClose}>
                  {cancelButtonText}
                </Button>
                <Button onClick={handleConfirmation}>
                  {confirmButtonText}
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ConfirmationAlert
