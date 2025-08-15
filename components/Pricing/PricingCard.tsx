import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { GiCheckMark } from "react-icons/gi";
import { motion } from "framer-motion";

interface Card {
  title: string;
  rate: string;
  details: string[];
}
interface PricingCardProps {
  cards: Card[];
}
const PricingCard = ({ cards }: PricingCardProps) => {
  const AnimatedButton = () => {
    return (
      <motion.button
        type="button"
        className="my-5 w-full relative flex items-center justify-center overflow-hidden px-8 py-3 rounded-full border-0 cursor-pointer bg-primary"
        initial="initial"
        whileHover="hover"
      >
        <span className="relative z-20 flex items-center text-white">
          Book A Demo
        </span>
        <motion.div
          className="absolute inset-0 z-10 bg-gray-700"
          variants={{
            initial: { scaleY: 0 },
            hover: { scaleY: 1 },
          }}
          transition={{
            type: "tween",
            duration: 0.4,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "bottom",
            pointerEvents: "none",
          }}
        />
      </motion.button>
    );
  };
  return (
    <div className="container py-20">
      {/* Desktop view: flex cards */}
      <div className="hidden xl:flex gap-2">
        {cards.map((card, i) => (
          <Card
            key={i}
            className={cn(
              "w-full h-full rounded-4xl border-2 border-blue-100 bg-white hover:border-blue-300",
              i == 2 && "mt-[-40px] hover:bg-amber-100"
            )}
          >
            <CardHeader className={cn("flex px-4 ", i !== 2 && "pt-7")}>
              <CardTitle className="text-2xl font-bold">
                <div className="mb-3">
                  {i === 2 && <Badge>Most Popular</Badge>}
                </div>
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <p className="font-bold text-3xl mb-7">{card.rate}</p>
              <ul className="text-gray-900 font-semibold">
                {card.details.map((item, _i) => (
                  <li key={_i} className="mb-2 flex">
                    <GiCheckMark className="text-green-700 me-2 mt-1 text-sm" />
                    {item}
                  </li>
                ))}
              </ul>
              {i === 2 && <AnimatedButton />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile/Tablet view: swiper */}
      <div className="xl:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.1}
          navigation={false}
          pagination={{ clickable: true }}
          grabCursor={true}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i}>
              <Card
                className={cn(
                  "w-full h-full rounded-4xl border-2 border-blue-100 bg-white",
                  i == 2 && " hover:bg-amber-100"
                )}
              >
                <CardHeader className={cn("flex px-4 ", i !== 2 && "pt-7")}>
                  <CardTitle className="text-2xl font-bold">
                    <div className="mb-3">
                      {i == 2 && <Badge>Most Popular</Badge>}
                    </div>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <p className="font-bold text-3xl mb-7">{card.rate}</p>
                  <ul className="text-gray-900 font-semibold">
                    {card.details.map((item, _i) => (
                      <li key={_i} className="mb-2 flex">
                        <GiCheckMark className="text-green-700 me-2 mt-1 text-sm" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {i == 2 && <AnimatedButton />}
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default PricingCard;
