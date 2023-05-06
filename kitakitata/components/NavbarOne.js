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
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import "react-toastify/dist/ReactToastify.css"
import RainbowWallet from "./RainbowWallet"

const Links = ["Events"]

const NavLink = ({ children }) => (
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
    href={"#"}
  >
    {children}
  </Link>
)

export default function NavbarOne() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bgGradient="linear-gradient(100deg, rgba(226,218,253,1) 0%, rgba(237,205,227,1) 99%)">
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
                  <Text fontSize="24px" fontWeight="500">
                    Kitakitata
                  </Text>
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
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>

            <RainbowWallet />
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  )
}
