import { motion } from "framer-motion";
import { useRouter } from "next/router";
interface ButtonWithUnderLineProps {
  title: string;
  url?: string;
  className: string;
}
const ButtonWithUnderLine = ({
  title,
  url,
  className,
}: ButtonWithUnderLineProps) => {
  const router = useRouter();
  return (
    <motion.button
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
      disabled={!url}
      onClick={() => router.push(url || "/")}
    >
      {title}
      <motion.span
        className="absolute left-0 bottom-0 h-[2px] bg-primary"
        variants={{
          rest: { width: 0 },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ButtonWithUnderLine;
