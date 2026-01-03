import { Toaster } from "react-hot-toast";
import "./App.css";
import BookingForm from "./components/BookingForm";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
        <Toaster position="top-center" />
        <Navbar />
        <Hero />
        <Features />
        <BookingForm />

        <Footer />
      </div>
    </>
  );
}

export default App;
