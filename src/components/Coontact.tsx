import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  Github,
} from "lucide-react";

const Coontact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phoneCode: "LK +94",
    phone: "",
    category: "",
    requirement: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.requirement.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields (Name, Email, and Requirement).");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
        console.warn("Web3Forms Access Key is not configured in .env file. Falling back to debug mode.");
        // If no access key is configured, simulate a successful response for preview/local dev.
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
        setStatusMessage("Debug Mode: Form submitted successfully! (Configure VITE_WEB3FORMS_ACCESS_KEY in .env to receive real emails).");
        setFormData({
          name: "",
          company: "",
          email: "",
          phoneCode: "LK +94",
          phone: "",
          category: "",
          requirement: "",
        });
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          phone: `${formData.phoneCode} ${formData.phone}`.trim() || "Not provided",
          category: formData.category || "Not selected",
          message: formData.requirement,
          subject: `New Portfolio Inquiry from ${formData.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setStatusMessage("Thank you! Your message has been sent successfully. I will get back to you soon.");
        setFormData({
          name: "",
          company: "",
          email: "",
          phoneCode: "LK +94",
          phone: "",
          category: "",
          requirement: "",
        });
      } else {
        setStatus("error");
        setStatusMessage(result.message || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later or reach out via email directly.");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row  gap-8 lg:gap-10 w-full h-auto lg:h-[90dvh] bg-[#f8f9fa] rounded-[24px] sm:rounded-[40px] p-6 sm:p-8 md:p-16 font-sans border border-gray-100 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[55%] grid grid-cols-1 gap-3"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name (e.g. Pamuditha Senanayaka)"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <input
            type="text"
            name="company"
            placeholder="Enter your company"
            value={formData.company}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your e-mail"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Phone Input with Country Code Selector */}
        <div className="flex gap-3 w-full">
          <div className="relative w-1/3 flex-shrink-0">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              disabled={status === "submitting"}
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors appearance-none cursor-pointer pr-8 font-medium disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="LK +94">LK +94</option>
              <option value="US +1">US +1</option>
              <option value="AU +61">AU +61</option>
              <option value="GB +44">GB +44</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown size={18} />
            </div>
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="flex-grow p-4 w-2/3 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Service Category Dropdown */}
        <div className="relative w-full">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={status === "submitting"}
            className={`w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors appearance-none cursor-pointer pr-10 disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed ${
              formData.category ? "text-gray-700" : "text-gray-400"
            }`}
          >
            <option value="">Select a service category</option>
            <option value="web-development">Web Development</option>
            <option value="system-architecture">System Architecture</option>
            <option value="branding-design">Brand Identity & Design</option>
            <option value="consulting">Free Consultation Call</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={18} />
          </div>
        </div>

        <div>
          <textarea
            name="requirement"
            placeholder="Type brief about your requirement"
            rows={5}
            value={formData.requirement}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#222052] focus:ring-1 focus:ring-[#222052] transition-colors resize-none disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="mt-2 flex flex-col gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-[#222052] hover:bg-[#F5CB5C] disabled:bg-gray-400 text-white hover:text-[#222052] disabled:text-white font-semibold text-base px-8 py-3.5 rounded-full hover:scale-[1.03] disabled:hover:scale-100 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 self-start"
          >
            {status === "submitting" ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {status === "success" && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium animate-fade-in">
              {statusMessage}
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm font-medium animate-fade-in">
              {statusMessage}
            </div>
          )}
        </div>
      </form>

      {/* Right Column - Info */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between pt-2">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Let's write the next <br />
            <span className="text-[#222052] bg-gradient-to-r from-[#222052] to-[#F5CB5C] bg-clip-text text-transparent">
              chapter together
            </span>
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-lg">
            Stop guessing. Let's create a plan that actually works. Schedule
            your free consultation call today.
          </p>
        </div>

        {/* Info Grid (Phone/Mail/Socials) */}
        <div className="flex flex-col gap-6 w-full mt-auto">
          {/* Phone and Email side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Phone Card with floating WhatsApp button */}
            <div className="bg-gradient-to-r from-[#222052] to-[#121133] text-white p-6 rounded-[24px] relative shadow-md flex flex-col justify-center gap-1.5 min-h-[120px]">
              <p className="font-bold text-lg">Phone :</p>
              <p className="text-sm opacity-90 font-medium">+44 794 7830390</p>
              <p className="text-sm opacity-90 font-medium">+94 72 644 2538</p>

              {/* Floating WhatsApp Action Button */}
              <a
                href="https://wa.me/94726442538"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#F5CB5C] hover:bg-[#222052] text-[#222052] hover:text-white rounded-full flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 shadow-lg transition-all hover:scale-110 duration-200 border-2 border-white"
                aria-label="WhatsApp Call"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* E-mail Card */}
            <div className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-center gap-1.5 min-h-[120px]">
              <p className="font-bold text-gray-900 text-lg">E-mail :</p>
              <p className="text-gray-600 text-sm break-all font-medium">
                pamudithasenanayaka@gmail.com
              </p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-3">
            <p className="font-bold text-gray-900 text-base">Follow Me:</p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://www.facebook.com/pamuditha.gangana/"
                className="w-9 h-9 rounded-full bg-[#222052] text-white flex items-center justify-center hover:bg-[#F5CB5C] hover:text-[#222052] transition-all hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/pamu_senanayaka/"
                className="w-9 h-9 rounded-full bg-[#222052] text-white flex items-center justify-center hover:bg-[#F5CB5C] hover:text-[#222052] transition-all hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/pamudithagss/"
                className="w-9 h-9 rounded-full bg-[#222052] text-white flex items-center justify-center hover:bg-[#F5CB5C] hover:text-[#222052] transition-all hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://github.com/PamudithaGa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#222052] text-white flex items-center justify-center hover:bg-[#F5CB5C] hover:text-[#222052] transition-all hover:scale-110 shadow-sm"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coontact;
