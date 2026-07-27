 import React, { useState, useEffect } from 'react';

const Contact = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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

  // Validation helpers
  const validateField = (name, value) => {
    const v = value.trim();
    switch (name) {
      case "name": {
        if (!v) return "Name is required.";
        if (v.length < 2) return "Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(v)) return "Use letters, spaces, and .'- only.";
        return "";
      }
      case "email": {
        if (!v) return "Email is required.";
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRe.test(v)) return "Enter a valid email address.";
        return "";
      }
      case "message": {
        if (!v) return "Message is required.";
        if (v.length < 10) return "Message must be at least 10 characters.";
        return "";
      }
      default:
        return "";
    }
  };

  const validateAll = (data) => ({
    name: validateField("name", data.name),
    email: validateField("email", data.email),
    message: validateField("message", data.message),
  });

  const isFormValid =
    !validateAll(formData).name &&
    !validateAll(formData).email &&
    !validateAll(formData).message &&
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    if (submitMessage) setSubmitMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    const currentErrors = validateAll(payload);
    setErrors(currentErrors);
    if (currentErrors.name || currentErrors.email || currentErrors.message) {
      setIsSubmitting(false);
      setSubmitMessage("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let serverMessage = "";
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          const data = await response.json();
          if (typeof data?.message === "string") {
            serverMessage = data.message;
          }
        } catch {}
      }

      if (response.ok) {
        setSubmitMessage(
          serverMessage || "Message sent successfully! Thank you for reaching out.",
        );
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(
          serverMessage || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Contact Me
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div
              className={`text-center md:text-left transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <p className="text-lg text-gray-600 mb-8">
                Feel free to reach out for any opportunities or just to say
                hi!
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:patelsureshkumar67338@gmail.com"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-indigo-600 transition duration-300 text-lg"
                >
                  <i className="fas fa-envelope w-6"></i>
                  <span>patelsureshkumar67338@gmail.com</span>
                </a>
                <a
                  href="tel:7014148326"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-indigo-600 transition duration-300 text-lg"
                >
                  <i className="fas fa-phone w-6"></i>
                  <span>+91 7014148326</span>
                </a>
                <a
                  href="https://www.instagram.com/suresh_pate.9650?igsh=MWxqd2I4ZGphb3BiZQ=="
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-indigo-600 transition duration-300 text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram w-6"></i>
                  <span>Suresh_choudhary.9650</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/iGaY89zsd9izfm8a7"
                  className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-indigo-600 transition duration-300 text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-map-marker-alt w-6"></i>
                  <span>Sankad, Sanchore, Jalore, Rajasthan - 343040</span>
                </a>
                
              </div>
            </div>

            <div
              className={`bg-white p-8 rounded-xl shadow-md glow-card shimmer-card transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-xl font-bold mb-2 text-center">
                Get In Touch
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Send me a message and I'll get back to you soon!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    required
                    className={`w-full p-3 border rounded-lg focus:ring-2 transition ${
                      errors.name
                        ? "border-red-500 focus:ring-red-400 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    maxLength={80}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    required
                    className={`w-full p-3 border rounded-lg focus:ring-2 transition ${
                      errors.email
                        ? "border-red-500 focus:ring-red-400 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    maxLength={254}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows="4"
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                    required
                    className={`w-full p-3 border rounded-lg focus:ring-2 transition ${
                      errors.message
                        ? "border-red-500 focus:ring-red-400 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    maxLength={1000}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
                {submitMessage && (
                  <div
                    className={`p-3 rounded-lg text-center ${
                      submitMessage.includes("successfully")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
