import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          About Me
        </h2>
        <div
          className={`max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <h3 className="font-bold text-xl mb-2 text-gray-900">
            Professional Summary
          </h3>
          <p className="text-gray-600 mb-6">
            Hi! I'm Suresh Choudhary, a MERN Stack Developer who enjoys
            creating fast, user-friendly websites and web applications. I
            specialize in building clean and responsive interfaces using
            React.js on the frontend, and robust, secure backends with
            Node.js and Express.js. I manage data efficiently with MongoDB
            and ensure seamless performance across applications. Alongside
            web development, I have experience with Python, C, and Java, and
            I'm currently exploring Machine Learning to develop smart,
            real-world solutions. I'm passionate about problem-solving,
            developing impactful projects, and constantly learning new
            technologies to grow as a developer.
          </p>
          <h3 className="font-bold text-xl mb-2 text-gray-900">
            Career Objective
          </h3>
          <p className="text-gray-600">
            Motivated and enthusiastic MCA student seeking an entry-level
            opportunity in the IT industry to apply academic knowledge and
            gain hands-on experience. Eager to contribute to team success
            through hard work, attention to detail, and a passion for
            learning new technologies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
