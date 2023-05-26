import { Flex, Container } from "@chakra-ui/react"
import Search from "./Search"
import EventsGrid from "./EventsGrid"

export default function Events() {
  return (
    <>
      <Container maxW="5xl">
        <Flex flexDirection="column" mt="32px" mb="58px">
          <Search />
        </Flex>
        <EventsGrid />
      </Container>
    </>
  )
}
