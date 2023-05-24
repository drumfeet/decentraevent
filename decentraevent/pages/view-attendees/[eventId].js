import Layout from "@/components/Layout"
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Container,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {
  CalendarIcon,
  DownloadIcon,
  Search2Icon,
  TimeIcon,
} from "@chakra-ui/icons"
import { GoLocation } from "react-icons/go"
import Link from "next/link"

export default function ViewAttendees() {
  const router = useRouter()
  const { eventId } = router.query
  const {
    initDB,
    getEventAttendees,
    getEventWithEventId,
    getDateString,
    getTimeString,
  } = useContext(AppContext)
  const [eventAttendees, setEventAttendees] = useState([])
  const [eventData, setEventData] = useState({})
  const [placeUrl, setPlaceUrl] = useState(null)

  const justifyContent = useBreakpointValue({
    base: "flex-start",
    md: "flex-end",
  })

  const handleChangeCoverClick = () => {
    toast("Feature coming soon!")
  }

  const handleDownload = () => {
    const csvData = eventAttendees
      .map(
        (attendee) =>
          `${attendee?.decrypted.name},${attendee?.decrypted.email},${attendee?.decrypted.user_address},${attendee?.decrypted.company},${attendee?.decrypted.job_title}`
      )
      .join("\n")

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "attendees.csv")
    link.click()
    URL.revokeObjectURL(url)

    console.log("<<handleDownload")
  }

  useEffect(() => {
    const _placeId = eventData?.data?.location?.place_id
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
      try {
        if (initDB) {
          const _eventData = await getEventWithEventId(eventId)
          console.log("view-attendees eventId", eventId)
          console.log("view-attendees _eventData", _eventData)
          setEventData(_eventData.shift())

          const _eventAttendees = await getEventAttendees(eventId)
          console.log("view-attendees _eventAttendees", _eventAttendees)
          setEventAttendees(_eventAttendees)
        }
      } catch (e) {
        toast(e.message)
        console.error("useEffect view-attendees catch()", e)
      }
    })()
  }, [initDB])

  return (
    <Layout>
      <Container maxW={"8xl"}>
        <Box
          h="291px"
          bgGradient="linear-gradient(90deg, #A163B9 0%, #874DA1 14.06%, #593980 27.2%, #413A78 40.39%, #3D5584 52.48%, #426F93 64.13%, #518BA4 74.25%, #5EA6B5 83.04%, #5FAFBB 90.95%, #67B5BC 97.99%)"
          position="relative"
          mt="58px"
          mb="38px"
        >
          <Button
            position="absolute"
            bottom="16px"
            right="16px"
            bg="rgba(255, 255, 255, 0.5)"
            color="black.text"
            fontWeight="400"
            fontSize="16px"
            _hover={{
              borderColor: "white",
              borderWidth: "1px",
              boxShadow: "4px 4px 0px #000000",
            }}
            onClick={handleChangeCoverClick}
          >
            Change Cover
          </Button>
        </Box>
        <Stack spacing="8px">
          <Stack direction={{ base: "column", md: "row" }} mb="47px">
            <Heading fontSize="28px" fontWeight="500">
              {eventData?.data?.title}
            </Heading>
            <Spacer />
            <VStack alignItems="flex-start">
              <HStack>
                <CalendarIcon />
                <Text>{getDateString(eventData?.data?.start_time)}</Text>
                <TimeIcon />
                <Text>{getTimeString(eventData?.data?.start_time)}</Text>
              </HStack>
              <HStack>
                <GoLocation />
                {placeUrl ? (
                  <Link href={placeUrl} target="_blank">
                    <Text
                      _hover={{
                        px: "8px",
                        borderColor: "black",
                        borderWidth: "1px",
                        boxShadow: "4px 4px 0px black",
                        bg: "white",
                      }}
                      textDecoration="underline"
                    >
                      {eventData?.data?.location?.name}
                    </Text>
                  </Link>
                ) : (
                  <Text>{eventData?.data?.location?.name}</Text>
                )}
              </HStack>
            </VStack>
          </Stack>

          <Stack border="1px solid #667085">
            <Box p="24px">
              <Text fontSize="18px" fontWeight="500">
                Attendees
              </Text>
            </Box>
            <Divider />

            <Stack
              spacing={{ base: 4, md: 0 }}
              direction={{ base: "column", md: "row" }}
              justifyContent={justifyContent}
              p="24px"
            >
              <InputGroup hidden={false}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="black.border" />}
                />
                <Input
                  placeholder="Search for attendees"
                  borderColor="black.border"
                  borderRadius={0}
                  w={{ base: "100%", md: "400px" }}
                />
              </InputGroup>
              <Button
                onClick={handleDownload}
                rightIcon={<DownloadIcon />}
                py="14px"
                px="58px"
                ml="auto"
              >
                Download Attendees
              </Button>
            </Stack>

            <TableContainer hidden={false}>
              <Table variant="simple">
                <Thead bg="#F9FAFB">
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Wallet</Th>
                    <Th>Company</Th>
                    <Th>Job Title</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.isArray(eventAttendees) &&
                    eventAttendees.map((attendee) => (
                      <Tr key={attendee?.decrypted.user_address}>
                        <Td>{attendee?.decrypted.name}</Td>
                        <Td>{attendee?.decrypted.email}</Td>
                        <Td>{attendee?.decrypted.user_address}</Td>
                        <Td>{attendee?.decrypted.company}</Td>
                        <Td>{attendee?.decrypted.job_title}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  )
}
