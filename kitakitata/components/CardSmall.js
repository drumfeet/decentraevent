import { CalendarIcon, TimeIcon } from "@chakra-ui/icons"
import { Box, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { GoLocation } from "react-icons/go"

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

  const handleViewEvent = (metadata) => {
    window.open(`/view-event/${metadata.id}`, "_blank")
  }

  return (
    <>
      <Box>
        {/* <Image src="#" fallbackSrc={IMG_FALLBACK} /> */}
        <Box
          h="151px"
          bgGradient="linear-gradient(100deg, rgba(226,218,253,1) 0%, rgba(237,205,227,1) 99%)"
        />

        <Stack spacing="8px">
          <Heading
            mt="8px"
            size="md"
            noOfLines={1}
            cursor="pointer"
            onClick={() => {
              handleViewEvent(event)
            }}
          >
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
          <HStack fontSize="xs" color="gray.500">
            <GoLocation />
            <Text>{event?.data?.location}</Text>
          </HStack>
          {/* <Flex justifyContent="flex-end">
          <ExternalLinkIcon
            onClick={() => {
              handleViewEvent(event)
            }}
          />
        </Flex> */}
        </Stack>
      </Box>
    </>
  )
}
