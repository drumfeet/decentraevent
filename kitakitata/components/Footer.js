import {
  Box,
  Button,
  Container,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { toast } from "react-toastify"

export default function Footer() {
  const { contractTxId } = useContext(AppContext)

  return (
    <>
      <Stack position="relative">
        <Box mt={28} bg="brand.deepPurple">
          <Container height="200px" />
        </Box>

        <Box position="relative" top="-100px">
          <Container
            bg="white"
            borderRadius="16px"
            boxShadow="xl"
            p="64px"
            display="flex"
            as={Stack}
            maxW={"6xl"}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <Box flex="1">
              <Text fontSize="4xl" fontWeight="bold">
                Join our newsletter
              </Text>
              <Text fontSize="lg">Signup for the very exciting meetups.</Text>
            </Box>
            <Box flex="1">
              <Stack direction={{ base: "column", md: "row" }} spacing={"12px"}>
                <Input
                  w="100%"
                  variant={"solid"}
                  borderWidth={1}
                  id={"email"}
                  type={"email"}
                  required
                  placeholder={"Your Email"}
                  aria-label={"Your Email"}
                />
                <Button
                  py="12px"
                  px="20px"
                  onClick={() => toast("Feature coming soon!")}
                >
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Stack>

      <Box
        bg="brand.deepPurple"
        color="whiteAlpha.900"
        id="footerMain"
        position="relative"
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py="48px"
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontWeight="bold">Kitakitata</Text>
          <Stack direction={"row"} spacing={6}>
            <Text>
              Powered by{" "}
              <Link
                href="https://weavedb.dev"
                isExternal
                textDecoration="underline"
              >
                WeaveDB
              </Link>
            </Text>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
