import { CalendarIcon } from "@chakra-ui/icons"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react"
import { GoLocation } from "react-icons/go"
import { toast } from "react-toastify"

export default function Search() {
  const handlelSearchClick = () => {
    toast("Feature coming soon!")
  }

  return (
    <Stack
      spacing={{ base: 4, md: 0 }}
      direction={{ base: "column", md: "row" }}
      mt={{ md: "16px" }}
    >
      <InputGroup mr={{ base: 0, md: "16px" }}>
        <InputLeftElement
          pointerEvents="none"
          children={<CalendarIcon color="black.border" />}
        />
        <Input
          placeholder="Event name"
          borderColor="black.border"
          borderRadius={0}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<GoLocation color="black.border" />}
        />
        <Input
          placeholder="Location"
          borderColor="black.border"
          borderRadius={0}
        />
      </InputGroup>
      <Button py="10px" px="50px" onClick={() => handlelSearchClick()}>
        Search
      </Button>
    </Stack>
  )
}
