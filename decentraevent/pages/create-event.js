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
  Container,
  InputGroup,
  InputLeftElement,
  Switch,
  FormHelperText,
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { isNil } from "ramda"
import GoBack from "@/components/GoBack"
import { usePlacesWidget } from "react-google-autocomplete"
import { Search2Icon } from "@chakra-ui/icons"
import Link from "next/link"
import { toast } from "react-toastify"
import UploadPhotoEvent from "@/components/UploadPhotoEvent"

export default function CreateEvent() {
  const {
    createEvent,
    user,
    setIsLoginModalOpen,
    isRequiredEventDataValid,
    getPhotoBundlrId,
    isLoading,
  } = useContext(AppContext)
  const [eventData, setEventData] = useState({})
  const [placeUrl, setPlaceUrl] = useState(null)
  const [useGooglePlaces, setUseGooglePlaces] = useState(false)
  const locationRef = useRef()
  const [file, setFile] = useState()
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

  const handleCreateEventClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
      return
    }

    if (isRequiredEventDataValid(eventData)) {
      const eventDataCopy = { ...eventData }
      if (acceptedFile) {
        const _image_id = await getPhotoBundlrId(acceptedFile)
        eventDataCopy.image_id = _image_id
      }
      console.log("handleCreateEventClick() eventDataCopy", eventDataCopy)
      console.log("handleCreateEventClick() eventData", eventData)
      await createEvent(eventDataCopy)
    }
  }

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.id]: e.target.value,
    })
  }

  const handleInputChangeNum = (e) => {
    setEventData({
      ...eventData,
      [e.target.id]: parseInt(e.target.value),
    })
  }

  const handleUploadPhoto = async () => {
    try {
      const response = await fetch("/api/uploadPhoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventData }),
      })
      const responseJson = await response.json()
      console.log("handleUploadPhoto() responseJson", responseJson)

      if (responseJson.error) {
        throw new Error(responseJson.error)
      } else {
        console.log("Image uploaded successfully!")
        toast("Image uploaded successfully!")
      }
    } catch (e) {
      console.log(e)
      toast(e)
    }
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
                <FormLabel>
                  Event Title <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  placeholder="Event Title"
                  onChange={handleInputChange}
                  maxLength={"75"}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="organizer">
                <FormLabel>
                  Organizer <span style={{ color: "red" }}>*</span>
                </FormLabel>
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
                  onChange={handleLocationSwitchChange}
                />
              </FormControl>
              <FormControl
                id="location"
                style={{ marginTop: "0px" }}
                hidden={!useGooglePlaces}
              >
                <FormLabel>
                  Google Location <span style={{ color: "red" }}>*</span>
                </FormLabel>
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
                <FormLabel>
                  Location <span style={{ color: "red" }}>*</span>
                </FormLabel>
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
                <FormLabel>
                  Local Start Time <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  placeholder="Select Start Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="end_time">
                <FormLabel>
                  Local End Time <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  placeholder="Select End Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                  borderColor="#98A2B3"
                />
              </FormControl>
              <FormControl id="rsvp_limit">
                <FormLabel>RSVP Limit</FormLabel>
                <Tooltip label="Max # of attendees" placement="top">
                  <Input
                    placeholder="RSVP Limit"
                    size="md"
                    type="number"
                    onChange={handleInputChangeNum}
                    borderColor="#98A2B3"
                  />
                </Tooltip>
              </FormControl>
              <FormControl id="nft_contract">
                <FormLabel>ERC-721 Contract Address</FormLabel>
                <Tooltip label="Required for token gating" placement="top">
                  <Input
                    placeholder="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                    size="md"
                    type="string"
                    onChange={handleInputChange}
                    borderColor="#98A2B3"
                  />
                </Tooltip>
              </FormControl>
              <FormControl id="chain_id">
                <FormLabel>Chain ID</FormLabel>
                <Tooltip label="Required for token gating" placement="top">
                  <Input
                    placeholder="1 (ETH) or 137 (MATIC)"
                    size="md"
                    type="number"
                    onChange={handleInputChangeNum}
                    borderColor="#98A2B3"
                  />
                </Tooltip>
              </FormControl>
              <FormControl id="event_details">
                <FormLabel>Details</FormLabel>
                <Textarea
                  placeholder="Details"
                  onChange={handleInputChange}
                  maxLength={"800"}
                  borderColor="#98A2B3"
                />
              </FormControl>

              <UploadPhotoEvent updatePhotoEvent={updatePhotoEvent} />
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
                isLoading={isLoading}
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
