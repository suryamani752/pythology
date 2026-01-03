import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, TestTube, User } from "lucide-react";

const BookingForm = () => {
  // state for form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    testType: "Full Body Checkup",
    date: "",
    time: "",
  });
  // state form constraints
  const [minDate, setMinDate] = useState("");

  //smart logic
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    // logic: Agar shaam 6 baje ke baad hai to minimum booking date kal hogi.
    // agar 6 baje se pahle hai to aaj book sakta hai
    let targetDate = new Date();
    if (currentHour >= 18) {
      // add 1 day
      targetDate.setDate(now.getDate() + 1);
      toast("It's past 6 PM. Booking date set to tomorrow.", {
        icon: "📅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    // format Date to YYYY-MM-DD
    const formattedDate = targetDate.toISOString().split("T")[0];
    setMinDate(formattedDate);
    // default select calculated date
    setFormData((prev) => ({ ...prev, date: formattedDate }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("please fill all details.");
      return;
    }
    const loadToast = toast.loading("Sending Booking request.....");
    try {
      const response = await fetch("https://formspree.io/f/xbdlarjd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.dismiss(loadToast);
        toast.success("Booking Confirmed! we will call you shortly");
        setFormData({
          name: "",
          phone: "",
          address: "",
          testType: "Full Body Checkup",
          date: "",
          time: "",
        });
      }
    } catch (error) {
      toast.dismiss(loadToast);
      toast.error("Network error! Please cheack your internet.");
    }
  };
  return (
    <section
      id="booking"
      className="py-20 bg-gradient-to-b from-white to-red-50"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row"
        >
          {/* Left Side: Info / Image */}
          <div className="bg-[#b91c1c] text-white p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Book Your Test</h3>
              <p className="text-red-100 mb-8">
                Fill the form and our expert phlebotomist will arrive at your
                doorstep.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Phone size={20} />
                  </div>
                  <span className="font-semibold">+91 94370-93627</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Clock size={20} />
                  </div>
                  <span className="font-semibold">6:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
          </div>

          {/* Right Side: The Form */}
          <div className="p-10 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Test Type */}
              <div className="relative">
                <TestTube
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
                <select
                  name="testType"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all appearance-none text-gray-700"
                  value={formData.testType}
                  onChange={handleChange}
                >
                  <option>Full Body Checkup (₹999)</option>
                  <option>Blood Sugar Fasting</option>
                  <option>Thyroid Profile</option>
                  <option>Lipid Profile</option>
                  <option>CBC (Complete Blood Count)</option>
                  <option>Dengue / Malaria Test</option>
                  <option>Other (Discuss on Call)</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-gray-700"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />
                  <select
                    name="time"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all text-gray-700 appearance-none"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="Morning (6AM - 9AM)">
                      Morning (6AM - 9AM)
                    </option>
                    <option value="Mid-Day (9AM - 12PM)">
                      Mid-Day (9AM - 12PM)
                    </option>
                    <option value="Afternoon (12PM - 3PM)">
                      Afternoon (12PM - 3PM)
                    </option>
                    <option value="Evening (3PM - 6PM)">
                      Evening (3PM - 6PM)
                    </option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
                <textarea
                  name="address"
                  placeholder="Full Address for Collection"
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all resize-none"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#b91c1c] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-800 transition-all hover:-translate-y-1"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
