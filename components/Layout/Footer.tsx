import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { ReactNode } from "react";

const Footer = () => {
  const AnimatedButton = ({
    children,
    primary,
    href,
  }: {
    children: ReactNode;
    primary?: boolean;
    href: string;
  }) => (
    <motion.a
      whileHover={{
        y: -5, // Move up by 10px
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
      className={`rounded border-2 hover:opacity-80  ${
        primary ? "border-red-500" : "hover:border-red-500 "
      }`}
      href={href}
    >
      {children}
    </motion.a>
  );

  const solutions = [
    { url: "/how-it-works", title: "How It Works" },
    { url: "/our-experts", title: "Our Experts" },
    { url: "/pricing", title: "Pricing" },
  ];

  const resources = [
    { url: "/success-stories", title: "Success Stories" },
    { url: "/blog", title: "Blog" },
    { url: "/", title: "Why Help Desk Xpert?" },
    { url: "/faqs", title: "FAQs" },
    { url: "/partners", title: "Partners" },
    { url: "/partner-directory", title: "Partner Directory" },
    { url: "/submit-referral", title: "Submit A Referral" },
  ];

  const company = [
    { url: "/about", title: "About" },
    { url: "/contact-us", title: "Contact Us" },
    { url: "/privacy-policy", title: "Privacy Policy" },
    { url: "/", title: "Do Not Sell My Information" },
  ];
  return (
    <footer className="bg-gray-700 text-white">
      <section className="py-8">
        <div className="container mx-auto pt-4 pb-5">
          <div className="flex flex-wrap -mx-4">
            {/* Left column - 5/12 */}
            <div className="w-full md:w-5/12 px-4 mb-8 md:mb-0">
              <div className="mb-6">
                <Link href="/" className="inline-block mb-4">
                  <h3 className="text-primary font-bold text-2xl">
                    HelpDeskXpert
                  </h3>
                </Link>

                <h5 className="text-sm font-semibold mb-3">Contact</h5>
                <p className="mb-1">
                  <span className="font-semibold">Phone: </span>+880 1640 332
                  419
                </p>
                <p className="mb-3">
                  <span className="font-semibold">Email: </span>
                  contact@helpdeskxpert.com
                </p>

                <h5 className="text-gray-400 font-semibold text-sm mb-3">
                  Follow Us
                </h5>
                <div className="flex space-x-4">
                  <Link
                    href="https://web.facebook.com/HelpDeskXpert"
                    aria-label="Facebook"
                  >
                    <FaFacebookF
                      className="mt-1 hover:text-primary hover:scale-110 transition-transform duration-300"
                      size={18}
                    />
                  </Link>
                  <Link href="#" aria-label="Twitter">
                    <FaXTwitter
                      className="mt-1 hover:text-primary hover:scale-110 transition-transform duration-300"
                      size={18}
                    />
                  </Link>
                  <Link href="#" aria-label="Linkedin">
                    <FaLinkedinIn
                      className="mt-1 hover:text-primary hover:scale-110 transition-transform duration-300"
                      size={20}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/helpdeskxpert"
                    aria-label="Instagram"
                  >
                    <FaInstagram
                      className="mt-1 hover:text-primary hover:scale-110 transition-transform duration-300"
                      size={18}
                    />
                  </Link>
                  <Link href="#" aria-label="Pinterest">
                    <FaPinterestP
                      className="mt-1 hover:text-primary hover:scale-110 transition-transform duration-300"
                      size={18}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column - 7/12 */}
            <div className="w-full md:w-7/12 px-4">
              <div className="flex flex-wrap -mx-4">
                {/* Our Solution */}
                <div className="w-1/2 md:w-1/3 px-4 mb-8 md:mb-0">
                  <h5 className="font-bold text-xl mb-4">Our Solution</h5>
                  <ul className="space-y-2">
                    {solutions.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.url}
                          className="hover:text-primary transition-all duration-300 inline-block transform hover:translate-x-0.5"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div className="w-1/2 md:w-1/3 px-4 mb-8 md:mb-0">
                  <h5 className="font-bold text-xl mb-4">Resources</h5>
                  <ul className="space-y-2">
                    {resources.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.url}
                          className="hover:text-primary transition-all duration-300 inline-block transform hover:translate-x-0.5"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="w-full md:w-1/3 px-4">
                  <h5 className="font-bold text-xl mb-4">Company</h5>
                  <ul className="space-y-2">
                    {company.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.url}
                          className="hover:text-primary transition-all duration-300 inline-block transform hover:translate-x-0.5"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto pb-5 mob-center">
        <div className="flex flex-wrap items-center">
          <div className="w-full mb-5">
            <div className="border-t border-gray-700"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-sm  mb-0 text-center lg:text-left">
              <Link href="/privacy-policy" className=" text-primary">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/terms-conditions" className="text-primary">
                Terms & Conditions
              </Link>
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-sm  mb-0 text-center lg:text-right">
              &copy; <strong className="text-primary">HelpDeskXpert</strong> All
              rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
