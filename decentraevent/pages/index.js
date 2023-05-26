import Banner from "@/components/Banner"
import Feature from "@/components/Feature"
import Footer from "@/components/Footer"
import NavbarOne from "@/components/NavbarOne"
import ConfirmationAlert from "@/components/ConfirmationAlert"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Head from "next/head"

export default function Home() {
  const { user, initDB, hasUserProfile } = useContext(AppContext)
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  const navigateUserProfilePage = async () => {
    await router.push("/user-profile")
  }

  const handleConfirmationAlert = () => {
    navigateUserProfilePage()
    setShowAlert(false)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  useEffect(() => {
    ;(async () => {
      if (user && initDB) {
        const _hasUserProfile = await hasUserProfile()
        console.log("_hasUserProfile", _hasUserProfile)
        if (!_hasUserProfile) {
          setShowAlert(true)
        }
      }
    })()
  }, [user, initDB])

  return (
    <>
      <Head>
        <title>DecentraEvent</title>
        <link rel="icon" href="/icon_tab.svg" />
      </Head>
      {showAlert && (
        <ConfirmationAlert
          isOpen={showAlert}
          onClose={handleCloseAlert}
          onConfirmation={handleConfirmationAlert}
          title="Update Profile"
          message="Complete your profile to unlock all features and personalize your experience."
          confirmButtonText="Update"
          cancelButtonText="Cancel"
        />
      )}

      <NavbarOne />
      <Banner />
      <Feature />
      <Footer />
    </>
  )
}
