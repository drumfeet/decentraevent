import Head from "next/head"
import Banner from "@/components/Banner"
import Feature from "@/components/Feature"
import Footer from "@/components/Footer"
import NavbarOne from "@/components/NavbarOne"

export default function Home() {
  return (
    <>
      <NavbarOne />
      <Head>
        <title>Kitakitata</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Feature />
      <Footer />
    </>
  )
}
