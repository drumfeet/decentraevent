import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ReactElement } from "react"
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc"

const Card = ({ heading, description, location, startTime, icon, href }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"xs"}>
            {location}
          </Text>
          <Text mt={1} fontSize={"xs"}>
            {startTime}
          </Text>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default function Popular() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Popular Events
        </Heading>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Building the Future of Web3"}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              "Unleash the power of Web3! Learn to build from scratch in this hands-on workshop."
            }
            location={"Online Zoom Call"}
            startTime={"Sat, Apr 15, 1:00 PM"}
            href={"#"}
          />
          <Card
            heading={"Marvelously Made: Women's Day 2023"}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              "Get ready for a life-changing experience as we celebrate the annual Women's Day."
            }
            location={"Tokyo, Japan"}
            startTime={"Sat, Apr 18, 4:00 PM"}
            href={"#"}
          />
          <Card
            heading={"Music Fest"}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              "A lifestyle festival for GEN Z music, dance and web3 enthusiasts that showcases up-and-coming talents."
            }
            location={"Dubai, UAE"}
            startTime={"Sat, Apr 20, 5:00 PM"}
            href={"#"}
          />
          <Card
            heading={"Cebu Blockchain Group"}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              "This is a community meetup of blockchain developers, technical analysts & enthusiasts in Cebu City."
            }
            location={"Cebu, Philippines"}
            startTime={"Sat, Apr 14, 6:00 PM"}
            href={"#"}
          />
          <Card
            heading={"Yoga for Mental Health & Stress"}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              "This hour-long class opens with a lesson on stress, leading in to a yoga flow aimed at relaxation and resilience."
            }
            location={"Online Google Meet"}
            startTime={"Sat, May 5 14, 2:00 AM"}
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  )
}
