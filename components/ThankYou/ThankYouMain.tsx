import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Rating from "../Common/Rating";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRouter } from "next/router";
const ThankYouMain = () => {
  const router = useRouter();

  const data = [
    {
      name: "Lauren D.",
      rating: 4.6,
      industry: "Health & Wellness",
      tickets: 95,
      experience: 6,
      previousRole: "CorePower Yoga",
      image:
        "https://cdn.prod.website-files.com/64809f38557bbd902708d441/64809f38557bbd902708d698_image%20244.png",
    },
    {
      name: "Danielle T.",
      rating: 4.8,
      industry: "Fashion",
      tickets: 84,
      experience: 7,
      previousRole: "Zara",
      image:
        "https://cdn.prod.website-files.com/64809f38557bbd902708d441/64809f38557bbd902708d552_h-4.png",
    },
  ];
  return (
    <section className="container mx-auto mt-10 mb-20">
      <div className="flex flex-wrap items-center ">
        <div className="w-full md:w-5/12 mb-20 md:text-left text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold mt-6 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Thanks for
          </motion.h2>
          <motion.h3
            className="text-4xl sm:text-5xl font-extrabold  mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            booking a meeting
          </motion.h3>
          <motion.p
            className="text-4xl sm:text-5xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            with <span className="text-primary">HelpDeskXpert!</span>
          </motion.p>

          <motion.p
            className="font-extralight mt-5 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            An invitation has been emailed to you. We're looking forward to
            meeting you soon!
          </motion.p>
        </div>
        <div className="w-full md:w-7/12 flex justify-end items-center">
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0} // no gap for fade
            slidesPerView={1}
            loop={true}
            speed={800} // fade duration
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
          >
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-end">
                  {/* Image */}
                  <div className="flex justify-center">
                    <Image
                      src={item.image}
                      alt="Employee"
                      width={400}
                      height={700}
                    />
                  </div>

                  {/* Card */}
                  <div className="max-w-[440px] w-full">
                    <div className="flex gap-8 p-4 items-center justify-between rounded-4xl border-3 border-blue-100 bg-white hover:border-blue-300 transition-colors duration-300">
                      <div className="text-center">
                        <p className="text-xl font-bold">{item.name}</p>
                        <div className="flex">
                          <p className="font-bold text-xl me-2 pt-1">
                            {item.rating}
                          </p>
                          <Rating rating={item.rating} />
                        </div>
                      </div>

                      {/* Industry */}
                      <div className="max-w-[150px]">
                        <p className="text-sm text-gray-900 font-semibold">
                          Industry
                        </p>
                        <p className="text-primary text-lg font-extrabold leading-tight">
                          {item.industry}
                        </p>
                        <p className="text-[13px] text-gray-900 font-semibold mt-2 leading-tight">
                          Average Tickets <br />
                          Closed Per Day
                        </p>
                        <p className="text-primary text-xl font-extrabold">
                          {item.tickets}
                        </p>
                      </div>

                      {/* Experience */}
                      <div className="max-w-[140px]">
                        <p className="text-sm text-gray-900 font-semibold">
                          Experience
                        </p>
                        <p className="text-primary text-lg font-extrabold">
                          {item.experience} Years
                        </p>
                        <p className="text-sm text-gray-900 font-semibold mt-2">
                          Previous Role
                        </p>
                        <p className="text-primary text-lg font-extrabold leading-tight">
                          {item.previousRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ThankYouMain;
