import { useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import useScrollSpy from "../hooks/useScrollSpy";

const sections = ["home", "about", "work", "contact"];

function Navigation({ isMobile = true }) {
  const activeId = useScrollSpy(sections);

  return (
<ul className={`nav-ul ${isMobile ? "flex-col space-y-4" : "flex gap-6"}`}>
      {sections.map((id) => (
        <li key={id} className="nav-li relative mb-auto">
          <motion.a
            href={`#${id}`}
            className={`nav-link transition-colors ${
              activeId === id ? "text-white font-bold" : "text-gray-400"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          <span className="inline-block leading-none">
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
          </motion.a>

          {/* Animated underline */}
          {activeId === id && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 h-[2px] w-full bg-white"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            VIRENDRA VYAS
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center md:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
