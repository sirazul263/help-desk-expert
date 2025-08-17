import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";
const Faq = () => {
  const router = useRouter();
  const faqs = [
    {
      title: "Will my agent work within my existing tech stack?",
      name: "tech",
      description: `Absolutely! Our agents receive extensive training in
                    Shopify, Zendesk, and Gorgias during their onboarding
                    process. Using other technology? No problem!Your agent will
                    attend Live Training calls with your team in which you'll
                    have the opportunity to go through any additional software
                    they may need access to. We also record these calls to
                    streamline training for them to refer to in the future.`,
    },
    {
      title: "How long does it take to get up and running?",
      name: "running",
      description: `At HelpDeskXpert, we don't like wasting time. On average, it just takes 2-3 weeks to get your agents up and running. 
                    This includes the recruitment, onboarding and the Live Training process!`,
    },
    {
      title: "Do I need to sign a long-term contract?",
      name: "contract",
      description: `We don't do any long-term contracts here at HelpDeskXpert! 
                    Everything we do is completely month-to-month, so you have the flexibility to scale your hours up 
                    or down based on your brands needs.`,
    },
    {
      title: "Does HelpDeskXpert take care of training?",
      name: "training",
      description: `Of course! Our agents go through 20 hours of intensive training on Shopify, 
      E-Commerce Best Practices, Customer Support Best Practices as well as Helpdesk Training. `,
    },
    {
      title: "Is my agent dedicated to me?",
      name: "agent",
      description: `Yes! Unlike other customer service agencies that pool together a team of agents to handle 
      tickets across multiple brands, we assign a dedicated agent to your brand! 
      This ensures that your agent becomes an expert on your brand as well as you brand's tone and voice just 
      like somebody that you would hire in-house. `,
    },
  ];
  return (
    <section className="w-full md:w-3xl mx-auto px-4">
      {/* Heading */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-5xl mb-6">
          <h2 className="text-center mb-10 font-extrabold">
            Frequently Asked <span className=" text-primary">Questions</span>
          </h2>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={faqs[0].name}
          >
            {faqs.map((item, i) => (
              <AccordionItem value={item.name} key={i}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p className="text-lg">{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className=" flex justify-center md:mb-30">
            <motion.button
              type="button"
              className="relative text-xl mt-10 flex items-center overflow-hidden px-10 py-3 rounded-full border-0 cursor-pointer bg-gray-700"
              initial="initial"
              whileHover="hover"
              onClick={() => router.push("/faqs")}
            >
              {/* Text on top */}
              <span className="relative z-20 font-bold flex items-center text-white">
                View All
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
          </div>
        </div>
      </motion.div>
    </section>
  );
};
export default Faq;
