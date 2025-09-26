import React, { useEffect, useRef } from 'react';

const Hero = ({ scrollToSection }) => {
  const heroCanvasRef = useRef(null);

  useEffect(() => {
    let cleanupFn;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.referrerPolicy = "no-referrer";
    script.onload = () => {
      if (!prefersReducedMotion && window.THREE && heroCanvasRef.current) {
        cleanupFn = initThreeJS();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (cleanupFn) cleanupFn();
      document.head.removeChild(script);
    };
  }, []);

  const initThreeJS = () => {
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new window.THREE.WebGLRenderer({
      canvas: heroCanvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particleGroup = new window.THREE.Group();
    scene.add(particleGroup);

    const particleCount = 5000;
    const particles = new window.THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particles.setAttribute(
      "position",
      new window.THREE.BufferAttribute(positions, 3),
    );
    const particleMaterial = new window.THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      blending: window.THREE.AdditiveBlending,
    });
    const particleSystem = new window.THREE.Points(particles, particleMaterial);
    particleGroup.add(particleSystem);

    camera.position.z = 5;

    let mouseX = 0,
      mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId;
    const animate = function () {
      rafId = requestAnimationFrame(animate);
      particleGroup.rotation.y += 0.0005;
      particleGroup.rotation.x += 0.0005;
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    animate();

    // Cleanup function for animation, listeners and WebGL resources
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      try {
        particles.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      } catch {}
    };
  };

  return (
    <section
      id="home"
      className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden h-screen flex items-center justify-center"
    >
      <canvas
        ref={heroCanvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>
      <div className="hero-content container mx-auto px-6 text-center relative z-10">
        <div className="w-48 h-48 mx-auto mb-6">
          <img
            src="https://placehold.co/192x192/E0E0E0/333333?text=SC"
            alt="Suresh Choudhary"
            className="rounded-full w-full h-full object-cover shadow-lg border-4 border-white"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">Suresh Choudhary</h1>
        <p className="mt-4 text-xl text-gray-300">
          MERN Stack Developer | Mobile App Developer | AI/ML Enthusiast | Python Developer
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition duration-300"
          >
            Get in Touch
          </button>
          <a
            href="Suresh Choudhaey CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition duration-300"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
