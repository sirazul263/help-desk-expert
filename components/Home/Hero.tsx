import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="container mx-auto mt-10" id="hero">
      <motion.h2
        className="text-4xl sm:text-6xl font-bold mt-6 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Md Sirazul Islam.
      </motion.h2>

      <motion.h3
        className="text-4xl sm:text-6xl font-bold text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Bringing ideas to the web
      </motion.h3>

      <motion.p
        className=" mt-6 text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        I'm a Senior Software Engineer with over 4 years of experience building
        high-quality, scalable digital products. I specialize in creating
        exceptional user experiences across web and mobile platforms, with a
        strong focus on performance, clean architecture, and modern development
        practices.
      </motion.p>
    </section>
  );
};

export default Hero;
