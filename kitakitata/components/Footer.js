import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import { useContext } from "react"
import { FaLink, FaGithub } from "react-icons/fa"
import { AppContext } from "@/context/AppContext"

const Logo = (props) => {
  return (
    <>
      <Link href="https://weavedb.dev" isExternal>
        <Text fontSize="sm">Built with WeaveDB ♥️</Text>
      </Link>
    </>
  )
}

const SocialButton = ({ children, label, href }) => {
  const buttonProps = {
    bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
    rounded: "full",
    w: 8,
    h: 8,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease",
    _hover: {
      bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    },
  }

  return (
    <chakra.button
      as={"a"}
      href={href}
      target={"_blank"}
      rel={"noopener noreferrer"}
      {...buttonProps}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  const { contractTxId } = useContext(AppContext)

  return (
    <Box marginTop={28} bg="brand.deepPurple" color="whiteAlpha.900">
      <Container
        as={Stack}
        maxW={"6xl"}
        py="48px"
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>Kitakitata</Text>
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
  )
}
