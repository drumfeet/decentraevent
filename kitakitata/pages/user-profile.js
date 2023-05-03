import Layout from "@/components/Layout"
import { AppContext } from "@/context/AppContext"
import { isEmpty, isNil } from "ramda"
import { useContext, useEffect, useState } from "react"

import { toast } from "react-toastify"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react"
import { SmallCloseIcon } from "@chakra-ui/icons"

export default function Profile() {
  const { setUserProfile } = useContext(AppContext)
  const { user, initDB, getUserProfile, isLoading, setIsLoginModalOpen } =
    useContext(AppContext)
  const [userProfileData, setUserProfileData] = useState({
    name: "",
    email: "",
    company: "",
    job_title: "",
  })

  const validateInputs = () => {
    if (
      isNil(userProfileData.name) ||
      isNil(userProfileData.email) ||
      isEmpty(userProfileData.name) ||
      isEmpty(userProfileData.email)
    ) {
      toast("Name & Email are required")
      return false
    }

    return true
  }

  const handleSubmitClick = async () => {
    const isValid = validateInputs()
    if (isValid) {
      if (isNil(user)) {
        setIsLoginModalOpen(true)
      } else {
        setUserProfile(userProfileData)
      }
    }
  }

  const handleInputChange = (e) => {
    setUserProfileData({
      ...userProfileData,
      [e.target.id]: e.target.value || "",
    })
  }

  useEffect(() => {
    ;(async () => {
      if (initDB && user) {
        const _userProfileData = await getUserProfile()
        setUserProfileData({
          ...userProfileData,
          name: _userProfileData?.name || "",
          email: _userProfileData?.email || "",
          company: _userProfileData?.company || "",
          job_title: _userProfileData?.job_title || "",
        })
        console.log("setUserProfileData() _userProfileData", _userProfileData)
      }
    })()
  }, [user, initDB])

  return (
    <>
      <Layout>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile
            </Heading>
            <FormControl id="photo">
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src="">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Photo"
                      onClick={() => {
                        toast("Feature coming soon!")
                      }}
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button
                    w="full"
                    onClick={() => {
                      toast("Feature coming soon!")
                    }}
                  >
                    Change Photo
                  </Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={userProfileData.name}
                placeholder="Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={userProfileData.email}
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="company">
              <FormLabel>Company</FormLabel>
              <Input
                value={userProfileData.company}
                placeholder="Company"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="job_title">
              <FormLabel>Job Title</FormLabel>
              <Input
                value={userProfileData.job_title}
                placeholder="Job Title"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleInputChange}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                isLoading={isLoading}
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  handleSubmitClick()
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Layout>
    </>
  )
}
