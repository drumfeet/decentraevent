import Head from "next/head"
import CallToActionWithIllustration from "@/components/Hero"
import Popular from "@/components/Popular"
import Layout from "@/components/Layout"
import Banner from "@/components/Banner"
import CardSmall from "@/components/CardSmall"

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>Kitakitata</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Banner />
        <CardSmall />
      </Layout>
    </>
  )
}
