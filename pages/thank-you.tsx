import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import Faq from "@/components/Home/Faq";
import ThankYouMain from "@/components/ThankYou/ThankYouMain";
import CompareTable from "@/components/Pricing/CompareTable";

const ThankYouPage = () => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Thank You</title>
      </Head>
      <Layout>
        <ThankYouMain />
        <CompareTable />
        <Faq />
      </Layout>
    </>
  );
};
export default ThankYouPage;
