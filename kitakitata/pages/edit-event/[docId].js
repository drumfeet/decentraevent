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
  const { initDB, updateEvent, getEvent } = useContext(AppContext)
  const router = useRouter()
  const { docId } = router.query
  const TIME_NUMERIC = "2000-12-25T08:00"
  const [eventData, setEventData] = useState({
    title: "",
    organizer: "",
    location: "",
    start_time: TIME_NUMERIC,
    end_time: TIME_NUMERIC,
    event_details: "",
  })

  const handleInputChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }

  const handleUpdateEventClick = async () => {
    const eventDataCopy = { ...eventData }
    await updateEvent(docId, eventDataCopy)
  }

  const getDateTime = (time) => {
    const MILLISECONDS = 1000
    const timeUnix = new Date(time * MILLISECONDS)
    const offsetMinutesStartTime = timeUnix.getTimezoneOffset()
    timeUnix.setMinutes(timeUnix.getMinutes() - offsetMinutesStartTime)
    const timeIsoNumeric = timeUnix.toISOString().slice(0, 16)

    return timeIsoNumeric
  }

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _event = await getEvent(docId)
        if (!isNil(_event?.data)) {
          setEventData({
            ...eventData,
            title: _event?.data?.title,
            organizer: _event?.data?.organizer,
            location: _event?.data?.location,
            start_time: getDateTime(_event?.data?.start_time),
            end_time: getDateTime(_event?.data?.end_time),
            event_details: _event?.data?.event_details,
          })
          console.log("EditEvent _event", _event)
        }
      }
    })()
  }, [initDB])

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
                    value={eventData?.title}
                    placeholder="Event Title"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="organizer">
                  <FormLabel>Organizer</FormLabel>
                  <Input
                    value={eventData?.organizer}
                    placeholder="Organizer"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel>Location</FormLabel>
                  <Input
                    value={eventData?.location}
                    placeholder="Location"
                    onChange={handleInputChange}
                    maxLength={"100"}
                  />
                </FormControl>
                <FormControl id="start_time">
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    value={eventData?.start_time}
                    placeholder="Select Start Time"
                    size="md"
                    type="datetime-local"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="end_time">
                  <FormLabel>End Time</FormLabel>
                  <Input
                    value={eventData?.end_time}
                    placeholder="Select End Time"
                    size="md"
                    type="datetime-local"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="event_details">
                  <FormLabel>Details</FormLabel>
                  <Textarea
                    value={eventData?.event_details}
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
                      handleUpdateEventClick()
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
