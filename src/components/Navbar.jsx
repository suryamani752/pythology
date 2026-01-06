import React, { useState } from "react";
import { Menu, Phone, TestTube2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // links array
  const navLinks = [
    {
      name: "Home",
      href: "#",
    },

    {
      name: "About Us",
      href: "#about",
    },
    {
      name: "Booking",
      href: "#booking",
    },
  ];
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo section */}
          <a href="#">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[#b91c1c] p-2 rounded-lg text-white">
                <TestTube2 size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">
                  DIVINE PATHO
                </h1>
                <span className="text-xs text-[#b91c1c] font-semibold tracking-wider">
                  CLINIC
                </span>
              </div>
            </div>
          </a>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-[#b91c1c] font-medium transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            {/* call button */}
            <a
              href="tel:9437093627"
              className="flex items-center gap-2 bg-[#b91c1c] text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:bg-red-800 transition-transform transform hover:scale-105"
            >
              <Phone size={18} />
              <span>94370-93627</span>
            </a>
          </div>
          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#b91c1c] focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu dropdown (animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 shadow-lg">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[#b91c1c] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:9437093627"
                className="flex items-center justify-center gap-2 bg-[#b91c1c] text-white px-4 py-3 rounded-lg font-bold mt-4"
              >
                <Phone size={20} Call Now />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
