import Layout from "@/components/Layout"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  Tooltip,
  Divider,
  FormHelperText,
  Container,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { isEmpty, isNil } from "ramda"
import { toast } from "react-toastify"
import GoBack from "@/components/GoBack"
import UploadPhotoEvent from "@/components/UploadPhotoEvent"
import { usePlacesWidget } from "react-google-autocomplete"

export default function CreateEvent() {
  const { createEvent, user, setIsLoginModalOpen } = useContext(AppContext)
  const [eventData, setEventData] = useState({})

  const { ref } = usePlacesWidget({
    apiKey:
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ||
      process.env.GOOGLE_PLACES_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place)
    },
    options: {
      types: ["geocode", "establishment"],
      fields: ["name", "place_id", "formatted_address", "address_components"],
    },
  })

  const isRequiredInputValid = () => {
    if (
      isNil(eventData.title) ||
      isNil(eventData.location) ||
      isNil(eventData.start_time) ||
      isNil(eventData.end_time) ||
      isEmpty(eventData.title) ||
      isEmpty(eventData.location) ||
      isEmpty(eventData.start_time) ||
      isEmpty(eventData.end_time)
    ) {
      toast("Title, Location, Start & End Time are required")
      return false
    }

    return true
  }

  const handleCreateEventClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
      return
    }

    if (!isRequiredInputValid()) {
      return
    }

    const eventDataCopy = { ...eventData }
    await createEvent(eventDataCopy)
  }

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.id]: e.target.value,
    })
  }

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
              Create Event
            </Heading>
            <Divider borderColor="black" />
            <Stack spacing="24px" p="32px">
              <FormControl id="title">
                <Input
                  placeholder="Event Title"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="organizer">
                <Input
                  placeholder="Organizer"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="location">
                <Input
                  placeholder="Location"
                  onChange={handleInputChange}
                  maxLength={"150"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="places">
                <Input
                  placeholder="Google Places"
                  ref={ref}
                  maxLength={"150"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="start_time">
                <FormHelperText>Local Start Time</FormHelperText>
                <Input
                  placeholder="Select Start Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="end_time">
                <FormHelperText>Local End Time</FormHelperText>
                <Input
                  placeholder="Select End Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="event_details">
                <Textarea
                  placeholder="Details"
                  onChange={handleInputChange}
                  maxLength={"800"}
                  borderColor="#98A2B3"
                />
              </FormControl>

              <UploadPhotoEvent />
              <FormControl id="event_admins" hidden={true}>
                <FormLabel>Event Admins</FormLabel>
                <Tooltip label="Enter a comma-separated list of wallet addresses that is an admin of the event.">
                  <Textarea
                    placeholder="0xCFe3e0E5B16d81E03EA2c4321B95f256aCe3aB8c,0x4e79fd1Ba59111b17817093AE36E812990A2634a"
                    onChange={handleInputChange}
                    maxLength={"280"}
                  />
                </Tooltip>
              </FormControl>
              <Button
                py="14px"
                onClick={() => {
                  handleCreateEventClick()
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
