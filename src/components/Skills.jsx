import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observer for skills animation (unobserves after trigger)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
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

  // Observer for section visibility
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

  const SkillBar = ({ skill, percentage }) => (
    <div className="skill">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill}</span>
        <span className="text-sm font-medium text-indigo-700">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full skill-bar-fill"
          style={{ width: skillsAnimated ? `${percentage}%` : "0%" }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          My Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm glow-card shimmer-card transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">
              Web Development
            </h3>
            <ul className="space-y-4">
              <li>HTML & CSS</li>
              <li>React.js</li>
              <li>Node.js & Express.js</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm color-shift-card border-glow transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-purple-700">
              Mobile App Development
            </h3>
            <ul className="space-y-4">
              <li>Android Studio</li>
              <li>Java & Kotlin</li>
              <li>XML & Jetpack Compose</li>
            </ul>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm pulse-glow-card shimmer-card transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-pink-700">
              3D Design & Animation
            </h3>
            <ul className="space-y-4">
              <li>Three.js</li>
              <li>Blender (Basic)</li>
            </ul>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm float-card glow-card transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-green-700">
              Programming Languages
            </h3>
            <ul className="space-y-4">
              <li>JavaScript</li>
              <li>Python</li>
              <li>Java</li>
              <li>C</li>
            </ul>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm color-shift-card pulse-glow-card transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Database Management
            </h3>
            <ul className="space-y-4">
              <li>MySQL</li>
              <li>SQLite</li>
              <li>Firebase</li>
              <li>Supabase</li>
            </ul>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm shimmer-card border-glow transition-all duration-700 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-orange-700">
              Tools & Platforms
            </h3>
            <div className="space-y-5 mt-4">
              <SkillBar skill="Git" percentage={80} />
              <SkillBar skill="GitHub" percentage={75} />
              <SkillBar skill="Postman" percentage={80} />
              <SkillBar skill="JWT" percentage={85} />
              <SkillBar skill="REST APIs" percentage={85} />
            </div>
          </div>
          <div
            className={`bg-gray-50 p-6 rounded-xl shadow-sm float-card pulse-glow-card transition-all duration-700 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 text-red-700">
              AI/ML Integration
            </h3>
            <ul className="space-y-4">
              <li>TensorFlow Lite (mobile)</li>
              <li>Gemini API</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
