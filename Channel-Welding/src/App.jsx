import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Menu, 
  X, 
  Flame, 
  Construction, 
  ShieldCheck, 
  Factory,
  ArrowRight,
  Clock,
  Mail,
  CheckCircle
} from 'lucide-react';

/* --- CONFIGURATION SECTION --- */
const businessDetails = {
  name: "Channel Welding & Fabrication Inc",
  tagline: "LA Approved Structural Steel & Certified Welding",
  phone: "(805) 486-5006",
  cleanPhone: "+18054865006",
  address: "1105 Industrial Ave, Oxnard, CA 93030",
  hours: "Mon - Fri: 7:00 AM - 3:30 PM",
  license: "CA Lic# 863523 | LA Fabricator #FBO2929",
  primaryColor: "#f97316", // Safety Orange
  secondaryColor: "#1f2937", // Dark Slate
  heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1920", // Industrial Welding Sparks
  services: [
    {
      title: "Structural Steel",
      desc: "LA Approved fabrication shop for structural steel projects. We handle beams, columns, and complex frameworks.",
      icon: <Factory className="w-10 h-10 text-orange-500" />
    },
    {
      title: "Certified Welding",
      desc: "Precision welding services for industrial and commercial applications. Certified for high-stress structural work.",
      icon: <Flame className="w-10 h-10 text-orange-500" />
    },
    {
      title: "Ironwork & Fabrication",
      desc: "Custom ironwork, gates, railings, and metal fabrication. We bring architectural designs to life.",
      icon: <Construction className="w-10 h-10 text-orange-500" />
    },
    {
      title: "Sheet Metal Work",
      desc: "Expert sheet metal fabrication and installation for commercial roofing, HVAC, and industrial needs.",
      icon: <ShieldCheck className="w-10 h-10 text-orange-500" />
    }
  ],
  reviews: [
    {
      text: "Wow. I struggled to find a welding shop with talent for a project of mine for so long. A conversation I overheard led me to Channel Welding. Teri Lovado was the owner and...",
      author: "Dean Soto",
      date: "3 years ago"
    },
    {
      text: "Terry and his crew have helped us dial in a couple of jobs lately quickly and accurately. Clean work.",
      author: "Troy Tilkens",
      date: "9 years ago"
    },
    {
      text: "Not only is this place professional they are all about getting it done. Great work great service.",
      author: "Shadow Roofing",
      date: "2 years ago"
    },
    {
      text: "5 Star Review",
      author: "Jimmy Jare",
      date: "4 years ago"
    }
  ]
};

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % businessDetails.reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
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
    <div className="min-h-screen font-sans text-gray-100 bg-gray-900 selection:bg-orange-500 selection:text-white">
      
      {/* --- SUCCESS POPUP --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-800 border border-gray-700 rounded-none p-8 max-w-md w-full shadow-2xl text-center relative">
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
            <p className="text-gray-400 mb-6">
              We'll review your project details and get back to you shortly.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 font-bold text-white bg-orange-600 hover:bg-orange-700 transition uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 border-b border-gray-800 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="p-2 bg-orange-600 rounded-sm">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold leading-none text-white uppercase tracking-tighter">
                  Channel Welding
                </span>
                <span className="text-xs text-orange-500 font-bold tracking-widest uppercase">
                  & Fabrication Inc.
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-gray-300 text-sm uppercase tracking-wide">
              <button onClick={() => scrollToSection('services')} className="hover:text-orange-500 transition">Services</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition">About</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-orange-500 transition">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-orange-500 transition">Contact</button>
              
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="px-6 py-2 border border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition duration-300 uppercase"
              >
                {businessDetails.phone}
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800 p-6 absolute w-full">
            <div className="flex flex-col space-y-6 text-center text-lg font-medium text-gray-300">
              <button onClick={() => scrollToSection('services')} className="py-2 hover:text-orange-500">Services</button>
              <button onClick={() => scrollToSection('about')} className="py-2 hover:text-orange-500">About</button>
              <button onClick={() => scrollToSection('reviews')} className="py-2 hover:text-orange-500">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="py-2 hover:text-orange-500">Contact</button>
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="py-3 bg-orange-600 text-white font-bold justify-center flex items-center gap-2 uppercase"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center pt-20">
        {/* Background Image with Heavy Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={businessDetails.heroImage} 
            alt="Industrial Welding" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/30 mb-8 rounded-sm">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span className="text-orange-400 font-mono text-sm font-bold tracking-wider uppercase">
                {businessDetails.license}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight uppercase tracking-tight">
              Precision <span className="text-orange-500">Steel</span> <br/>
              Fabrication.
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed border-l-4 border-orange-600 pl-6">
              {businessDetails.tagline}. Serving Oxnard's industrial and commercial sectors with certified workmanship since 2005.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 text-lg font-bold text-white bg-orange-600 hover:bg-orange-700 transition duration-300 uppercase tracking-wider"
              >
                Start a Project
              </button>
              <a 
                href="#services"
                className="px-10 py-4 text-lg font-bold text-white border border-gray-600 hover:border-white hover:bg-white/5 transition duration-300 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tight">Capabilities</h2>
              <p className="text-gray-400 max-w-xl">Industrial-grade solutions for complex structural challenges.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessDetails.services.map((service, index) => (
              <div key={index} className="group bg-gray-800 p-8 border border-gray-700 hover:border-orange-500 transition duration-300">
                <div className="mb-6 p-3 bg-gray-900 w-fit rounded-sm group-hover:bg-orange-500/10 transition duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="w-8 h-1 bg-gray-700 group-hover:bg-orange-500 transition duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-orange-500/30 z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1584246689788-3b2c4972fd7e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Steel Fabrication Shop"
                  className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition duration-700"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h4 className="text-orange-500 font-bold tracking-widest uppercase mb-4">About The Company</h4>
              <h2 className="text-4xl font-bold text-white mb-8 leading-tight uppercase">
                Built on Steel. <br/> Driven by Quality.
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Channel Welding & Fabrication Inc. is a premier welding company based in Oxnard, CA. We specialize in high-stakes structural steel fabrication and certified welding for both residential and commercial clients.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our team holds multiple licenses, including the prestigious <span className="text-white font-bold">LA Approved Fabricator</span> certification, ensuring your project meets the strictest safety and quality standards in California.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  "LA Approved Fabricator",
                  "CA Licensed Contractor",
                  "BuildZoom Top 24%",
                  "Structural Steel Specialists"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-900 border-l-4 border-orange-500">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">License Information</p>
                <p className="text-white font-mono text-lg">{businessDetails.license}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-orange-500 text-orange-500" />
              ))}
            </div>
            
            <div className="relative min-h-[200px]">
              {businessDetails.reviews.map((review, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center ${
                    currentReview === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                    "{review.text}"
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="font-bold text-lg text-orange-500 uppercase tracking-wider">{review.author}</div>
                    <div className="text-gray-500 text-sm">{review.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-12">
              {businessDetails.reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-1 transition-all duration-300 ${
                    currentReview === index ? 'bg-orange-500 w-12' : 'bg-gray-700 w-6'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-orange-600/5 skew-y-3 transform origin-bottom-right pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-8 uppercase">Get In Touch</h2>
              <p className="text-gray-400 mb-12 text-lg">
                Ready to start your project? Contact us for a consultation on your structural steel or fabrication needs.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gray-800 rounded-sm">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider mb-1">Location</h5>
                    <span className="text-gray-400 text-lg">{businessDetails.address}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gray-800 rounded-sm">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider mb-1">Phone</h5>
                    <a href={`tel:${businessDetails.cleanPhone}`} className="text-gray-400 text-lg hover:text-orange-500 transition">
                      {businessDetails.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gray-800 rounded-sm">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider mb-1">Hours</h5>
                    <span className="text-gray-400 text-lg">{businessDetails.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-10 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-8 uppercase">Request a Quote</h3>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">Phone or Email</label>
                  <input type="text" name="contact" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition" placeholder="Contact Info" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">Project Details</label>
                  <textarea name="message" rows="4" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition" placeholder="Describe your project..."></textarea>
                </div>
                <button type="submit" className="w-full py-4 font-bold text-white bg-orange-600 hover:bg-orange-700 transition uppercase tracking-wider">
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-12 border-t border-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold uppercase tracking-tighter">Channel Welding</span>
          </div>
          <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">
            Professional structural steel fabrication and certified welding services for Oxnard and the surrounding areas.
          </p>
          <div className="text-gray-700 text-xs">
            <p className="mb-2">&copy; {new Date().getFullYear()} Channel Welding & Fabrication Inc. All rights reserved.</p>
            <p className="mb-2">CA Lic# 863523</p>
            <p>
              Website created by <a href="https://js-oxnard-web.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition underline">JS Web Services</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;