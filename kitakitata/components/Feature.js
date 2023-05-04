import { AppContext } from "@/context/AppContext"
import { SearchIcon } from "@chakra-ui/icons"
import {
  Flex,
  Button,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Grid,
  GridItem,
  Box,
  Container,
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import CardSmall from "./CardSmall"

const EVENTS_PER_PAGE = 6

export default function Feature() {
  const { events, initDB, updateEventsList } = useContext(AppContext)

  useEffect(() => {
    if (initDB) {
      updateEventsList(true)
    }
  }, [initDB])

  const startIdx = 0
  const endIdx = startIdx + EVENTS_PER_PAGE
  const eventsToShow = events.slice(startIdx, endIdx)
  const MARGIN_RIGHT = "16px"

  return (
    <>
      <Container maxW="5xl">
        <Flex flexDirection="column" mt="88px" mb="58px">
          <Heading size="md">Find Events</Heading>
          <Flex id="search" justifyContent="space-between">
            <InputGroup mr={MARGIN_RIGHT}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="brand.light" />}
              />
              <Input placeholder="Event name" borderColor="brand.light" />
            </InputGroup>
            <InputGroup mr={MARGIN_RIGHT}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="brand.light" />}
              />
              <Input placeholder="Location" borderColor="brand.light" />
            </InputGroup>
            <Button onClick={() => toast("Feature coming soon!")}>
              Search
            </Button>
          </Flex>
        </Flex>

        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={6}
        >
          {eventsToShow.map((event) => {
            return (
              <GridItem
                w="100%"
                maxW="301px"
                maxH="297px"
                key={event.id}
                borderWidth="1px"
                borderColor="#1D2939"
              >
                <CardSmall event={event} />
              </GridItem>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}
