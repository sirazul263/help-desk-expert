"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { TbWorldBolt } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa";
import { BsChat } from "react-icons/bs";

// Dynamically import Swiper to disable SSR
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const About = () => {
  const channels = [
    {
      name: "Email",
      icon: <HiOutlineEnvelope size={60} className="text-primary" />,
    },
    {
      name: "Phone",
      icon: <HiOutlinePhone size={48} className="text-primary" />,
    },
    {
      name: "Social Media",
      icon: <TbWorldBolt size={50} className="text-primary" />,
    },
    {
      name: "Live Chat",
      icon: <FaHeadset size={50} className="text-primary" />,
    },
    { name: "SMS", icon: <BsChat size={45} className="text-primary" /> },
  ];

  return (
    <section className="md:max-w-[1200px] mx-auto mt-10 md:mt-40 px-4">
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-5xl font-extrabold mb-4">
          We <span className="text-primary">Cover</span> All The Channels
        </h2>
        <p className="mb-10 font-semibold text-lg text-gray-700">
          Supporting all of the channels your customers love, <br /> without
          limitations
        </p>

        {/* Desktop */}
        <div className="hidden xl:flex gap-4 justify-center">
          {channels.map((channel, i) => (
            <Card
              key={i}
              className="w-[200px] h-40 rounded-4xl border-2 border-blue-100 bg-white hover:border-blue-300"
            >
              <CardContent className="px-1 flex  items-center justify-center gap-2 h-full">
                {channel.icon}
                <h2 className="text-lg font-extrabold text-gray-700">
                  {channel.name}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Mobile Swiper */}
      <div className="xl:hidden w-full mt-8">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          navigation
          grabCursor
        >
          {channels.map((channel, i) => (
            <SwiperSlide key={i}>
              <Card className="w-full h-40 mb-4">
                <CardHeader className="flex justify-center px-4">
                  <CardTitle className="text-2xl font-bold">
                    {channel.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 flex justify-center items-center h-full">
                  {channel.icon}
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default About;
