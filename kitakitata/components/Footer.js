import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { toast } from "react-toastify"
import { LinkIcon } from "@chakra-ui/icons"
import { FaGithub, FaTwitter } from "react-icons/fa"

export default function Footer() {
  const { contractTxId } = useContext(AppContext)

  return (
    <>
      <Box bg="yellow.footer">
        <Container
          as={Stack}
          maxW={"6xl"}
          py="48px"
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Box>
            <Text fontSize="24px" fontWeight="bold">
              Kitakitata
            </Text>
            <Text color="black.footer" fontSize="16px">
              © 2023 All rights reserved.
            </Text>
          </Box>

          <Text color="black.footer" fontSize="16px">
            Powered by{" "}
            <Link
              href="https://weavedb.dev"
              isExternal
              textDecoration="underline"
            >
              WeaveDB
            </Link>
          </Text>
          <Stack direction={"row"} spacing={6}>
            <FaTwitter />
            <FaGithub />
            <LinkIcon />
          </Stack>
        </Container>
      </Box>
    </>
  )
}
