import ButtonWithUnderLine from "@/components/Common/ButtonWithUnderLine";
import CommonButton from "@/components/Common/CommonButton";
import GetStartedMain from "@/components/GetStarted/GetStartedMain";
import CalendarMain from "@/components/Schedule/CalendarMain";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdCheckmarkCircle, IoMdTime } from "react-icons/io";

const CalendarPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Schedule</title>
      </Head>
      <main>
        <div className="py-5 md:py-10">
          <div className="text-center">
            <div className="relative mb-5">
              <button
                className="btn text-primary font-bold text-3xl"
                onClick={() => router.push("/")}
              >
                HelpDeskXpert
              </button>
            </div>
            <h1 className="text-xl md:text-4xl font-extrabold">
              Schedule A Call To Chat With an Expert Today!
            </h1>
          </div>
          <div className="container my-10">
            <CalendarMain />
          </div>
        </div>
      </main>
    </>
  );
};
export default CalendarPage;
