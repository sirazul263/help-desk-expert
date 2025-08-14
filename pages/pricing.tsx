import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import PricingTab from "@/components/Pricing/PricingTab";

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
      </Layout>
    </>
  );
};
export default PricingPage;
