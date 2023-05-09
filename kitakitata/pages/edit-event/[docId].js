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
  Container,
  Divider,
  FormHelperText,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import GoBack from "@/components/GoBack"
import UploadPhotoEvent from "@/components/UploadPhotoEvent"

export default function EditEvent() {
  const { initDB, updateEvent, getEvent, user, setIsLoginModalOpen } =
    useContext(AppContext)
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
    if (isNil(user)) {
      setIsLoginModalOpen(true)
    } else {
      const eventDataCopy = { ...eventData }
      await updateEvent(docId, eventDataCopy)
    }
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
        <Container maxW={"8xl"}>
          <Box justifyContent="flex-start" my="28px">
            <GoBack />
          </Box>

          <Box
            mx="auto"
            w={"full"}
            maxW={"462px"}
            borderColor="black"
            borderWidth="1px"
            boxShadow="8px 8px 0px"
          >
            <Heading
              fontSize="24px"
              fontWeight="500"
              color="black.text"
              p="32px"
              textAlign="center"
            >
              Update Event
            </Heading>
            <Divider borderColor="black" />
            <Stack spacing="24px" p="32px">
              <FormControl id="title">
                <FormHelperText>Event Title</FormHelperText>
                <Input
                  value={eventData?.title}
                  placeholder="Event Title"
                  onChange={handleInputChange}
                  maxLength={"100"}
                />
              </FormControl>
              <FormControl id="organizer">
                <FormHelperText>Organizer</FormHelperText>
                <Input
                  value={eventData?.organizer}
                  placeholder="Organizer"
                  onChange={handleInputChange}
                  maxLength={"100"}
                />
              </FormControl>
              <FormControl id="location">
                <FormHelperText>Location</FormHelperText>
                <Input
                  value={eventData?.location}
                  placeholder="Location"
                  onChange={handleInputChange}
                  maxLength={"100"}
                />
              </FormControl>
              <FormControl id="start_time">
                <FormHelperText>Local Start Time</FormHelperText>
                <Input
                  value={eventData?.start_time}
                  placeholder="Select Start Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="end_time">
                <FormHelperText>Local End Time</FormHelperText>
                <Input
                  value={eventData?.end_time}
                  placeholder="Select End Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="event_details">
                <FormHelperText>Details</FormHelperText>
                <Textarea
                  value={eventData?.event_details}
                  placeholder="Details"
                  onChange={handleInputChange}
                  maxLength={"250"}
                />
              </FormControl>

              <UploadPhotoEvent />
              <Button
                py="14px"
                onClick={() => {
                  handleUpdateEventClick()
                }}
              >
                Create Event
              </Button>
            </Stack>
          </Box>
        </Container>
      </Layout>
    </>
  )
}
