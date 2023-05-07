import { Flex, Heading, Container } from "@chakra-ui/react"
import Search from "./Search"
import EventsGrid from "./EventsGrid"

export default function Feature() {
  return (
    <>
      <Container maxW="5xl">
        <Flex flexDirection="column" mt="88px" mb="58px">
          <Heading textAlign="center" fontSize="48px">
            Find Events
          </Heading>
          <Search />
        </Flex>
        <EventsGrid showPagination={false} />
      </Container>
    </>
  )
}
