import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Menu, 
  X, 
  TreePine, 
  Shovel, 
  Flower2, 
  CheckCircle,
  ArrowRight,
  Clock,
  Mail
} from 'lucide-react';

/* --- CONFIGURATION SECTION ---
   Updated with details from the Google Business Profile image & email
*/
const businessDetails = {
  name: "Phil's Gardening | Landscaping",
  tagline: "Exceptional Landscaping Services in Oxnard, California",
  phone: "+1 (805) 368-6536",
  cleanPhone: "+18053686536",
  email: "philsgardenservices2@gmail.com",
  address: "1324 Evita Pl, Oxnard, CA 93030",
  hours: "Open 24 Hours",
  primaryColor: "#166534", // Forest Green
  accentColor: "#f0fdf4", // Light Green background
  heroImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=1920", // Manicured garden/lawn
  services: [
    {
      title: "Garden Design",
      desc: "Transform your outdoor space with custom garden layouts, vibrant flower beds, and planting schemes.",
      icon: <TreePine className="w-12 h-12 text-white" />
    },
    {
      title: "Lawn Maintenance",
      desc: "Regular mowing, edging, and fertilization to keep your grass green and healthy year-round.",
      icon: <Flower2 className="w-12 h-12 text-white" />
    },
    {
      title: "Irrigation Solutions",
      desc: "Installation of efficient watering systems and sustainable practices to benefit both clients and the planet.",
      icon: <Shovel className="w-12 h-12 text-white" />
    }
  ],
  testimonial: {
    text: "Phil's team transformed our front yard completely. They were professional, arrived on time, and the attention to detail with the new flower beds was amazing. Best gardening service in Oxnard!",
    author: "Maria R.",
    location: "Oxnard, CA"
  }
};

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    const formData = new FormData(e.target);
    const contactValue = formData.get('contact');

    // Validation Logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = contactValue.replace(/\D/g, '');
    const isPhone = phoneDigits.length >= 10 && phoneDigits.length <= 11;

    if (!emailRegex.test(contactValue) && !isPhone) {
      setFormError("Please enter a valid email address or phone number (10-11 digits).");
      return;
    }
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setShowSuccess(true);
        e.target.reset();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      
      {/* --- SUCCESS POPUP --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative animate-scale-up">
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your message was sent successfully. We will be in contact shortly about your quote.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 rounded-lg font-bold text-white transition hover:brightness-110"
              style={{ backgroundColor: businessDetails.primaryColor }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: businessDetails.primaryColor }}
              >
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold leading-none text-gray-900">
                  Phil's Gardening
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  | LANDSCAPING
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
              <button onClick={() => scrollToSection('services')} className="hover:text-green-700 transition">Services</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-green-700 transition">About Us</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-green-700 transition">Reviews</button>
              <button onClick={() => scrollToSection('contact-info')} className="hover:text-green-700 transition">Contact</button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: businessDetails.primaryColor }}
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-xl absolute w-full">
            <div className="flex flex-col space-y-4 text-center">
              <button onClick={() => scrollToSection('services')} className="py-2">Services</button>
              <button onClick={() => scrollToSection('about')} className="py-2">About Us</button>
              <button onClick={() => scrollToSection('reviews')} className="py-2">Reviews</button>
              <button onClick={() => scrollToSection('contact-info')} className="py-2">Contact</button>
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="py-3 rounded-lg font-bold text-white justify-center flex items-center gap-2"
                style={{ backgroundColor: businessDetails.primaryColor }}
              >
                <Phone className="w-4 h-4" />
                Call {businessDetails.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 flex items-center min-h-[600px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={businessDetails.heroImage} 
            alt="Beautiful Garden Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 animate-fade-in-up">
            <MapPin className="w-4 h-4 text-green-300" />
            <span className="text-sm font-medium">Serving Oxnard & Ventura County</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Bring Your Dream <br className="hidden md:block"/> Garden to Life.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            {businessDetails.tagline}. Quality workmanship, reliable service, and 24/7 availability for all your landscaping needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 text-lg font-bold rounded-lg text-white shadow-xl transition hover:brightness-110"
              style={{ backgroundColor: businessDetails.primaryColor }}
            >
              Get a Free Quote
            </button>
            <a 
              href={`tel:${businessDetails.cleanPhone}`}
              className="px-8 py-4 text-lg font-bold rounded-lg bg-white text-gray-900 shadow-xl hover:bg-gray-100 transition"
            >
              {businessDetails.phone}
            </a>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: businessDetails.primaryColor }}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessDetails.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-md transform -rotate-3"
                  style={{ backgroundColor: businessDetails.primaryColor }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
                <a href="#contact" className="mt-6 flex items-center text-sm font-bold hover:underline" style={{ color: businessDetails.primaryColor }}>
                  Get a Quote <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT / LOCAL SECTION --- */}
      <section id="about" className="py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000" 
                  alt="Oxnard Landscaping Project"
                  className="w-full h-[400px] object-cover"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white"
                >
                  <p className="font-bold text-lg flex items-center gap-2">
                    <MapPin className="text-green-400" /> Based in Oxnard, CA
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Experienced, qualified, and certified, Phil's Gardening Services has set itself apart as the area's leading local landscaper. Ours is a business founded on a simple premise: To give excellent service at a fair price.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Located at 1324 Evita Pl, we have built a strong reputation within the Oxnard community. From planting vibrant flower beds to installing efficient watering systems, we transform ordinary yards into stunning landscapes using sustainable practices that benefit both clients and the planet.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Commitment to Quality & Sustainability",
                  "Residential & Commercial Services",
                  "Attention to Detail & Customer Satisfaction",
                  "Free Estimates - Call Today!"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <a 
                href={`mailto:${businessDetails.email}`}
                className="inline-block px-6 py-3 rounded-lg font-bold border-2 transition hover:bg-green-50"
                style={{ borderColor: businessDetails.primaryColor, color: businessDetails.primaryColor }}
              >
                Contact Us via Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="reviews" className="py-20 scroll-mt-24" style={{ backgroundColor: businessDetails.accentColor }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-lg text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              "{businessDetails.testimonial.text}"
            </h3>
            <div className="flex flex-col items-center">
              <div className="font-bold text-lg text-gray-900">{businessDetails.testimonial.author}</div>
              <div className="text-gray-500 text-sm">{businessDetails.testimonial.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT INFO SECTION --- */}
      <section id="contact-info" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Info */}
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="w-6 h-6 mt-1 shrink-0 text-gray-400" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <a href={`tel:${businessDetails.cleanPhone}`} className="text-lg font-semibold hover:text-green-700 transition">
                    {businessDetails.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 mt-1 shrink-0 text-gray-400" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {businessDetails.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <Clock className="w-6 h-6 mt-1 shrink-0 text-gray-400" />
                <div className="w-full">
                  <h3 className="font-bold text-gray-900 mb-3">Business Hours</h3>
                  <div className="space-y-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <div key={day} className="flex justify-between text-sm md:text-base border-b border-gray-100 pb-1 last:border-0">
                        <span className="font-medium text-gray-700">{day}</span>
                        <span className="font-bold text-gray-900">Open 24 Hours</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Map */}
            <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative bg-gray-100">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?q=1324+Evita+Pl,+Oxnard,+CA+93030&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Phil's Gardening Location"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-gray-900 text-white py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div 
                  className="p-1.5 rounded"
                  style={{ backgroundColor: businessDetails.primaryColor }}
                >
                  <TreePine className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{businessDetails.name}</span>
              </div>
              <p className="text-gray-400 mb-8">
                Professional, reliable landscaping services for the entire Oxnard community. 
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPin className="w-6 h-6 mt-1 shrink-0 text-green-500" />
                  <div>
                    <h5 className="font-bold text-white">Address</h5>
                    <span>{businessDetails.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <Phone className="w-6 h-6 mt-1 shrink-0 text-green-500" />
                  <div>
                    <h5 className="font-bold text-white">Phone</h5>
                    <a href={`tel:${businessDetails.cleanPhone}`} className="hover:text-white transition">{businessDetails.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <Mail className="w-6 h-6 mt-1 shrink-0 text-green-500" />
                  <div>
                    <h5 className="font-bold text-white">Email</h5>
                    <a href={`mailto:${businessDetails.email}`} className="hover:text-white transition break-all">{businessDetails.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <Clock className="w-6 h-6 mt-1 shrink-0 text-green-500" />
                  <div>
                    <h5 className="font-bold text-white">Hours</h5>
                    <span>{businessDetails.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Get a Free Quote</h3>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input type="text" name="name" id="name" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-400 mb-1">Phone or Email</label>
                  <input type="text" name="contact" id="contact" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition" placeholder="Your Phone or Email" />
                  {formError && <p className="text-red-400 text-sm mt-1">{formError}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea name="message" id="message" rows="4" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 rounded-lg font-bold text-white shadow-lg hover:brightness-110 transition" style={{ backgroundColor: businessDetails.primaryColor }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p className="mb-2">&copy; {new Date().getFullYear()} {businessDetails.name}. All rights reserved.</p>
            <p>
              Website created by <a href="https://js-oxnard-web.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition underline">JS Web Services</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;