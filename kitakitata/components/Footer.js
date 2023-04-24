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
    <Box
      marginTop={28}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© 2023 Kitakitata. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label="Github"
            href={"https://github.com/drumfeet/kitakitata"}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton
            label="Transactions"
            href={`https://sonar.warp.cc/?#/app/contract/${contractTxId}`}
          >
            <FaLink />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
