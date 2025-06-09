import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/logoNoSpaceDark.png"
              alt="Grenera Solutions Logo"
              className="h-35 w-auto object-contain"
            />{" "}
            <p className="text-sm">
              Innovating the future, today. We bring technology solutions to
              life through creativity and technical excellence.
            </p>
            <div className="text-sm">
              <p>
                Email:{" "}
                <Link
                  to="mailTo:grenera.spl@gmail.com"
                  className="text-gray-400 hover:text-white"
                >
                  grenera.spl@gmail.com
                </Link>
              </p>
              <p>
                Phone:{" "}
                <Link
                  to="tel:9817397058"
                  className="text-gray-400 hover:text-white"
                >
                  9817397058
                </Link>
              </p>
            </div>
          </div>

          {/* Site Links */}
          <div className="md:mx-auto">
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block hover:text-green-700 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block hover:text-green-700 transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/process"
                  className="block hover:text-green-700 transition-colors"
                >
                  Process
                </Link>
              </div>
              <div className="space-y-2">
                <Link
                  to="/contact"
                  className="block hover:text-green-700 transition-colors"
                >
                  Careers
                </Link>
                <Link
                  to="/products"
                  className="block hover:text-green-700 transition-colors"
                >
                  Products
                </Link>

                <Link
                  to="/contact"
                  className="block hover:text-green-700 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 hover:text-white rounded-full transition-colors"
              >
                <FaFacebook className="w-6 h-6" aria-label="Facebook" />
              </a>
              <a
                href="#"
                className="p-2 hover:text-white rounded-full transition-colors"
              >
                <FaXTwitter className="w-6 h-6" aria-label="Twitter" />
              </a>
              <a
                href="#"
                className="p-2 hover:text-white rounded-full transition-colors"
              >
                <FaInstagram className="w-6 h-6" aria-label="Instagram" />
              </a>
              <a
                href="#"
                className="p-2 hover:text-white rounded-full transition-colors"
              >
                <FaLinkedin className="w-6 h-6" aria-label="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link to="/" className="text-gray-400 hover:text-white">
              Grenera Solutions
            </Link>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
