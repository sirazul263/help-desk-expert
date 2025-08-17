import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
interface CommonButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
const CommonButton = ({ title, onClick, disabled }: CommonButtonProps) => {
  return (
    <motion.button
      type="button"
      className="relative  flex items-center overflow-hidden px-16 py-4 rounded-full border-0 cursor-pointer bg-gray-700"
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      disabled={disabled}
    >
      {/* Text on top */}
      <span className="relative z-20 font-bold flex items-center text-white">
        {title}
        <BsArrowRight className="ms-2" />
      </span>

      {/* Overlay sliding from bottom to top */}
      <motion.div
        className="absolute inset-0 z-10 bg-primary"
        variants={{
          initial: { scaleY: 0 },
          hover: { scaleY: 1 },
        }}
        transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom", pointerEvents: "none" }}
      />
    </motion.button>
  );
};
export default CommonButton;
