import {
  Clock,
  FileCheck,
  FileText,
  Home,
  Syringe,
  UserCheck,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  // Data for features card
  const features = [
    {
      icon: <Home size={32} />,
      title: "Free Home Collection",
      desc: "Hum aapke ghar se blood sample collect karte hai, bilkul free.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <UserCheck size={32} />,
      title: "Trained & Hygienic",
      desc: "Hamare staff medically trained hai aur puri safety maintain karta hai.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FileCheck size={32} />,
      title: "Accurate Reports",
      desc: "NABL certified labs se 100% accurate aur reliable reports.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Clock size={32} />,
      title: "Same Day Reporting",
      desc: "Subah sample dijiye aur shaam tak report payiye (selected tests).",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FileText size={32} />,
      title: "Hard & Soft Copy (Whatsapp)",
      desc: "Reports Whatsapp par aur clinic par hard copy bhi available.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Syringe size={32} />,
      title: "Painless Collection",
      desc: "Latest techniques ka use karke dard-rahit sample collections.",
      color: "bg-teal-100 text-teal-600",
    },
  ];

  // Data for Trusted Labs
  const partners = ["Thyrocare", "Dr. LAL", "Hy Patho Lab", "Agilus"];
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* section 1: featues card */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Divine Patho?
          </h2>
          <div className="w-20 h-1 bg-[#b91c1c] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Experience the best healthcare services with our patient-first
            approach.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div
                className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* section 2: Trusted partners */}
        <div className="bg-[#b91c1c] rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-8">
              Trusted Reference Labs
            </h3>
            <p className="text-gray-200 mb-8 text-sm uppercase tracking-widest">
              Samples at NABL Accredited Laboratories
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-[#b91c1c] transition-colors cursor-default"
                >
                  {partner}
                </div>
              ))}
              <div className="bg-[#b91c1c] text-white px-6 py-3 rounded-full font-semibold text-lg">
                & Other Certified Labs
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#b91c1c]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default Features;
