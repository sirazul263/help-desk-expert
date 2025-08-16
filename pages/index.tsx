import React from "react";
import Experience from "@/components/Home/Experience";
import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import Work from "@/components/Home/Work";
import Contact from "@/components/Contact";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Help Desk Xpert</title>
      </Head>
      <Layout>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </Layout>
    </>
  );
}
