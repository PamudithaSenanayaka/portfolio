import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../assets/LogoP.png";

const Navbar: React.FC = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Tech Stack", id: "tech-stack" },
    { name: Logo, id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleScroll = (id: string, name: string) => {
    setActive(name);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="font-roboto hidden lg:flex items-center justify-center gap-10 text-[#fff] rounded-xl mt-6">
        {navItems.map((item) => (
          <div
            key={item.name}
            onClick={() => handleScroll(item.id, item.name)}
            className={`px-6 py-2 rounded-2xl cursor-pointer transition-all duration-200 text-lg flex items-center ${
              active === item.name && item.name !== Logo ? "text-[#F5CB5C]" : ""
            }`}
          >
            {item.name === Logo ? (
              <img src={Logo} alt="Logo" className="h-12" />
            ) : (
              item.name
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navbar */}
      <div className="flex lg:hidden bg-[#222052] font-roboto items-center justify-between px-5 py-3 text-[#fff] rounded-xl mt-6 relative z-50">
        {/* Logo */}
        <div onClick={() => handleScroll("home", "Home")} className="cursor-pointer">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md text-white hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#222052] border border-white/10 rounded-xl p-4 flex flex-col gap-3 shadow-2xl"
            >
              {navItems
                .filter((item) => item.name !== Logo)
                .map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      handleScroll(item.id, item.name);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-base font-medium ${
                      active === item.name ? "bg-[#F5CB5C] text-black" : "hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
