import Head from "next/head"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>DecentraEvent</title>
        <link rel="icon" href="/icon_tab.svg" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
