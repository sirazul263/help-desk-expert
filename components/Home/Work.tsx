import { motion } from "framer-motion";
import PricingTab from "../Pricing/PricingTab";
const Work = () => {
  return (
    <section>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <PricingTab />
      </motion.div>
    </section>
  );
};

export default Work;
