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
  tagline: "Expert Landscaping & Garden Care in Oxnard",
  phone: "(805) 368-6536",
  email: "philsgardenservices2@gmail.com",
  address: "1324 Evita Pl, Oxnard, CA 93030",
  hours: "Open 24 Hours",
  primaryColor: "#166534", // Forest Green
  accentColor: "#f0fdf4", // Light Green background
  heroImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=1920", // Manicured garden/lawn
  services: [
    {
      title: "Landscape Design",
      desc: "Transform your outdoor space with custom garden layouts, planting schemes, and hardscaping.",
      icon: <TreePine className="w-12 h-12 text-white" />
    },
    {
      title: "Lawn Maintenance",
      desc: "Regular mowing, edging, and fertilization to keep your grass green and healthy year-round.",
      icon: <Flower2 className="w-12 h-12 text-white" />
    },
    {
      title: "Yard Cleanup",
      desc: "Complete property restoration including weed removal, pruning, and green waste hauling.",
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      
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
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a 
                href={`tel:${businessDetails.phone}`}
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
              <a 
                href={`tel:${businessDetails.phone}`}
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
              href={`tel:${businessDetails.phone}`}
              className="px-8 py-4 text-lg font-bold rounded-lg bg-white text-gray-900 shadow-xl hover:bg-gray-100 transition"
            >
              {businessDetails.phone}
            </a>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-20 bg-gray-50">
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
                <button className="mt-6 flex items-center text-sm font-bold hover:underline" style={{ color: businessDetails.primaryColor }}>
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT / LOCAL SECTION --- */}
      <section id="about" className="py-20">
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
                Your Local Landscaping Experts
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Located right on Evita Pl, we are proud to serve our Oxnard community. We understand the local climate and soil conditions, ensuring your garden thrives in the coastal air.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Available 24 Hours a Day",
                  "Professional & Reliable Team",
                  "Residential & Commercial Services",
                  "Free On-Site Estimates"
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
      <section id="reviews" className="py-20" style={{ backgroundColor: businessDetails.accentColor }}>
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

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
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
              <p className="text-gray-400 mb-6">
                Professional, reliable landscaping services for the entire Oxnard community. 
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 mt-1 shrink-0" />
                  <span>{businessDetails.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 shrink-0" />
                  <a href={`tel:${businessDetails.phone}`} className="hover:text-white transition">{businessDetails.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 shrink-0" />
                  <a href={`mailto:${businessDetails.email}`} className="hover:text-white transition break-all">{businessDetails.email}</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Business Hours</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="font-semibold text-white">{businessDetails.hours}</span>
                </li>
                <li className="text-sm text-gray-400 mt-2">
                  Available for emergency services and scheduled maintenance.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 {businessDetails.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;