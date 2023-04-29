import Layout from "@/components/Layout"
import { AppContext } from "@/context/AppContext"
import { isNil } from "ramda"
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
  const { handleProfileUpdate } = useContext(AppContext)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [company, setCompany] = useState()
  const [jobTitle, setJobTitle] = useState()
  const { user, initDB, getUserProfile, isLoading, setIsLoginModalOpen } =
    useContext(AppContext)

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleCompanyChange = (e) => setCompany(e.target.value)
  const handleJobTitleChange = (e) => setJobTitle(e.target.value)

  const validateInputs = () => {
    if (isNil(name) || isNil(email)) {
      toast("Name & Email are required")
      return false
    }

    return true
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (initDB && user) {
          const { name, email, company, job_title } = await getUserProfile()
          setName(name)
          setEmail(email)
          setCompany(company)
          setJobTitle(job_title)
        }
      } catch (e) {}
    })()
  }, [user])

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
            <FormControl id="name">
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
                defaultValue={name}
                placeholder="Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                defaultValue={email}
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl id="company">
              <FormLabel>Company</FormLabel>
              <Input
                defaultValue={company}
                placeholder="Company"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleCompanyChange}
              />
            </FormControl>
            <FormControl id="jobTitle">
              <FormLabel>Job Title</FormLabel>
              <Input
                defaultValue={jobTitle}
                placeholder="Job Title"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleJobTitleChange}
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
                  const isValid = validateInputs()
                  if (isValid) {
                    if (isNil(user)) {
                      setIsLoginModalOpen(true)
                    } else {
                      let userProfileData = {
                        name: name,
                        email: email,
                        job_title: jobTitle,
                        company: company,
                      }
                      handleProfileUpdate(userProfileData)
                    }
                  }
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
