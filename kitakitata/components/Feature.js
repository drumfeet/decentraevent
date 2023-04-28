import { AppContext } from "@/context/AppContext"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CalendarIcon,
  ExternalLinkIcon,
  SearchIcon,
  TimeIcon,
} from "@chakra-ui/icons"
import {
  Flex,
  Text,
  Button,
  Image,
  Heading,
  Box,
  HStack,
  Container,
  InputGroup,
  Input,
  InputLeftElement,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import CardSmall from "./CardSmall"

const EVENTS_PER_PAGE = 4
const CARD_RADIUS = "12px"
const MILLISECONDS = 1000
const IMG_FALLBACK = "https://via.placeholder.com/293x160"

const getDateString = (timestamp) => {
  const date = new Date(timestamp * MILLISECONDS)
  const dateString = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return `${dateString}`
}

const getTimeString = (timestamp) => {
  const date = new Date(timestamp * MILLISECONDS)
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  })

  return `${timeString}`
}

export default function Feature() {
  const { events } = useContext(AppContext)
  const [page, setPage] = useState(1)

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(events.length / EVENTS_PER_PAGE))
    )
  }

  const handlePageSelect = (newPage) => {
    setPage(newPage)
  }

  const numPages = Math.ceil(events.length / EVENTS_PER_PAGE)
  const startIdx = (page - 1) * EVENTS_PER_PAGE
  const endIdx = startIdx + EVENTS_PER_PAGE
  const eventsToShow = events.slice(startIdx, endIdx)

  return (
    <>
      <Container maxW="6xl">
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
            "repeat(4, 1fr)",
          ]}
          gap={6}
        >
          {eventsToShow.map((event) => {
            return (
              <GridItem
                w="100%"
                maxW="293px"
                key={event.id}
                borderWidth="1px"
                borderColor="#EAECF0"
                borderRadius={CARD_RADIUS}
              >
                <CardSmall event={event} />
              </GridItem>
            )
          })}
        </Grid>

        {/* <Flex justifyContent="space-between" alignItems="center" mt="8">
          {numPages > 1 && (
            <HStack spacing={4} width="100%">
              <Button
                leftIcon={<ArrowBackIcon />}
                variant="ghost"
                disabled={page === 1}
                onClick={handlePreviousPage}
                flexShrink="0"
              >
                Previous
              </Button>

              <HStack flexGrow="1" justifyContent="center">
                {[...Array(numPages)].map((_, idx) => {
                  const pageNum = idx + 1
                  const isSelected = pageNum === page

                  return (
                    <Button
                      key={pageNum}
                      variant={isSelected ? "solid" : "ghost"}
                      onClick={() => handlePageSelect(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </HStack>

              <Button
                rightIcon={<ArrowForwardIcon />}
                variant="ghost"
                disabled={page === numPages}
                onClick={handleNextPage}
                marginLeft="auto"
                flexShrink="0"
              >
                Next
              </Button>
            </HStack>
          )}
        </Flex> */}
      </Container>

      <Container maxW="6xl" mt={16}>
        <Flex flexDirection="column" my={4}>
          <Heading size="md" mb={4}>
            Popular Events
          </Heading>
        </Flex>

        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={6}
        >
          {eventsToShow.map((event) => {
            return (
              <GridItem
                w="100%"
                maxW="293px"
                key={event.id}
                borderWidth="1px"
                borderColor="#EAECF0"
                borderRadius={CARD_RADIUS}
              >
                <CardSmall event={event} />
              </GridItem>
            )
          })}
        </Grid>

        {/* <Flex justifyContent="space-between" alignItems="center" mt="8">
          {numPages > 1 && (
            <HStack spacing={4} width="100%">
              <Button
                leftIcon={<ArrowBackIcon />}
                variant="ghost"
                disabled={page === 1}
                onClick={handlePreviousPage}
                flexShrink="0"
              >
                Previous
              </Button>

              <HStack flexGrow="1" justifyContent="center">
                {[...Array(numPages)].map((_, idx) => {
                  const pageNum = idx + 1
                  const isSelected = pageNum === page

                  return (
                    <Button
                      key={pageNum}
                      variant={isSelected ? "solid" : "ghost"}
                      onClick={() => handlePageSelect(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </HStack>

              <Button
                rightIcon={<ArrowForwardIcon />}
                variant="ghost"
                disabled={page === numPages}
                onClick={handleNextPage}
                marginLeft="auto"
                flexShrink="0"
              >
                Next
              </Button>
            </HStack>
          )}
        </Flex> */}
      </Container>
    </>
  )
}
