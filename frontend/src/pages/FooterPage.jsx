import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">MindEase</h2>
          <p className="text-sm mt-1">
            Helping you stay mindful, focused, and balanced.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-white text-center">
          <a href="#" className="hover:text-gray-200">Privacy Policy</a>
          <a href="#" className="hover:text-gray-200">Terms of Service</a>
          <a href="#" className="hover:text-gray-200">Contact Us</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="hover:text-gray-300" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-200">
        &copy; {new Date().getFullYear()} MindEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
