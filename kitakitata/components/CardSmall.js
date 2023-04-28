import { CalendarIcon, ExternalLinkIcon, TimeIcon } from "@chakra-ui/icons"
import { Box, HStack, Heading, Image, Text, Flex } from "@chakra-ui/react"

export default function CardSmall({ event }) {
  const IMG_FALLBACK = "https://via.placeholder.com/293x160"
  const MILLISECONDS = 1000

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

  return (
    <>
      <Image borderTopRadius="12px" src="#" fallbackSrc={IMG_FALLBACK} />

      <Box p="12px">
        <Heading size="md" noOfLines={1}>
          {event?.data?.title}
        </Heading>
        <HStack fontSize="xs" color="gray.500">
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
    </>
  )
}
