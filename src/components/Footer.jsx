import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/Suresh24119"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/suresh-choudhary-882714338/"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
            aria-label="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:patelsureshkumar67338@gmail.com"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
            aria-label="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://www.instagram.com/suresh_pate.9650?igsh=MWxqd2I4ZGphb3BiZQ=="
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
            aria-label="Instagram Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://wa.me/917014148326"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <p>&copy; 2025 Suresh Choudhary</p>
      </div>
    </footer>
  );
};

export default Footer;
