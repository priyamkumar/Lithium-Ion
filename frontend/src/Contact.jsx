import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Linkedin,
  Instagram,
  CheckCircle,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { server } from "./main";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneClean = formData.phone.replace(/\s+/g, "");

      const phoneRegex = /^(\+91[-]?)?[0-9]{10}$/;

      if (!phoneRegex.test(phoneClean)) {
        newErrors.phone =
          "Please enter a valid 10-digit Indian phone number (with optional +91 prefix)";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const { data } = await axios.post(`${server}/api/contact/`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          contactPurpose: formData.purpose,
          message: formData.message,
        });
        setIsSubmitted(true);
      } catch (err) {
        console.log(err);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        purpose: "General Inquiry",
        message: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  const contactInfo = {
    email: "grenera.spl@gmail.com",
    phone: "+91-9817397058",
    address:
      "47PR+XJ3 Model Town, Yamuna Nagar, Haryana",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm text-center">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            We're here to help with any questions you might have
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Map Component */}
        <div className="mb-10">
          <div className="shadow-lg rounded-2xl overflow-hidden">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3450.490868845454!2d77.29154299999999!3d30.137379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA4JzE0LjYiTiA3N8KwMTcnMjkuNiJF!5e0!3m2!1sen!2sin!4v1749025292654!5m2!1sen!2sin"
              className="w-full h-64 md:h-96"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-base text-gray-900 hover:text-green-600 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-base text-gray-900 hover:text-green-600 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-base text-gray-900">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors group"
                  >
                    <FaXTwitter className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors group"
                  >
                    <Facebook className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors group"
                  >
                    <Linkedin className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-full hover:bg-green-100 transition-colors group"
                  >
                    <Instagram className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Monday - Saturday</p>
                    <p className="text-gray-900 font-medium">
                      9:00 AM - 5:00 PM (IST)
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Sunday</p>
                    <p className="text-gray-900 font-medium">Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="bg-green-100 rounded-full p-4 mb-6">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Thank you for reaching out to us. We'll get back to you as
                    soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.name
                              ? "border-red-300 ring-1 ring-red-500"
                              : "border-gray-300"
                          } shadow-sm focus:ring-green-500 focus:border-green-500`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.email
                              ? "border-red-300 ring-1 ring-red-500"
                              : "border-gray-300"
                          } shadow-sm focus:ring-green-500 focus:border-green-500`}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.phone
                              ? "border-red-300 ring-1 ring-red-500"
                              : "border-gray-300"
                          } shadow-sm focus:ring-green-500 focus:border-green-500`}
                          placeholder="+91-XXXXXXXXXX"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="purpose"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Purpose
                      </label>
                      <div className="mt-1">
                        <select
                          id="purpose"
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                        >
                          <option>General Inquiry</option>
                          <option>Support</option>
                          <option>Sales</option>
                          <option>Partnership</option>
                          <option>Careers</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.message
                              ? "border-red-300 ring-1 ring-red-500"
                              : "border-gray-300"
                          } shadow-sm focus:ring-green-500 focus:border-green-500`}
                          placeholder="How can we help you?"
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="cursor-pointer w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <dl className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="px-6 py-4 md:p-6">
                  <dt className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

// FAQ data
const faqs = [
  {
    question: "What types of batteries do you accept?",
    answer:
      "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call  support line directly.",
  },
  {
    question: "How does the pickup process work?",
    answer:
      "Yes, we offer video conferencing through Zoom, Microsoft Teams, or Google Meet. Please indicate your preference when scheduling a meeting.",
  },
  {
    question: "What certifications do you have?",
    answer:
      "Our customer support team is available Monday through Friday from 9:00 AM to 6:00 PM IST, and Saturdays from 10:00 AM to 4:00 PM IST.",
  },
  {
    question: "How do you ensure data security for device batteries?",
    answer:
      "You can request a product demo by selecting 'Sales' in the contact form above, or by emailing demo@example.com with your requirements.",
  },
];
