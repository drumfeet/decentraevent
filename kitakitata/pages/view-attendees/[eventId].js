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

  const handleDownload = () => {
    const csvData = eventAttendees
      .map(
        (attendee) =>
          `${attendee?.decrypted.name},${attendee?.decrypted.email},${attendee?.decrypted.user_address},${attendee?.decrypted.isGoing}`
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
    ;(async () => {
      try {
        if (initDB) {
          const _eventData = await getEventWithEventId(eventId)
          console.log("view-attendees eventId", eventId)
          setEventData(_eventData.shift())
          console.log("view-attendees _eventData", _eventData)

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
          >
            Change Cover
          </Button>
        </Box>

        <Stack spacing="8px">
          <HStack>
            <Heading fontSize="28px" fontWeight="500">
              {eventData?.data?.title}
            </Heading>
            <HStack flex="1" ml="auto" justifyContent="flex-end">
              <CalendarIcon />
              <Text>{getDateString(eventData?.data?.start_time)}</Text>
              <TimeIcon />
              <Text>{getTimeString(eventData?.data?.start_time)}</Text>
            </HStack>
          </HStack>
          <HStack justifyContent="flex-end">
            <GoLocation />
            <Text>{eventData?.data?.location}</Text>
          </HStack>

          <Stack>
            <Box p="24px">
              <Text fontSize="18px" fontWeight="500">
                Attendees
              </Text>
            </Box>
            <Divider />

            <Stack
              spacing={{ base: 4, md: 0 }}
              direction={{ base: "column", md: "row" }}
            >
              <InputGroup hidden={true}>
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
              <Spacer />
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
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.isArray(eventAttendees) &&
                    eventAttendees.map((attendee) => (
                      <Tr key={attendee?.decrypted.user_address}>
                        <Td>{attendee?.decrypted.name}</Td>
                        <Td>{attendee?.decrypted.email}</Td>
                        <Td>{attendee?.decrypted.user_address}</Td>
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
