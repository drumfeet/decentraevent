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
  Container,
  Divider,
  FormHelperText,
  Switch,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { usePlacesWidget } from "react-google-autocomplete"
import GoBack from "@/components/GoBack"
import UploadPhotoEvent from "@/components/UploadPhotoEvent"
import { Search2Icon } from "@chakra-ui/icons"
import Link from "next/link"

export default function EditEvent() {
  const {
    initDB,
    updateEvent,
    getEventWithDocId,
    user,
    setIsLoginModalOpen,
    isRequiredEventDataValid,
    getPhotoBundlrId,
    isLoading,
  } = useContext(AppContext)
  const router = useRouter()
  const { docId } = router.query
  const TIME_NUMERIC = "2000-12-25T08:00"
  const [eventData, setEventData] = useState({
    title: "",
    organizer: "",
    location: {},
    start_time: TIME_NUMERIC,
    end_time: TIME_NUMERIC,
    event_details: "",
  })
  const [placeUrl, setPlaceUrl] = useState(null)
  const [useGooglePlaces, setUseGooglePlaces] = useState(false)
  const locationRef = useRef()
  const [acceptedFile, setAcceptedFile] = useState()

  const updatePhotoEvent = (acceptedFiles) => {
    console.log("updatePhotoEvent() acceptedFiles", acceptedFiles)
    setAcceptedFile(acceptedFiles[0])
  }

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    onPlaceSelected: (place) => {
      const locationData = {
        name: place?.name,
        place_id: place?.place_id,
        formatted_address: place?.formatted_address,
        // address_components: place?.address_components,
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
      fields: [
        "name",
        "place_id",
        "formatted_address",
        // "address_components"
      ],
    },
  })

  const clearLocation = () => {
    setEventData({ ...eventData, location: null })
    ref.current.value = null
    locationRef.current.value = null
  }

  const handleLocationSwitchChange = (e) => {
    setUseGooglePlaces(e.target.checked)
    clearLocation()
  }

  const handleUpdateEventClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
      return
    }

    if (isRequiredEventDataValid(eventData)) {
      const _image_id = await getPhotoBundlrId(acceptedFile)
      const eventDataCopy = { ...eventData, image_id: _image_id }
      console.log("handleUpdateEventClick() eventDataCopy", eventDataCopy)
      console.log("handleUpdateEventClick() eventData", eventData)
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

  const handleInputChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }

  useEffect(() => {
    const _placeId = eventData?.location?.place_id
    console.log("useEffect eventData", eventData)
    console.log(`_placeId: ${_placeId}`)
    const _placeUrl = _placeId
      ? `https://www.google.com/maps/place/?q=place_id:${_placeId}`
      : null
    setPlaceUrl(_placeUrl)
    console.log(`placeUrl: ${_placeUrl}`)
  }, [eventData])

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _event = await getEventWithDocId(docId)
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
          locationRef.current.value = _event?.data?.location?.name
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
                <FormLabel>Event Title</FormLabel>
                <Input
                  value={eventData?.title}
                  placeholder="Event Title"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="organizer">
                <FormLabel>Organizer</FormLabel>
                <Input
                  value={eventData?.organizer}
                  placeholder="Organizer"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl
                //  display="flex"
                style={{ marginBottom: "0px", display: "inline-flex" }}
                id="switch"
              >
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
                  onChange={handleLocationSwitchChange}
                />
              </FormControl>
              <FormControl
                id="location"
                style={{ marginTop: "0px" }}
                hidden={!useGooglePlaces}
              >
                <FormLabel>Google Location</FormLabel>
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
                <FormLabel>Location</FormLabel>
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
              <FormControl style={{ marginTop: "0px" }}>
                {placeUrl ? (
                  <>
                    <Link href={placeUrl} target="_blank">
                      <FormHelperText
                        textDecoration="underline"
                        fontSize="12px"
                        fontWeight="400"
                      >
                        View on Google Maps
                      </FormHelperText>
                    </Link>
                  </>
                ) : null}
              </FormControl>
              <FormControl id="start_time">
                <FormLabel>Local Start Time</FormLabel>
                <Input
                  value={eventData?.start_time}
                  placeholder="Select Start Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="end_time">
                <FormLabel>Local End Time</FormLabel>
                <Input
                  value={eventData?.end_time}
                  placeholder="Select End Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="event_details">
                <FormLabel>Details</FormLabel>
                <Textarea
                  value={eventData?.event_details}
                  placeholder="Details"
                  onChange={handleInputChange}
                  maxLength={"800"}
                  borderColor="#98A2B3"
                />
              </FormControl>

              <UploadPhotoEvent updatePhotoEvent={updatePhotoEvent} />
              <Button
                py="14px"
                onClick={() => {
                  handleUpdateEventClick()
                }}
                isLoading={isLoading}
              >
                Update Event
              </Button>
            </Stack>
          </Box>
        </Container>
      </Layout>
    </>
  )
}
