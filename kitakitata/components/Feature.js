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

  return (
    <>
      <Container maxW="5xl">
        <Flex flexDirection="column" my={4}>
          <Heading size="md" mb={4}>
            Find Events
          </Heading>
          <Flex justifyContent="flex-start" alignItems="center">
            <InputGroup width="auto" mr="4">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Event name" />
            </InputGroup>
            <InputGroup width="auto" mr="4">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input placeholder="Location" />
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
