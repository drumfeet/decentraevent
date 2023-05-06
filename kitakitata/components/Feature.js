import { AppContext } from "@/context/AppContext"
import { CalendarIcon } from "@chakra-ui/icons"
import {
  Flex,
  Button,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Grid,
  GridItem,
  Container,
  Stack,
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import CardSmall from "./CardSmall"
import { GoLocation } from "react-icons/go"
import Search from "./Search"

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
        <Flex flexDirection="column" mt="88px" mb="58px">
          <Heading textAlign="center" fontSize="48px">
            Find Events
          </Heading>
          <Search />
        </Flex>

        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={6}
          justifyItems="center"
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
