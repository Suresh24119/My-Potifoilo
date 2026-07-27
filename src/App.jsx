import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs for sections that use forwardRef to attach the DOM node
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="text-gray-800">
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        scrollToSection={scrollToSection} 
      />

      <main>
        <Hero scrollToSection={scrollToSection} />

        <About />

        <Skills />

        <Projects ref={projectsRef} />

        <Education ref={educationRef} />

        <Contact ref={contactRef} />
      </main>

      <Footer />
    </div>
  );
}
