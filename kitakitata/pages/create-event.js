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
  Text,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { isEmpty, isNil } from "ramda"
import { toast } from "react-toastify"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { GoCloudUpload } from "react-icons/go"

export default function CreateEvent() {
  const { createEvent, user, setIsLoginModalOpen } = useContext(AppContext)
  const [eventData, setEventData] = useState({})

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

  const handleGoBackClick = () => {
    window.history.back()
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
          <Box justifyContent="flex-start">
            <Button
              variant="ghost"
              leftIcon={<ChevronLeftIcon />}
              fontSize="16px"
              fontWeight="400"
              color="#546A7B"
              _hover={{
                borderColor: "black",
                borderWidth: "1px",
                boxShadow: "4px 4px 0px #000000",
              }}
              onClick={() => handleGoBackClick()}
            >
              Go Back
            </Button>
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
                  maxLength={"100"}
                />
              </FormControl>
              <FormControl id="organizer">
                <Input
                  placeholder="Organizer"
                  onChange={handleInputChange}
                  maxLength={"100"}
                />
              </FormControl>
              <FormControl id="location">
                <Input
                  placeholder="Location"
                  onChange={handleInputChange}
                  maxLength={"100"}
                />
              </FormControl>
              <FormControl id="start_time">
                <FormHelperText>Local Start Time</FormHelperText>
                <Input
                  placeholder="Select Start Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="end_time">
                <FormHelperText>Local End Time</FormHelperText>
                <Input
                  placeholder="Select End Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="event_details">
                <Textarea
                  placeholder="Details"
                  onChange={handleInputChange}
                  maxLength={"250"}
                />
              </FormControl>

              <Box borderWidth="1px" p="8px">
                <Stack align="center" justify="center" textAlign="center">
                  <GoCloudUpload size="28px" />
                  <Text fontSize="16px" fontWeight="500">
                    This feature is not yet available
                  </Text>
                  <Text fontSize="14px">Upload photo for event</Text>
                  <Text fontSize="12px">Click to upload or drag and drop</Text>
                  <Text fontSize="10px">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </Stack>
              </Box>
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
