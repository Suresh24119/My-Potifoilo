 import React, { useState, useEffect } from 'react';

const Projects = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <section id="projects" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-4 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Projects
        </h2>
        <p
          className={`text-center text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Here are some of my featured projects showcasing my skills and
          experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm glow-card shimmer-card project-card transition-all duration-700 delay-300 hover:scale-105 hover:shadow-lg ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-4">
              <img
                src="My Portfolio.png"
                alt="Portfolio Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">
              Interactive Portfolio Website
            </h3>
            <p className="text-gray-600 mb-4">
              A modern, responsive portfolio website built with React.js
              featuring 3D animations, interactive UI elements, and dynamic
              content.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>React.js</li>
              <li>Three.js</li>
              <li>Tailwind CSS</li>
              <li>Responsive Design</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                View Project
              </a>
              <a
                href="#"
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-900 transition duration-300 transform hover:scale-105"
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </a>
            </div>
          </div>

          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm color-shift-card border-glow project-card transition-all duration-700 delay-500 hover:scale-105 hover:shadow-lg ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="E-commerce Platform"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-700">
              MERN Stack E-commerce Platform
            </h3>
            <p className="text-gray-600 mb-4">
              Full-stack e-commerce application with user authentication,
              product management, shopping cart, and payment integration.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>MongoDB</li>
              <li>Express.js</li>
              <li>React.js</li>
              <li>Node.js</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-700 transition duration-300 transform hover:scale-105"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                View Project
              </a>
              <a
                href="#"
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-900 transition duration-300 transform hover:scale-105"
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </a>
            </div>
          </div>

          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm pulse-glow-card float-card project-card transition-all duration-700 delay-700 hover:scale-105 hover:shadow-lg ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-4">
              <img
                src="Resume Maker.png"
                alt="Resume Maker"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-700">
               Resume Maker
            </h3>
            <p className="text-gray-600 mb-4">
               The application is a web-based tool for building professional resumes.
                It allows users to create, customize, and download their resumes with ease.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Vs Code</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://resume-maker-topaz-three.vercel.app"
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition duration-300 transform hover:scale-105"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                View Project
              </a>
              <a
                href="https://github.com/Suresh24119/Resume-Maker"
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-900 transition duration-300 transform hover:scale-105"
              >
                <i className="fab fa-github mr-2"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects;
