import { AppContext } from "@/context/AppContext"
import { CalendarIcon, ExternalLinkIcon, TimeIcon } from "@chakra-ui/icons"
import {
  Flex,
  Text,
  Button,
  Image,
  Heading,
  Box,
  HStack,
} from "@chakra-ui/react"
import { take } from "ramda"
import { useContext, useState } from "react"

const MILLISECONDS = 1000
const NUM_OF_CARDS = 8
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
  const [numCardsToShow, setNumCardsToShow] = useState(NUM_OF_CARDS)

  const handleSeeMore = async () => {
    setNumCardsToShow(numCardsToShow + NUM_OF_CARDS)
  }

  return (
    <>
      <Flex justifyContent="flex-start" alignItems="center" flexWrap="wrap">
        {take(numCardsToShow, events).map((v) => {
          return (
            <Box boxShadow="base" borderRadius="12px">
              <Image
                borderTopRadius="12px"
                src="#"
                fallbackSrc={IMG_FALLBACK}
              />

              <Box p="4">
                <Heading size="md" noOfLines={1}>
                  {v?.data?.title}
                </Heading>
                <HStack fontSize="sm" color="gray.500">
                  <CalendarIcon />
                  <Text>{getDateString(v?.data?.start_time)}</Text>
                  <HStack flex="1" ml="auto" justifyContent="flex-end">
                    <TimeIcon />
                    <Text>{getTimeString(v?.data?.start_time)}</Text>
                  </HStack>
                </HStack>
                <Flex justifyContent="flex-end">
                  <ExternalLinkIcon />
                </Flex>
              </Box>
            </Box>
          )
        })}
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        {events.length > numCardsToShow && (
          <Button variant="outline" mb={28} onClick={handleSeeMore}>
            See More
          </Button>
        )}
      </Flex>
    </>
  )
}
