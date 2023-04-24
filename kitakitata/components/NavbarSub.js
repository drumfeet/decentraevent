import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons"
import { useState } from "react"

export default function NavbarSub() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = () => {
    console.log(`Search for ${searchValue}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex alignItems="center" justifyContent="flex-end">
        <InputGroup width="auto">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />

          <Input
            type="search"
            placeholder="Search events"
            maxLength={"100"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  )
}
