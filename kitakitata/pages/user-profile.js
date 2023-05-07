import Layout from "@/components/Layout"
import { AppContext } from "@/context/AppContext"
import { isEmpty, isNil } from "ramda"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Container,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react"
import GoBack from "@/components/GoBack"
import { GoCloudUpload } from "react-icons/go"

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
        <Container maxW={"8xl"}>
          <Box justifyContent="flex-start" my="28px">
            <GoBack />
          </Box>

          <Box
            mx="auto"
            w={"full"}
            maxW={"462px"}
            borderColor="black"
            borderWidth="1px"
            boxShadow="8px 8px 0px"
          >
            <Heading
              fontSize="24px"
              fontWeight="500"
              color="black.text"
              p="32px"
              textAlign="center"
            >
              Create Event
            </Heading>
            <Divider borderColor="black" />

            <Stack spacing="24px" p="32px">
              <FormControl id="name" isRequired>
                <Input
                  value={userProfileData.name}
                  placeholder="Name"
                  type="text"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <Input
                  value={userProfileData.email}
                  placeholder="your-email@example.com"
                  type="email"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="company">
                <Input
                  value={userProfileData.company}
                  placeholder="Company"
                  type="text"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="job_title">
                <Input
                  value={userProfileData.job_title}
                  placeholder="Job Title"
                  type="text"
                  onChange={handleInputChange}
                />
              </FormControl>

              <Box borderWidth="1px" p="8px">
                <Stack align="center" justify="center" textAlign="center">
                  <GoCloudUpload size="28px" />
                  <Text fontSize="16px" fontWeight="500">
                    This feature is not yet available
                  </Text>
                  <Text fontSize="14px">Upload profile picture</Text>
                  <Text fontSize="12px">Click to upload or drag and drop</Text>
                  <Text fontSize="10px">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </Stack>
              </Box>

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
          </Box>
        </Container>
      </Layout>
    </>
  )
}
