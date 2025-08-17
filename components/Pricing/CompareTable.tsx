import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";

const pricingData = [
  {
    label: "Level Of Expertise",
    inHouse: "Varies",
    talentpop: "Vetted Top Experts",
    freelance: "Low",
    agencies: "Varies",
  },
  {
    label: "Dedicated Agent",
    inHouse: (
      <IoMdCheckmarkCircleOutline className="text-green-400" size={20} />
    ),
    talentpop: <IoMdCheckmarkCircleOutline size={20} />,
    freelance: "❌",
    agencies: "Varies",
  },
  {
    label: "Fee",
    inHouse: "$$$$",
    talentpop: "$$",
    freelance: "$$",
    agencies: "$$$",
  },
  {
    label: "Customer Success Team",
    inHouse: "Varies",
    talentpop: <IoMdCheckmarkCircleOutline size={20} />,
    freelance: "❌",
    agencies: "❌",
  },
  {
    label: "24 Hour Agent Coverage",
    inHouse: "❌",
    talentpop: <IoMdCheckmarkCircleOutline size={20} />,
    freelance: "❌",
    agencies: "❌",
  },
  {
    label: "Performance Tracking",
    inHouse: "Varies",
    talentpop: <IoMdCheckmarkCircleOutline size={20} />,
    freelance: "❌",
    agencies: "Varies",
  },
];

const CompareTable = () => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl overflow-y-hidden overflow-x-auto w-full mb-10 md:mb-30">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center text-5xl font-extrabold mb-6 md:mb-10">
          <h2>
            In-House Expertise <br /> at{" "}
            <span className="text-primary">Freelance Prices</span>
          </h2>
        </div>
        <Table className="w-full border-collapse">
          <TableHeader className="text-[#0009]">
            <TableRow>
              <TableHead className="border border-[#0000000d] py-8"></TableHead>
              <TableHead className="text-[#0009] font-semibold text-center border border-[#0000000d]">
                In-House
              </TableHead>
              <TableHead className="text-center font-extrabold text-lg bg-[#e9fbef] text-gray-700 rounded-tl-lg rounded-tr-lg shadow-md">
                HelpDeskXpert
              </TableHead>
              <TableHead className="text-[#0009] font-semibold text-center border border-[#0000000d]">
                Freelance Marketplace
              </TableHead>
              <TableHead className="text-[#0009] font-semibold text-center border border-[#0000000d]">
                Agencies
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingData.map((row, idx) => (
              <TableRow key={idx}>
                {/* Label column with alternating row colors */}
                <TableCell
                  className={`py-5 text-xs font-bold border border-[#0000000d] ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {row.label}
                </TableCell>

                {/* In-House column with alternating row colors */}
                <TableCell
                  className={`text-xs text-center border border-[#0000000d] ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {row.inHouse}
                  </div>
                </TableCell>

                {/* HelpDeskXpert column: continuous gradient */}
                <TableCell className=" text-xs text-center bg-gradient-to-b from-green-400 to-green-300 border-none ">
                  <div className="flex items-center justify-center">
                    {row.talentpop}
                  </div>
                </TableCell>

                {/* Freelance column with alternating row colors */}
                <TableCell
                  className={`text-xs text-center border border-[#0000000d] ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {row.freelance}
                </TableCell>

                {/* Agencies column with alternating row colors */}
                <TableCell
                  className={`text-xs text-center border border-[#0000000d] ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {row.agencies}
                </TableCell>
              </TableRow>
            ))}

            {/* Button row */}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="flex justify-center py-4 bg-gradient-to-b from-green-400 to-green-300 rounded-bl-lg rounded-br-lg border-none">
                <motion.button
                  type="button"
                  className="relative flex items-center overflow-hidden px-8 py-4 rounded-full border-0 cursor-pointer bg-gray-700"
                  initial="initial"
                  whileHover="hover"
                  onClick={() => router.push("/get-started")}
                >
                  {/* Text on top */}
                  <span className="relative z-20 font-bold flex items-center text-white">
                    Book a Demo
                  </span>

                  {/* Overlay sliding from bottom to top */}
                  <motion.div
                    className="absolute inset-0 z-10 bg-primary"
                    variants={{
                      initial: { scaleY: 0 },
                      hover: { scaleY: 1 },
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "bottom", pointerEvents: "none" }}
                  />
                </motion.button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default CompareTable;
