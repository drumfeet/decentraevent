import { AppContext } from "@/context/AppContext"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CalendarIcon,
  ExternalLinkIcon,
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
  Wrap,
} from "@chakra-ui/react"
import { useContext, useState } from "react"

const EVENTS_PER_PAGE = 3
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

export default function CardSmall() {
  const { events } = useContext(AppContext)
  const [page, setPage] = useState(1)

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
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
        <Wrap mx="-4" justify="space-around">
          {eventsToShow.map((event) => {
            return (
              <Box
                key={event.id}
                borderWidth="1px"
                borderColor="#EAECF0"
                borderRadius={CARD_RADIUS}
                maxW="293px"
              >
                <Image
                  borderTopRadius={CARD_RADIUS}
                  src="#"
                  fallbackSrc={IMG_FALLBACK}
                />

                <Box p="12px">
                  <Heading size="md" noOfLines={1}>
                    {event?.data?.title}
                  </Heading>
                  <HStack fontSize="sm" color="gray.500">
                    <CalendarIcon />
                    <Text>{getDateString(event?.data?.start_time)}</Text>
                    <HStack flex="1" ml="auto" justifyContent="flex-end">
                      <TimeIcon />
                      <Text>{getTimeString(event?.data?.start_time)}</Text>
                    </HStack>
                  </HStack>
                  <Flex justifyContent="flex-end">
                    <ExternalLinkIcon />
                  </Flex>
                </Box>
              </Box>
            )
          })}
        </Wrap>
      </Container>

      <Flex justifyContent="center" alignItems="center">
        {numPages > 1 && (
          <HStack spacing={4}>
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="ghost"
              disabled={page === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>

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

            <Button
              rightIcon={<ArrowForwardIcon />}
              variant="ghost"
              disabled={page === numPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </HStack>
        )}
      </Flex>
    </>
  )
}
