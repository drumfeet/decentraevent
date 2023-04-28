import React, { createContext, useState, useEffect } from "react"
import { isNil, not, isEmpty, props, any, either, assoc } from "ramda"
import lf from "localforage"
import SDK from "weavedb-sdk"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { nanoid } from "nanoid"
import LitJsSdk from "@lit-protocol/sdk-browser"

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const COLLECTION_NAME = "events"
  const COLLECTION_RSVP = "rsvp"
  const COLLECTION_USER = "users"
  const contractTxId = "plxPveypGZ4g__TaFzQd8D70WtrGAOVIiWAa_wgUi0Y"
  const [db, setDb] = useState(null)
  const [initDB, setInitDB] = useState(false)
  const [user, setUser] = useState(null)
  const [eventData, setEventData] = useState({})
  const [events, setEvents] = useState([])
  const [userRsvp, setUserRsvp] = useState()
  const router = useRouter()
  const [dryWriteTx, setDryWriteTx] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [eventAttendees, setEventAttendees] = useState({})
  const [userProfile, setUserProfile] = useState(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const setupWeaveDB = async () => {
    try {
      const _db = new SDK({
        contractTxId: contractTxId,
      })
      await _db.initializeWithoutWallet()
      setDb(_db)
      setInitDB(true)
    } catch (e) {
      console.error("setupWeaveDB", e)
      toast(e.message)
    }
    console.log("<<setupWeaveDB()")
  }

  const checkUser = async () => {
    const wallet_address = await lf.getItem(`temp_address:current`)
    console.log("checkUser() wallet_address", wallet_address)
    if (!isNil(wallet_address)) {
      const identity = await lf.getItem(
        `temp_address:${contractTxId}:${wallet_address}`
      )
      if (!isNil(identity)) {
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        })
      }
    }
    console.log("<<checkUser()")
  }

  const handleLensLogin = async () => {
    console.log("handleLensLogin")

    try {
      const { identity, tx } = await db.createTempAddressWithLens()
      if (tx.success) {
        const uid = identity.linkedAccount
        let _user = {
          id: uid.split(":")[1] * 1,
          handle: identity.profile.handle,
          ...identity,
          image: !isNil(identity.profile.imageURI)
            ? `https://cloudflare-ipfs.com/ipfs/${last(
                identity.profile.imageURI.split("/")
              )}`
            : null,
        }
        console.log("handleLensLogin _user", _user)
      }
    } catch (e) {
      console.error("handleLensLogin", e)
      toast(e.message)
    }
  }

  const login = async (wallet_address) => {
    console.log(">>login()", wallet_address)

    try {
      let identity = await lf.getItem(
        `temp_address:${contractTxId}:${wallet_address}`
      )
      let tx
      let err
      if (isNil(identity)) {
        ;({ tx, identity, err } = await db.createTempAddress(wallet_address))
        const linked = await db.getAddressLink(identity.address)
        if (isNil(linked)) {
          alert("something went wrong")
          return
        }
      } else {
        await lf.setItem("temp_address:current", wallet_address)
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        })
        return
      }
      if (!isNil(tx) && isNil(tx.err)) {
        identity.tx = tx
        identity.linked_address = wallet_address
        await lf.setItem("temp_address:current", wallet_address)
        await lf.setItem(
          `temp_address:${contractTxId}:${wallet_address}`,
          JSON.parse(JSON.stringify(identity))
        )
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        })
      }
    } catch (e) {
      console.error("login", e)
      toast(e.message)
    }
  }

  const logout = async () => {
    await lf.removeItem("temp_address:current")
    setUser(null, "temp_current")
    console.log("<<logout()")
  }

  const createEvent = async () => {
    await router.push("/create-event")
    console.log("<<createEvent()")
  }

  function isUnixTimestamp(str) {
    const timestamp = Number(str)
    return !isNaN(timestamp) && timestamp >= 0
  }

  const addEvent = async () => {
    const MILLISECONDS = 1000
    setIsLoading(true)

    try {
      const userAddress = user.wallet.toLowerCase()
      const eventId = nanoid()
      const docId = `${userAddress}:${eventId}`
      console.log("addEvent() docId", docId)

      eventData.start_time = Date.parse(eventData?.start_time) / MILLISECONDS
      eventData.end_time = Date.parse(eventData?.end_time) / MILLISECONDS
      eventData.date = db.ts()
      eventData.user_address = db.signer()
      eventData.event_id = eventId
      console.log("eventData", eventData)

      let tx = await db.set(eventData, COLLECTION_NAME, docId, user)
      console.log("addEvent() tx", tx)
      setDryWriteTx(tx)
      setEventData({})
      await router.push("/show-events")
    } catch (e) {
      toast(e.message)
      console.error("addEvent", e)
    } finally {
      setIsLoading(false)
    }

    console.log("<<addEvent()")
  }

  const updateEvent = async (docId) => {
    const MILLISECONDS = 1000
    setIsLoading(true)

    try {
      const startTimeIsNum = isUnixTimestamp(eventData.start_time)
      const endTimeIsNum = isUnixTimestamp(eventData.end_time)

      if (!startTimeIsNum) {
        eventData.start_time = Date.parse(eventData?.start_time) / MILLISECONDS
      }
      if (!endTimeIsNum) {
        eventData.end_time = Date.parse(eventData?.end_time) / MILLISECONDS
      }

      eventData.date = db.ts()
      eventData.user_address = db.signer()

      let tx = await db.update(eventData, COLLECTION_NAME, docId, user)
      console.log("updateEvent() tx", tx)
      setDryWriteTx(tx)
      setEventData({})
      await router.push("/show-events")
    } catch (e) {
      toast(e.message)
      console.error("updateEvent", e)
    } finally {
      setIsLoading(false)
    }

    console.log("<<updateEvent()")
  }

  const deleteEvent = async (docId) => {
    console.log("deleteEvent docId", docId)
    setIsLoading(true)
    try {
      const tx = await db.delete(COLLECTION_NAME, docId, user)
      console.log("deleteEvent() tx", tx)
      setDryWriteTx(tx)
    } catch (e) {
      toast(e.message)
      console.error("deleteEvent", e)
    } finally {
      setIsLoading(false)
    }
  }

  const getEvents = async () => {
    try {
      getUserRsvpForEvents()

      const _events = await db.cget(COLLECTION_NAME, ["date", "desc"], true)
      console.log("getEvents", _events)
      setEvents(_events)
    } catch (e) {
      toast(e.message)
      console.error(e)
    }
  }

  const getMyEvents = async () => {
    try {
      getUserRsvpForEvents()

      const _events = await db.cget(
        COLLECTION_NAME,
        ["user_address", "==", user.wallet.toLowerCase()],
        ["date", "desc"],
        true
      )
      console.log("getMyEvents", _events)
      setEvents(_events)
    } catch (e) {
      toast(e.message)
      console.error(e)
    }
  }

  const getEventAttendees = async (metadata) => {
    setIsLoading(true)
    try {
      console.log("getEventAttendees metadata", metadata)
      const _eventId = metadata?.data.event_id

      const _eventAttendees = await db.cget(
        COLLECTION_RSVP,
        ["event_id", "==", _eventId],
        ["date", "desc"],
        true
      )
      console.log("getEventAttendees _eventAttendees", _eventAttendees)

      const lit = new LitJsSdk.LitNodeClient()
      await lit.connect()

      let _attendees = []
      for (const attendee of _eventAttendees) {
        console.log("attendee", attendee)
        if (!isNil(attendee?.data.lit)) {
          const {
            encryptedData,
            encryptedSymmetricKey,
            accessControlConditions,
          } = attendee?.data.lit

          const authSig = await LitJsSdk.checkAndSignAuthMessage({
            chain: "polygon",
          })

          const symmetricKey = await lit.getEncryptionKey({
            accessControlConditions,
            toDecrypt: encryptedSymmetricKey,
            chain: "polygon",
            authSig,
          })

          const dataURItoBlob = (dataURI) => {
            var byteString = window.atob(dataURI.split(",")[1])
            var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
            var ab = new ArrayBuffer(byteString.length)
            var ia = new Uint8Array(ab)
            for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i)
            }

            var blob = new Blob([ab], { type: mimeString })

            return blob
          }

          const decryptedString = await LitJsSdk.decryptString(
            dataURItoBlob(encryptedData),
            symmetricKey
          )
          console.log("getEventAttendees decryptedString", decryptedString)
          const jsonData = JSON.parse(decryptedString)
          _attendees.push(assoc("decrypted", jsonData, attendee))
          console.log("_attendees", _attendees)
        }
      }
      setEventAttendees(_attendees)
    } catch (e) {
      toast(e.message)
      console.error("getEventAttendees", e)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserRsvpForEvents = async () => {
    try {
      const _userRsvp = await db.cget(
        COLLECTION_RSVP,
        ["date", "desc"],
        ["user_address", "==", user?.wallet.toLowerCase()],
        true
      )
      console.log("getUserRsvpForEvents", _userRsvp)
      setUserRsvp(_userRsvp)
    } catch (e) {
      toast(e.message)
      console.error(e)
    }
  }

  const setRsvpStatus = async (metadata, isUserGoing) => {
    console.log("setRsvpStatus() (events collection) metadata", metadata)
    console.log("setRsvpStatus() (current value) isUserGoing", isUserGoing)
    setIsLoading(true)
    try {
      const userAddress = user.wallet.toLowerCase()
      const docId = `${userAddress}-${metadata.data.event_id}`
      console.log("setRsvpStatus() docId", docId)

      const eventOwnerAddress = metadata.data.user_address
      console.log("setRsvpStatus() eventOwnerAddress", eventOwnerAddress)

      const userProfile = await getUserProfile()
      console.log("setRsvpStatus() userProfile", userProfile)

      const propNameEmail = props(["name", "email"], userProfile)
      console.log("propNameEmail", propNameEmail)
      const isNameEmailNullOrEmpty = any(either(isNil, isEmpty))(propNameEmail)
      console.log("isNameEmailNullOrEmpty", isNameEmailNullOrEmpty)
      const isUserProfileNull = isNil(userProfile)
      console.log("isUserProfileNull", isUserProfileNull)
      if (isUserProfileNull || isNameEmailNullOrEmpty) {
        toast("Update your profile (name/email)")
        return
      }
      const { name, email, company, job_title } = userProfile

      let rsvpStatus = {
        isGoing: not(isUserGoing),
        name: name,
        email: email,
        company: company,
        job_title: job_title,
        user_address: user?.wallet.toLowerCase(),
      }
      const jsonStr = JSON.stringify(rsvpStatus)

      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "polygon",
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: eventOwnerAddress,
          },
        },
      ]

      const lit = new LitJsSdk.LitNodeClient()
      await lit.connect()

      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "polygon",
      })

      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        jsonStr
      )

      const encryptedSymmetricKey = await lit.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain: "polygon",
      })

      const blobToDataURI = (blob) => {
        return new Promise((resolve, reject) => {
          var reader = new FileReader()

          reader.onload = (e) => {
            var data = e.target.result
            resolve(data)
          }
          reader.readAsDataURL(blob)
        })
      }
      const encryptedData = await blobToDataURI(encryptedString)

      let rsvp_data = {
        event_doc_id: metadata.id,
        event_id: metadata.data.event_id,
        event_title: metadata.data.title,
        user_address: db.signer(),
        date: db.ts(),
        is_going: not(isUserGoing),
        lit: {
          encryptedData: encryptedData,
          encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
            encryptedSymmetricKey,
            "base16"
          ),
          accessControlConditions: accessControlConditions,
        },
      }
      console.log("rsvp_data", rsvp_data)

      let tx = await db.upsert(rsvp_data, COLLECTION_RSVP, docId, user)
      console.log("setRsvpStatus() tx", tx)
      setDryWriteTx(tx)
    } catch (e) {
      toast(e.message)
      console.error("setRsvpStatus", e)
    } finally {
      setIsLoading(false)
    }
  }

  const saveToList = async (metadata, isUserLiked) => {
    console.log("saveToList() metadata", metadata)
    console.log("saveToList() isUserLiked", isUserLiked)
    setIsLoading(true)
    try {
      const userAddress = user.wallet.toLowerCase()
      const docId = `${userAddress}-${metadata.data.event_id}`
      console.log("saveToList() docId", docId)

      let rsvp_data = {
        event_doc_id: metadata.id,
        event_id: metadata.data.event_id,
        event_title: metadata.data.title,
        user_address: db.signer(),
        date: db.ts(),
        is_liked: not(isUserLiked),
      }
      console.log("rsvp_data", rsvp_data)

      let tx = await db.upsert(rsvp_data, COLLECTION_RSVP, docId, user)
      console.log("saveToList() tx", tx)
      setDryWriteTx(tx)
    } catch (e) {
      toast(e.message)
      console.error("saveToList", e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = async (userProfileData) => {
    setIsLoading(true)
    try {
      const userAddress = user.wallet.toLowerCase()
      console.log("handleProfileUpdate userAddress", userAddress)
      console.log("userAddress userProfileData", userProfileData)

      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "polygon",
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: userAddress,
          },
        },
      ]

      const lit = new LitJsSdk.LitNodeClient()
      await lit.connect()

      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "polygon",
      })

      const jsonStr = JSON.stringify(userProfileData)

      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        jsonStr
      )

      const encryptedSymmetricKey = await lit.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain: "polygon",
      })

      const blobToDataURI = (blob) => {
        return new Promise((resolve, reject) => {
          var reader = new FileReader()

          reader.onload = (e) => {
            var data = e.target.result
            resolve(data)
          }
          reader.readAsDataURL(blob)
        })
      }
      const encryptedData = await blobToDataURI(encryptedString)

      let userData = {
        user_address: db.signer(),
        date: db.ts(),
        lit: {
          encryptedData: encryptedData,
          encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
            encryptedSymmetricKey,
            "base16"
          ),
          accessControlConditions: accessControlConditions,
        },
      }

      let tx = await db.upsert(userData, COLLECTION_USER, userAddress, user)
      console.log("handleProfileUpdate tx", tx)
      setDryWriteTx(tx)
    } catch (e) {
      toast(e.message)
      console.error("handleProfileUpdate", e)
    } finally {
      setIsLoading(false)
    }

    console.log("handleProfileUpdate")
  }

  const getUserProfile = async () => {
    setIsLoading(true)
    let jsonData = null
    try {
      const userProfileData = await db.get(
        COLLECTION_USER,
        user.wallet.toLowerCase()
      )
      console.log("getUserProfile userProfileData", userProfileData)

      if (!isNil(userProfileData) && !isNil(userProfileData.lit)) {
        const lit = new LitJsSdk.LitNodeClient()
        await lit.connect()

        const {
          encryptedData,
          encryptedSymmetricKey,
          accessControlConditions,
        } = userProfileData.lit

        const authSig = await LitJsSdk.checkAndSignAuthMessage({
          chain: "polygon",
        })

        const symmetricKey = await lit.getEncryptionKey({
          accessControlConditions,
          toDecrypt: encryptedSymmetricKey,
          chain: "polygon",
          authSig,
        })

        const dataURItoBlob = (dataURI) => {
          var byteString = window.atob(dataURI.split(",")[1])
          var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
          var ab = new ArrayBuffer(byteString.length)
          var ia = new Uint8Array(ab)
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          var blob = new Blob([ab], { type: mimeString })

          return blob
        }

        const decryptedString = await LitJsSdk.decryptString(
          dataURItoBlob(encryptedData),
          symmetricKey
        )
        console.log("getUserProfile decryptedString", decryptedString)

        if (!isNil(decryptedString)) {
          jsonData = JSON.parse(decryptedString)
          console.log("getUserProfile jsonData", jsonData)
        }
      }
    } catch (e) {
      toast(e.message)
      console.error("getUserProfile", e)
    } finally {
      setIsLoading(false)
      return jsonData
    }
  }

  useEffect(() => {
    checkUser()
    setupWeaveDB()
  }, [])

  useEffect(() => {
    if (initDB) {
      getEvents()
    }
  }, [initDB, user])

  useEffect(() => {
    ;(async () => {
      try {
        if (initDB) {
          const _txResult = await dryWriteTx.getResult()
          console.log("useEffect _txResult", _txResult)
          await getEvents()
        }
      } catch (e) {
        toast(e.message)
        console.error("useEffect dryWriteTx catch()", e)
      }
      setIsLoading(false)
    })()
  }, [dryWriteTx])

  return (
    <AppContext.Provider
      value={{
        contractTxId,
        db,
        setDb,
        initDB,
        setInitDB,
        user,
        setUser,
        createEvent,
        addEvent,
        updateEvent,
        deleteEvent,
        eventData,
        setEventData,
        events,
        setEvents,
        getEvents,
        getMyEvents,
        login,
        logout,
        setRsvpStatus,
        saveToList,
        userRsvp,
        setUserRsvp,
        isLoading,
        setIsLoading,
        handleLensLogin,
        handleProfileUpdate,
        getUserProfile,
        eventAttendees,
        setEventAttendees,
        getEventAttendees,
        userProfile,
        setUserProfile,
        contractTxId,
        isLoginModalOpen,
        setIsLoginModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
