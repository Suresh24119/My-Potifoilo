
import React, { useState, useEffect, useRef } from 'react'
import './App.css'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [skillsAnimated, setSkillsAnimated] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const heroCanvasRef = useRef(null)
  const skillsSectionRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)

  // Three.js hero animation
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => {
      if (window.THREE && heroCanvasRef.current) {
        initThreeJS()
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const initThreeJS = () => {
    const scene = new window.THREE.Scene()
    const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new window.THREE.WebGLRenderer({
      canvas: heroCanvasRef.current,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const particleGroup = new window.THREE.Group()
    scene.add(particleGroup)

    const particleCount = 5000
    const particles = new window.THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    particles.setAttribute('position', new window.THREE.BufferAttribute(positions, 3))
    const particleMaterial = new window.THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      blending: window.THREE.AdditiveBlending
    })
    const particleSystem = new window.THREE.Points(particles, particleMaterial)
    particleGroup.add(particleSystem)
    
    camera.position.z = 5

    let mouseX = 0, mouseY = 0
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100
      mouseY = (event.clientY - window.innerHeight / 2) / 100
    })

    const animate = function () {
      requestAnimationFrame(animate)
      particleGroup.rotation.y += 0.0005
      particleGroup.rotation.x += 0.0005
      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    animate()
  }

  // Skills animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsAnimated) {
            setSkillsAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (skillsSectionRef.current) {
      observer.observe(skillsSectionRef.current)
    }

    return () => observer.disconnect()
  }, [skillsAnimated])

  // Scroll animations observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = [aboutRef, skillsSectionRef, projectsRef, educationRef, contactRef]
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const SkillBar = ({ skill, percentage }) => (
    <div className="skill">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill}</span>
        <span className="text-sm font-medium text-indigo-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full skill-bar-fill" 
          style={{ width: skillsAnimated ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  )

  return (
    <div className="text-gray-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-gray-900">Suresh Choudhary</a>
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-indigo-600 transition duration-300">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-indigo-600 transition duration-300">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-600 hover:text-indigo-600 transition duration-300">Projects</button>
            <button onClick={() => scrollToSection('education')} className="text-gray-600 hover:text-indigo-600 transition duration-300">Education</button>
            <button onClick={() => scrollToSection('contact')} className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">Contact</button>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden"
            aria-label="Open mobile menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </nav>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4">
            <button onClick={() => scrollToSection('about')} className="block py-2 text-gray-600 hover:text-indigo-600">About</button>
            <button onClick={() => scrollToSection('skills')} className="block py-2 text-gray-600 hover:text-indigo-600">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="block py-2 text-gray-600 hover:text-indigo-600">Projects</button>
            <button onClick={() => scrollToSection('education')} className="block py-2 text-gray-600 hover:text-indigo-600">Education</button>
            <button onClick={() => scrollToSection('contact')} className="block mt-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-center hover:bg-indigo-700">Contact</button>
          </div>
        )}
      </header>

      <main>
        {/* 3D Hero Section */}
        <section id="home" className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden h-screen flex items-center justify-center">
          <canvas ref={heroCanvasRef} className="absolute top-0 left-0 w-full h-full z-1"></canvas>
          <div className="hero-content container mx-auto px-6 text-center relative z-10">
            <div className="w-48 h-48 mx-auto mb-6">
              <img 
                src="https://placehold.co/192x192/E0E0E0/333333?text=SC" 
                alt="Suresh Choudhary" 
                className="rounded-full w-full h-full object-cover shadow-lg border-4 border-white"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Suresh Choudhary</h1>
            <p className="mt-4 text-xl text-gray-300">MERN Stack Developer | Mobile App Developer | AI/ML Enthusiast</p>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition duration-300">Get in Touch</button>
              <a href="#" className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition duration-300">Download CV</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20">
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('about') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>About Me</h2>
            <div className={`max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md transition-all duration-1000 delay-300 ${
              visibleSections.has('about') 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Professional Summary</h3>
              <p className="text-gray-600 mb-6">
                Hi! I'm Suresh Choudhary, a MERN Stack Developer who enjoys creating fast, user-friendly websites and web applications. I specialize in building clean and responsive interfaces using React.js on the frontend, and robust, secure backends with Node.js and Express.js. I manage data efficiently with MongoDB and ensure seamless performance across applications. Alongside web development, I have experience with Python, C, and Java, and I'm currently exploring Machine Learning to develop smart, real-world solutions. I'm passionate about problem-solving, developing impactful projects, and constantly learning new technologies to grow as a developer.
              </p>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Career Objective</h3>
              <p className="text-gray-600">
                Motivated and enthusiastic MCA student seeking an entry-level opportunity in the IT industry to apply academic knowledge and gain hands-on experience. Eager to contribute to team success through hard work, attention to detail, and a passion for learning new technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsSectionRef} className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('skills') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm glow-card shimmer-card transition-all duration-700 delay-100 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Web Development</h3>
                <ul className="space-y-4">
                  <li>HTML & CSS</li>
                  <li>React.js</li>
                  <li>Node.js & Express.js</li>
                  <li>MongoDB</li>
                </ul>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm color-shift-card border-glow transition-all duration-700 delay-200 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Mobile App Development</h3>
                <ul className="space-y-4">
                  <li>Android Studio</li>
                  <li>Java & Kotlin</li>
                  <li>XML & Jetpack Compose</li>
                </ul>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm pulse-glow-card shimmer-card transition-all duration-700 delay-300 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">3D Design & Animation</h3>
                <ul className="space-y-4">
                  <li>Three.js</li>
                  <li>Blender (Basic)</li>
                </ul>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm float-card glow-card transition-all duration-700 delay-400 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-green-700">Programming Languages</h3>
                <ul className="space-y-4">
                  <li>JavaScript</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>C</li>
                </ul>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm color-shift-card pulse-glow-card transition-all duration-700 delay-500 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Database Management</h3>
                <ul className="space-y-4">
                  <li>MySQL</li>
                  <li>SQLite</li>
                  <li>Firebase</li>
                  <li>Supabase</li>
                </ul>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm shimmer-card border-glow transition-all duration-700 delay-600 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-orange-700">Tools & Platforms</h3>
                <div className="space-y-5 mt-4">
                  <SkillBar skill="Git" percentage={80} />
                  <SkillBar skill="GitHub" percentage={75} />
                  <SkillBar skill="Postman" percentage={80} />
                  <SkillBar skill="JWT" percentage={85} />
                  <SkillBar skill="REST APIs" percentage={85} />
                </div>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm float-card pulse-glow-card transition-all duration-700 delay-700 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-4 text-red-700">AI/ML Integration</h3>
                <ul className="space-y-4">
                  <li>TensorFlow Lite (mobile)</li>
                  <li>Gemini API</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20">
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-4 transition-all duration-1000 ${
              visibleSections.has('projects') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>Projects</h2>
            <p className={`text-center text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              visibleSections.has('projects') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>Here are some of my featured projects showcasing my skills and experience.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm glow-card shimmer-card project-card transition-all duration-700 delay-300 hover:scale-105 hover:shadow-lg ${
                visibleSections.has('projects') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <div className="mb-4">
                  <img 
                    src="/portfolio-preview.png" 
                    alt="Portfolio Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">Interactive Portfolio Website</h3>
                <p className="text-gray-600 mb-4">A modern, responsive portfolio website built with React.js featuring 3D animations, interactive UI elements, and dynamic content.</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>React.js</li>
                  <li>Three.js</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm color-shift-card border-glow project-card transition-all duration-700 delay-500 hover:scale-105 hover:shadow-lg ${
                visibleSections.has('projects') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-2 text-purple-700">MERN Stack E-commerce Platform</h3>
                <p className="text-gray-600 mb-4">Full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration.</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>MongoDB</li>
                  <li>Express.js</li>
                  <li>React.js</li>
                  <li>Node.js</li>
                </ul>
              </div>
              
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm pulse-glow-card float-card project-card transition-all duration-700 delay-700 hover:scale-105 hover:shadow-lg ${
                visibleSections.has('projects') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                <h3 className="text-xl font-semibold mb-2 text-green-700">AI-Powered Mobile App</h3>
                <p className="text-gray-600 mb-4">Android application integrating machine learning for real-time object detection and classification using TensorFlow Lite.</p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Android Studio</li>
                  <li>Kotlin</li>
                  <li>TensorFlow Lite</li>
                  <li>Camera API</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Education Section */}
        <section id="education" ref={educationRef} className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('education') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>Education</h2>
            <div className="max-w-2xl mx-auto">
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm mb-6 glow-card shimmer-card transition-all duration-700 delay-300 ${
                visibleSections.has('education') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-700">Master Of Computer Application (MCA)</h3>
                    <p className="text-indigo-600">Ganpat University</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">2024-2026</span>
                </div>
              </div>
              <div className={`bg-gray-50 p-6 rounded-xl shadow-sm pulse-glow-card border-glow transition-all duration-700 delay-500 ${
                visibleSections.has('education') 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-purple-700">B.S.C</h3>
                    <p className="text-indigo-600">Jai Narain Vyas University</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">2022-2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-20">
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
              visibleSections.has('contact') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>Contact Me</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className={`text-center md:text-left transition-all duration-700 delay-300 ${
                  visibleSections.has('contact') 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}>
                  <p className="text-lg text-gray-600 mb-8">Feel free to reach out for any opportunities or just to say hi!</p>
                  <div className="space-y-4">
                    <a href="mailto:patrisureshkumar67338@gmail.com" className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-indigo-600 transition duration-300 text-lg">
                      <i className="fas fa-envelope w-6"></i>
                      <span>patrisureshkumar67338@gmail.com</span>
                    </a>
                    <a href="tel:7014148326" className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-indigo-600 transition duration-300 text-lg">
                      <i className="fas fa-phone w-6"></i>
                      <span>+91 7014148326</span>
                    </a>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 text-lg">
                      <i className="fas fa-map-marker-alt w-6"></i>
                      <span>Sankad, Sanchore, Jalore, Rajasthan - 343040</span>
                    </div>
                  </div>
                </div>

                <div className={`bg-white p-8 rounded-xl shadow-md glow-card shimmer-card transition-all duration-700 delay-500 ${
                  visibleSections.has('contact') 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-10'
                }`}>
                  <h3 className="text-xl font-bold mb-2 text-center">Get In Touch</h3>
                  <p className="text-gray-600 text-center mb-4">Send me a message and I'll get back to you soon!</p>
                  <form className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows="4" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    ></textarea>
                    <button 
                      type="submit" 
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300 text-2xl" aria-label="GitHub Profile">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300 text-2xl" aria-label="LinkedIn Profile">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300 text-2xl" aria-label="Twitter Profile">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <p>&copy; 2024 Suresh Choudhary. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
