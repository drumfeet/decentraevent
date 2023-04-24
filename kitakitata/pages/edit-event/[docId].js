import Layout from "@/components/Layout"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"

export default function EditEvent() {
  const { updateEvent, eventData, setEventData } = useContext(AppContext)
  const router = useRouter()
  const { docId, metadata } = router.query
  const jsonMetadata = metadata ? JSON.parse(metadata) : null

  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  useEffect(() => {
    if (!isNil(jsonMetadata)) {
      setEventData(jsonMetadata.data)
      convertDateTime()
    }
  }, [docId, metadata])

  const handleInputChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }

  const convertDateTime = () => {
    const MILLISECONDS = 1000

    const startTimeUnix = new Date(jsonMetadata.data.start_time * MILLISECONDS)
    const offsetMinutesStartTime = startTimeUnix.getTimezoneOffset()
    startTimeUnix.setMinutes(
      startTimeUnix.getMinutes() - offsetMinutesStartTime
    )
    const startTimeIsoString = startTimeUnix.toISOString().slice(0, 16)
    setStartTime(startTimeIsoString)

    const endTimeUnix = new Date(jsonMetadata.data.end_time * MILLISECONDS)
    const offsetMinutesEndTime = endTimeUnix.getTimezoneOffset()
    endTimeUnix.setMinutes(endTimeUnix.getMinutes() - offsetMinutesEndTime)
    const endTimeIsoString = endTimeUnix.toISOString().slice(0, 16)
    setEndTime(endTimeIsoString)
  }

  return (
    <>
      <Layout>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Create awesome events! ✌️</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                learn, enjoy, and have fun with community meetups
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="title">
                  <FormLabel>Event Title</FormLabel>
                  <Input
                    defaultValue={eventData?.title}
                    placeholder="Event Title"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="organizer">
                  <FormLabel>Organizer</FormLabel>
                  <Input
                    defaultValue={eventData?.organizer}
                    placeholder="Organizer"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel>Location</FormLabel>
                  <Input
                    defaultValue={eventData?.location}
                    placeholder="Location"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="start_time">
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    defaultValue={startTime}
                    placeholder="Select Start Time"
                    size="md"
                    type="datetime-local"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="end_time">
                  <FormLabel>End Time</FormLabel>
                  <Input
                    defaultValue={endTime}
                    placeholder="Select End Time"
                    size="md"
                    type="datetime-local"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="event_details">
                  <FormLabel>Details</FormLabel>
                  <Textarea
                    defaultValue={eventData?.event_details}
                    placeholder="Details"
                    onChange={handleInputChange}
                    maxLength={"250"}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => {
                      updateEvent(docId)
                    }}
                  >
                    Update Event
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Layout>
    </>
  )
}
