import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

export default function GoBack() {
  const handleGoBackClick = () => {
    window.history.back()
  }

  return (
    <Button
      variant="ghost"
      leftIcon={<ChevronLeftIcon />}
      fontSize="16px"
      fontWeight="400"
      color="#546A7B"
      _hover={{
        borderColor: "black",
        borderWidth: "1px",
        boxShadow: "4px 4px 0px #000000",
      }}
      onClick={() => handleGoBackClick()}
    >
      Go Back
    </Button>
  )
}
