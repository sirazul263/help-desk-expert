import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonWithUnderLine from "../Common/ButtonWithUnderLine";

const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Track when navbar is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  // Add shadow when scrolling past top
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { url: "services", label: "Services" },
    { url: "industries", label: "Industries" },
    { url: "work", label: "How It Work" },
    { url: "/pricing", label: "Pricing" },
    // { url: "contact", label: "Resources" },
    { url: "contact", label: "Company" },
  ];

  return (
    <nav
      ref={navRef}
      className={`transition-all sticky top-0 bg-white duration-500 ease-in-out w-full z-50 py-4 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      } backdrop-blur-md ${hasShadow ? "shadow-md" : "shadow-none"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="relative">
          <ButtonWithUnderLine
            title="HelpDeskXpert"
            className="btn text-primary font-bold text-3xl"
            url="/"
          />
        </div>

        <ul className="hidden md:flex space-x-7  tracking-widest text-sm items-center">
          {links.map(({ url, label }) => {
            const isActive = router.pathname === url;
            return (
              <li key={label}>
                <button
                  onClick={() => router.push(url)}
                  className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {label}
                  <span
                    className="absolute left-1/2 top-5 w-0 h-0 bg-primary rounded-full 
      transition-all duration-300 transform -translate-x-1/2 translate-y-2
      group-hover:w-1.5 group-hover:h-1.5 group-hover:translate-y-0"
                  ></span>
                </button>
              </li>
            );
          })}
        </ul>

        <motion.button
          type="button"
          className="relative hidden md:flex items-center overflow-hidden px-8 py-3 rounded-full border-0 cursor-pointer bg-primary"
          initial="initial"
          whileHover="hover"
          onClick={() => router.push("/get-started")}
        >
          {/* Text on top */}
          <span className="relative z-20 flex items-center text-white">
            Get Started
            <BsArrowRight className="ms-2" />
          </span>

          {/* Overlay sliding from bottom to top */}
          <motion.div
            className="absolute inset-0 z-10 bg-gray-700"
            variants={{
              initial: { scaleY: 0 },
              hover: { scaleY: 1 },
            }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom", pointerEvents: "none" }}
          />
        </motion.button>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-clr-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4">
          {links.map(({ url, label }) => (
            <div key={label}>
              <button
                className="block cursor-pointer hover:text-pink-600 transition-colors duration-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push(url);
                }}
              >
                {label}
              </button>
            </div>
          ))}
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ec4899", // Tailwind's pink-500
                  color: "#ffffff",
                  boxShadow: "0px 4px 15px rgba(236, 72, 153, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-pink-600 cursor-pointer transition-colors duration-300 border border-pink-600 px-4 py-2 rounded"
              >
                Resume
              </motion.button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Header;
