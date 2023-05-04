import {
  Box,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
} from "@chakra-ui/react"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { LinkIcon } from "@chakra-ui/icons"
import { FaGithub, FaTwitter } from "react-icons/fa"

const SocialButton = ({ children, label, href }) => {
  const buttonProps = {
    cursor: "pointer",
    display: "inline-flex",
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
          <Flex direction={{ base: "column", md: "row" }} alignItems="center">
            <Text fontSize="24px" fontWeight="bold" mr="8px">
              Kitakitata
            </Text>
            <Text color="black.footer" fontSize="16px">
              © 2023 All rights reserved.
            </Text>
          </Flex>

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
          <Stack direction={"row"} spacing="28px">
            <SocialButton href="#">
              <FaTwitter />
            </SocialButton>
            <SocialButton href={`https://github.com/drumfeet/kitakitata`}>
              <FaGithub />
            </SocialButton>
            <SocialButton
              href={`https://sonar.warp.cc/?#/app/contract/${contractTxId}`}
            >
              <LinkIcon />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
