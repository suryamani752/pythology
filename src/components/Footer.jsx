import React from "react";
import {
  TestTube2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-[#b91c1c] p-2 rounded-lg text-white">
                <TestTube2 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold leading-none">DIVINE PYTHO</h2>
                <span className="text-xs text-gray-400 tracking-wider">
                  CLINIC
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Trusted pathology services with 100% accurate reports from NABL
              accredited labs. Your health is our priority.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b91c1c] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b91c1c] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b91c1c] transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-brand-red transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-brand-red transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#tests"
                  className="hover:text-brand-red transition-colors"
                >
                  Health Packages
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="hover:text-brand-red transition-colors"
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-red transition-colors">
                  Download Report
                </a>
              </li>
            </ul>
          </div>

          {/* Tests */}
          <div>
            <h3 className="text-lg font-bold mb-6">Popular Tests</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-brand-red cursor-pointer">
                Full Body Checkup
              </li>
              <li className="hover:text-brand-red cursor-pointer">
                Thyroid Profile
              </li>
              <li className="hover:text-brand-red cursor-pointer">
                Lipid Profile
              </li>
              <li className="hover:text-brand-red cursor-pointer">
                Blood Sugar Fasting
              </li>
              <li className="hover:text-brand-red cursor-pointer">
                Liver Function Test
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-red mt-1" size={20} />
                <p>
                  Shop No. 5, Medical Square,
                  <br />
                  Bhubaneswar, Odisha - 751024
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-brand-red" size={20} />
                <p>+91 94370-93627</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-brand-red" size={20} />
                <p>contact@divinepatho.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Divine Patho Clinic. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
