import React, { useState, useEffect } from 'react';

const Education = React.forwardRef((props, ref) => {
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <section id="education" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Education
        </h2>
        <div className="max-w-2xl mx-auto">
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm mb-6 glow-card shimmer-card transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Master Of Computer Application (MCA)
                </h3>
                <p className="text-indigo-600">Ganpat University</p>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                2024-2026
              </span>
            </div>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm pulse-glow-card border-glow transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-purple-700">B.S.C</h3>
                <p className="text-indigo-600">
                  Jai Narain Vyas University
                </p>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                2022-2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Education;
