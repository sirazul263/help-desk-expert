import CommonButton from "@/components/Common/CommonButton";
import GetStartedMain from "@/components/GetStarted/GetStartedMain";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { IoMdCheckmarkCircle, IoMdTime } from "react-icons/io";

const GetStartedPage = () => {
  const [step, setStep] = useState<number>(0);
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Get Started</title>
      </Head>
      <main>
        <div className="grid md:grid-cols-[7fr_5fr]">
          <div className="mx-5 xl:mx-40">
            {step > 0 ? (
              <div className="h-full ">
                <GetStartedMain step={step} setStep={setStep} />
              </div>
            ) : (
              <div className="flex flex-col justify-center h-full ">
                <div className="flex items-center bg-[#6aff751a] w-[200px] text-center font-semibold p-4 rounded-xl  text-gray-900">
                  <IoMdTime size={30} />{" "}
                  <p className="text-xl font-extrabold ml-3">1 Minute</p>
                </div>
                <h1 className="mt-10 text-gray-900 font-extrabold text-5xl">
                  Let’s <span className="text-primary">Learn More</span>
                </h1>
                <h1 className="mb-10 mt-1 text-gray-900 font-extrabold text-5xl">
                  About Your Business
                </h1>
                <p className="text-xl">
                  In order to match you with the perfect customer service agent
                  or expert marketing assistant, we need to gather some
                  information about you and your business.
                </p>
                <div className="mt-10">
                  <CommonButton title={"Next"} onClick={() => setStep(1)} />
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#1d4354]">
            {step == 5 ? (
              <div className=" text-white p-5 xl:px-30 xl:py-15">
                <div className="flex justify-center items-center mb-10">
                  <Link
                    href="/"
                    className="logo-holder-started desktop w-inline-block"
                  >
                    <img
                      loading="lazy"
                      src="/img/help-desk-xpert.png"
                      alt=""
                      className="h-16"
                    />
                  </Link>
                </div>
                <div className="bg-[#ffffff0d] rounded-xl p-5">
                  <h3 className="text-xl font-bold">
                    Need Help Handling Marketing For Your Business?
                  </h3>
                  <p className="mt-4 text-sm">
                    Our Growth assistants have extensive marketing experience,
                    specializing in various fields such as graphic design, video
                    editing, email marketing, SEO, data analysis, E-Commerce
                    management, Website management, and more!
                  </p>
                  <div className="border-b my-4" />
                  <h3 className="text-lg font-bold">You will get: </h3>
                  <ul className="my-3">
                    <li className="flex items-center mb-3">
                      <IoMdCheckmarkCircle
                        size={20}
                        className="me-2 text-green-300"
                      />{" "}
                      100% Dedicated Growth Assistant
                    </li>
                    <li className="flex items-center mb-3">
                      <IoMdCheckmarkCircle
                        size={20}
                        className="me-2 text-green-300"
                      />{" "}
                      Customer Success Manager
                    </li>
                    <li className="flex items-center mb-3">
                      <IoMdCheckmarkCircle
                        size={20}
                        className="me-2 text-green-300"
                      />{" "}
                      Weekly Team Reporting
                    </li>
                    <li className="flex items-center mb-3">
                      <IoMdCheckmarkCircle
                        size={20}
                        className="me-2 text-green-300"
                      />{" "}
                      Brand Standard Operating Procedures
                    </li>
                    <li className="flex items-center mb-3">
                      <IoMdCheckmarkCircle
                        size={20}
                        className="me-2 text-green-300"
                      />{" "}
                      Open & Easy Communication via Slack
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className=" p-10">
                <div className="flex justify-center items-center">
                  <Link
                    href="/"
                    className="logo-holder-started desktop w-inline-block"
                  >
                    <img
                      loading="lazy"
                      src="/img/help-desk-xpert.png"
                      alt=""
                      className="h-16"
                    />
                  </Link>
                </div>
                <div className="text-center text-xl font-bold text-white mt-10">
                  Trusted by
                </div>
                <div className="flex justify-center">
                  <img
                    sizes="(max-width: 800px) 100vw, 800px"
                    srcSet="https://cdn.prod.website-files.com/64809f38557bbd902708d443/67e3109498a0f4ed283c2cef_Logos-p-500.png 500w, https://cdn.prod.website-files.com/64809f38557bbd902708d443/67e3109498a0f4ed283c2cef_Logos.png 800w"
                    alt=""
                    src="https://cdn.prod.website-files.com/64809f38557bbd902708d443/67e3109498a0f4ed283c2cef_Logos.png"
                    loading="lazy"
                    className="max-w-[450px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default GetStartedPage;
