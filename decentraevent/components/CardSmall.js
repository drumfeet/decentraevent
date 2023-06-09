import { CalendarIcon, TimeIcon } from "@chakra-ui/icons"
import { Box, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { GoLocation } from "react-icons/go"
import { useState } from "react"

export default function CardSmall({ event }) {
  const MILLISECONDS = 1000
  const [imageLoaded, setImageLoaded] = useState(true)
  const urlImage = `https://arweave.net/${event?.data?.image_id}`

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
    // window.open(`/view-event/${metadata.id}`, "_blank")

    const title = metadata.data.title.replace(/ /g, "-")
    window.open(`/${title}/${metadata.data.event_id}`, "_blank")
  }

  const handleImageError = () => {
    setImageLoaded(false)
  }

  return (
    <>
      <Box>
        {imageLoaded ? (
          <Image
            src={urlImage}
            alt="Image"
            h="151px"
            objectFit="contain"
            onError={handleImageError}
            cursor="pointer"
            onClick={() => {
              handleViewEvent(event)
            }}
          />
        ) : (
          <Box
            h="151px"
            bgGradient="linear-gradient(90deg, #A163B9 0%, #874DA1 14.06%, #593980 27.2%, #413A78 40.39%, #3D5584 52.48%, #426F93 64.13%, #518BA4 74.25%, #5EA6B5 83.04%, #5FAFBB 90.95%, #67B5BC 97.99%)"
            cursor="pointer"
            onClick={() => {
              handleViewEvent(event)
            }}
          />
        )}

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
            <Text>{event?.data?.location?.name}</Text>
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
