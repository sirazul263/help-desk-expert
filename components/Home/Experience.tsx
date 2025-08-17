import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

const CountUp = ({ end }: { end: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const [count, setCount] = useState(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  const isInView = useInView(ref, { once: true, margin: "-100px" }); // trigger slightly before fully visible

  useEffect(() => {
    const unsubscribe = rounded.onChange((v) => setCount(v));

    if (isInView) {
      const controls = animate(motionValue, end, {
        duration: 2,
        ease: "easeOut",
      });
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, end, motionValue, rounded]);

  return <span ref={ref}>{count}</span>;
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="w-full md:w-6xl mx-auto mt-5 md:mt-40 px-4"
    >
      {/* Heading */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center text-5xl font-extrabold mb-6">
          <h2>Let's Get Into The Numbers</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 md:mt-15 w-full">
          <div className="bg-white flex flex-col justify-center text-center border-2 rounded-3xl py-10">
            <div className="text-5xl mb-5 font-extrabold text-primary">
              <CountUp end={500} />+
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              Active Customers
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center text-center border-2 rounded-3xl py-10">
            <div className="text-5xl mb-5 font-extrabold text-primary">
              <CountUp end={4} />
              <span className="font-bold text-4xl">X</span>
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              Conversion Rate Boost <br /> From Live Chat
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center text-center border-2 rounded-3xl py-10">
            <div className="text-5xl mb-5 font-extrabold text-primary">
              <CountUp end={1} />h
              <span className="font-bold text-4xl"> avg</span>
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              SLA Response Speed
            </p>
          </div>
        </div>
        <div className="lg:flex gap-5 justify-center my-10">
          <div className="w-full lg:w-[350px] bg-white flex flex-col justify-center text-center border-2 rounded-3xl py-10 mb-4">
            <div className="text-5xl mb-5 font-extrabold text-primary">
              <CountUp end={2} /> weeks
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              Onboarding Time
            </p>
          </div>
          <div className="w-full lg:w-[350px] bg-white flex flex-col justify-center text-center border-2 rounded-3xl py-10 mb-4">
            <div className="text-5xl mb-5 font-extrabold text-primary">
              <CountUp end={60} />%
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              Reduction in Cost
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
