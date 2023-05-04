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

const EVENTS_PER_PAGE = 6

export default function Feature() {
  const { events, initDB, updateEventsList } = useContext(AppContext)

  const handlelSearchClick = () => {
    toast("Feature coming soon!")
  }

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
