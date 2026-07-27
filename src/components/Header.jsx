import React from 'react';

const Header = ({ mobileMenuOpen, setMobileMenuOpen, scrollToSection }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 navbar-3d">
      <div className="navbar-particles"></div>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <a
          href="#"
          className="text-2xl font-bold text-gray-900 logo-3d transform hover:scale-110 transition-all duration-300"
        >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Suresh Choudhary
          </span>
        </a>
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => scrollToSection("about")}
            className="nav-item-3d text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="nav-item-3d text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="nav-item-3d text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className="nav-item-3d text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          >
            Education
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="contact-btn-3d bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Contact
          </button>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mobile-menu-btn transform hover:scale-110 transition-all duration-300"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <i className="fas fa-bars text-2xl text-indigo-600"></i>
        </button>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 mobile-menu-3d bg-white/95 backdrop-blur-md border-t border-gray-200">
          <button
            onClick={() => scrollToSection("about")}
            className="block py-3 text-gray-600 hover:text-indigo-600 transform hover:translate-x-2 transition-all duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="block py-3 text-gray-600 hover:text-indigo-600 transform hover:translate-x-2 transition-all duration-300"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="block py-3 text-gray-600 hover:text-indigo-600 transform hover:translate-x-2 transition-all duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className="block py-3 text-gray-600 hover:text-indigo-600 transform hover:translate-x-2 transition-all duration-300"
          >
            Education
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-center hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
