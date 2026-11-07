import React, { useState } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import useMutationApi from "../service/hooks/useMutationApi";
import storageService from "../service/storageService";
import API from "../ApiEndPoint/ApiUrl";
import toastService from "../component/toastService";
const Contact = () => {

      const ContactUsUserMutation = useMutationApi("POST", API.ContactUsUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 



    const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    ContactUsUserMutation.mutate(formData, {
      onSuccess: (data) => {
  

    

        toastService.success("Signup Successfully!");
 

        setFormData({
          name: "",
    email: "",
    subject: "",
    message: "",
        });
      },

      onError: (error) => {
        setError(error.message);
        toastService.error(error.message || "Signup Failed!");
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="pt-24"></div>
      <div className="bg-gray-50 min-h-screen py-14 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900">
              Contact <span className="text-pink-500">Us</span>
            </h1>
            <p className="text-gray-500 mt-3">
              We'd love to hear from you. Get in touch with us!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Contact Information */}
            <div className="bg-slate-900 text-white p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-4">
                Get In Touch
              </h2>

              <p className="text-gray-400 mb-10">
                Have questions about your order or products?
                Contact our support team.
              </p>

              <div className="space-y-8">

                <div className="flex gap-4 items-center">
                  <div className="bg-pink-500 p-3 rounded-lg">
                    <Phone />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-400">+91 XXXXX XXXXX</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-pink-500 p-3 rounded-lg">
                    <Mail />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-400">support@stylehub.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-pink-500 p-3 rounded-lg">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-400">India</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-pink-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-pink-500"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-pink-500"
                />

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-pink-500 resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
                >
                  Send Message <Send size={18} />
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;