import {
  Box,
  Flex,
  IconButton,
  Stack,
  Link,
  useDisclosure,
  Container,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import "react-toastify/dist/ReactToastify.css"
import RainbowWallet from "./RainbowWallet"
import LogoSVG from "./Logo"
import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"

const Links = [{ name: "Events", url: "/show-events" }]

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      borderColor: "black",
      borderWidth: "1px",
      boxShadow: "4px 4px 0px #000000",
    }}
    href={to}
  >
    {children}
  </Link>
)

export default function NavbarTwo() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useContext(AppContext)

  useEffect(() => {
    const hasRSVP = Links.some((link) => link.name === "Timeline")
    if (user && !hasRSVP) {
      Links.push({ name: "Timeline", url: "/timeline" })
    }
  }, [user])

  return (
    <>
      <Box>
        <Container maxW={"8xl"} py="16px" px="14px">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Link href="/">
                  <Flex alignItems="center">
                    <LogoSVG />
                    <Text
                      ml="22px"
                      fontSize="24px"
                      fontWeight="500"
                      display={{ base: "none", md: "block" }}
                    >
                      DecentraEvent
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
                fontSize="24px"
                fontWeight="400"
              >
                {Links.map((link) => (
                  <NavLink key={link.name} to={link.url}>
                    {link.name}
                  </NavLink>
                ))}
              </HStack>
            </HStack>

            <RainbowWallet />
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4} fontSize="18px" fontWeight="400">
                {Links.map((link) => (
                  <NavLink key={link.name} to={link.url}>
                    {link.name}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
      <Divider borderColor="black" borderWidth="1px" />
    </>
  )
}
