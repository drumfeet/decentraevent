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
  InputGroup,
  InputLeftElement,
  Switch,
} from "@chakra-ui/react"
import { useContext, useRef, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { isEmpty, isNil } from "ramda"
import { toast } from "react-toastify"
import GoBack from "@/components/GoBack"
import UploadPhotoEvent from "@/components/UploadPhotoEvent"
import { usePlacesWidget } from "react-google-autocomplete"
import { Search2Icon } from "@chakra-ui/icons"

export default function CreateEvent() {
  const { createEvent, user, setIsLoginModalOpen } = useContext(AppContext)
  const [eventData, setEventData] = useState({})
  const [useGooglePlaces, setUseGooglePlaces] = useState(false)
  const locationRef = useRef()

  const { ref } = usePlacesWidget({
    apiKey:
      process.env.GOOGLE_PLACES_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    onPlaceSelected: (place) => {
      const locationData = {
        name: place?.name,
        place_id: place?.place_id,
        formatted_address: place?.formatted_address,
        address_components: place?.address_components,
      }
      console.log("onPlaceSelected : locationData", locationData)
      setEventData((eventData) => {
        return {
          ...eventData,
          location: locationData,
        }
      })
    },
    options: {
      types: ["geocode", "establishment"],
      fields: ["name", "place_id", "formatted_address", "address_components"],
    },
  })

  const clearLocation = () => {
    setEventData({ ...eventData, location: null })
    ref.current.value = null
    locationRef.current.value = null
  }

  const handleSwitchChange = (e) => {
    setUseGooglePlaces(e.target.checked)
    clearLocation()
  }

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
    console.log("handleCreateEventClick() eventData", eventData)
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
                <FormHelperText>Event Title</FormHelperText>
                <Input
                  placeholder="Event Title"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="organizer">
                <FormHelperText>Organizer</FormHelperText>
                <Input
                  placeholder="Organizer"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>

              <FormControl display="flex" id="switch">
                <FormLabel
                  style={{ marginBottom: "0px" }}
                  fontSize="12px"
                  fontWeight="400"
                >
                  Enable Google Maps
                </FormLabel>
                <Switch
                  colorScheme="teal"
                  isChecked={useGooglePlaces}
                  onChange={handleSwitchChange}
                />
              </FormControl>

              <FormControl
                id="location"
                style={{ marginTop: "0px" }}
                hidden={!useGooglePlaces}
              >
                <FormHelperText>Google Location</FormHelperText>
                <InputGroup>
                  <InputLeftElement>
                    <Search2Icon color="gray.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Google Location"
                    borderColor="#98A2B3"
                    ref={ref}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        location: { name: e.target.value },
                      })
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl
                id="location"
                style={{ marginTop: "0px" }}
                hidden={useGooglePlaces}
              >
                <FormHelperText>Location</FormHelperText>
                <Input
                  placeholder="Location"
                  borderColor="#98A2B3"
                  ref={locationRef}
                  maxLength={"150"}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      location: { name: e.target.value },
                    })
                  }
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
