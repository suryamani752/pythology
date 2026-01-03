import React from "react";
import { motion } from "framer-motion";
import { CalendarClock, PhoneCall, ShieldCheck, Home } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-red-50 to-white pt-32 pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-brand-red px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <ShieldCheck size={18} />
              <span>Trusted Since 1995</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Stop Guessing About <br />
              <span className="text-brand-red">Your Health. Test It!</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Divine Patho Clinic offers accurate pathology & blood testing
              services. Get reports from NABL accredited labs with free home
              sample collection.
            </p>

            {/* Special Offer Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-yellow-400 text-brand-dark px-6 py-3 rounded-xl font-bold text-xl shadow-lg transform -rotate-2 border-2 border-yellow-200">
                upto 25% OFF
              </div>
              <p className="text-sm font-medium text-gray-500">
                On all Full Body Checkups <br /> Limited time offer!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#booking"
                className="flex items-center justify-center gap-2 bg-[#b91c1c] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-red-800 transition-all hover:-translate-y-1"
              >
                <CalendarClock size={20} />
                Book Appointment
              </a>
              <a
                href="tel:9437093627"
                className="flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-xl font-bold hover:border-[#b91c1c] hover:text-[#b91c1c] transition-all"
              >
                <PhoneCall size={20} />
                Call: 94370-93627
              </a>
            </div>
          </motion.div>

          {/* Right Column: Image & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="./hero.png"
                alt="Doctor collecting blood sample"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
              />

              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
            </div>

            {/* Floating Element 1: Home Collection */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-gray-100"
            >
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Home size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Free Home</p>
                <p className="text-xs text-gray-500">Sample Collection</p>
              </div>
            </motion.div>

            {/* Floating Element 2: Accurate Reports */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-gray-100"
            >
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">100% Accurate</p>
                <p className="text-xs text-gray-500">NABL Labs</p>
              </div>
            </motion.div>

            {/* Decorative Dots Background */}
            <div className="absolute -z-10 top-10 -right-10 w-24 h-24 bg-[#b91c1c]/10 rounded-full blur-xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
