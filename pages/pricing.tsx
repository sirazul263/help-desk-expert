import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import PricingTab from "@/components/Pricing/PricingTab";
import CompareTable from "@/components/Pricing/CompareTable";
import Faq from "@/components/Home/Faq";

const PricingPage = () => {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Pricing</title>
      </Head>
      <Layout>
        <PricingTab />
        <CompareTable />
        <Faq />
      </Layout>
    </>
  );
};
export default PricingPage;
