import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Menu, 
  X, 
  Hammer, 
  Truck, 
  Wrench, 
  Home,
  CheckCircle,
  ArrowRight,
  Clock,
  Mail,
  TreePine
} from 'lucide-react';

/* --- CONFIGURATION SECTION ---
   Updated with details from the Google Business Profile image & email
*/
const businessDetails = {
  name: "Haulin Handyman",
  tagline: "Expert Home Repairs, Moving & Remodeling in Oxnard",
  phone: "(805) 793-6231",
  cleanPhone: "+18057936231",
  email: "contact@haulinhandymanj.com",
  address: "1011 W Olive St, Oxnard, CA 93033",
  hours: "Mon - Sun: 7:00 AM - 6:00 PM",
  primaryColor: "#1e40af", // Trustworthy Blue
  accentColor: "#eff6ff", // Light Blue background
  heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920", // Woodworking/Construction
  services: [
    {
      title: "Assembly & Installation",
      desc: "Expert furniture assembly, appliance installation, and general handyman installations for your home.",
      icon: <Hammer className="w-12 h-12 text-white" />
    },
    {
      title: "Repairs & Plumbing",
      desc: "Comprehensive repair services including flooring, appliances, and plumbing installation or replacement.",
      icon: <Wrench className="w-12 h-12 text-white" />
    },
    {
      title: "Remodeling & Tile",
      desc: "Professional tile installation, bathroom remodeling, roofing, and flooring replacement services.",
      icon: <Home className="w-12 h-12 text-white" />
    }
  ],
  reviews: [
    {
      text: "Great movers, they cleared left over items from my estate sale for a way less of price than others and the service was A+",
      author: "Joseph Montez",
      date: "a year ago"
    },
    {
      text: "The team that was sent handled everything i needed moved with extreme care and did so in a productive manner, i appreciate the respectful and kind people who helped me get my items moved from one house to another I would definitely recommend again",
      author: "John Covarrubias",
      date: "2 years ago"
    },
    {
      text: "Great Handyman and best Prices!!",
      author: "Tony Fletcher",
      date: "5 months ago"
    },
    {
      text: "Positive: Responsiveness, Punctuality, Quality, Professionalism, Value. Services: General construction",
      author: "Chris Shertzer",
      date: "2 years ago"
    }
  ]
};

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % businessDetails.reviews.length);
    }, 5000);
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
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-blue-600" />
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
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-serif font-bold leading-none text-white drop-shadow-md">
                  {businessDetails.name}
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 font-medium text-white/90">
              <button onClick={() => scrollToSection('services')} className="hover:text-white transition border-b-2 border-transparent hover:border-white pb-1">Services</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition border-b-2 border-transparent hover:border-white pb-1">About Us</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-white transition border-b-2 border-transparent hover:border-white pb-1">Reviews</button>
              <button onClick={() => scrollToSection('contact-info')} className="hover:text-white transition border-b-2 border-transparent hover:border-white pb-1">Contact</button>
              
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="px-6 py-2 border-2 border-white rounded-none font-bold text-white hover:bg-white hover:text-gray-900 transition duration-300"
              >
                Call Now
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
          <div className="md:hidden bg-gray-900 text-white p-6 absolute w-full">
            <div className="flex flex-col space-y-6 text-center text-lg">
              <button onClick={() => scrollToSection('services')} className="py-2">Services</button>
              <button onClick={() => scrollToSection('about')} className="py-2">About Us</button>
              <button onClick={() => scrollToSection('reviews')} className="py-2">Reviews</button>
              <button onClick={() => scrollToSection('contact-info')} className="py-2">Contact</button>
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="py-3 border border-white font-bold text-white justify-center flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call {businessDetails.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={businessDetails.heroImage} 
            alt="Handyman Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border-l-4 border-blue-500 mb-8">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium tracking-wider uppercase">Serving Oxnard & Ventura County</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Reliable Handyman & <br/> Hauling Services.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed border-l-2 border-gray-500 pl-6">
              {businessDetails.tagline}. We handle everything from moving to remodeling with professional care.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 text-lg font-bold text-gray-900 bg-white hover:bg-gray-100 transition duration-300"
              >
                Get a Free Quote
              </button>
              <a 
                href={`tel:${businessDetails.cleanPhone}`}
                className="px-10 py-4 text-lg font-bold text-white border-2 border-white hover:bg-white hover:text-gray-900 transition duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {businessDetails.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-gray-900 text-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-700 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h2>
              <p className="text-gray-400 max-w-xl">Professional solutions for every corner of your home.</p>
            </div>
            <div className="hidden md:block">
              <button onClick={() => scrollToSection('contact')} className="text-blue-400 hover:text-white transition flex items-center gap-2 font-bold">
                View All Services <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessDetails.services.map((service, index) => (
              <div key={index} className="group bg-gray-800 p-10 hover:bg-gray-700 transition duration-500 border-t-4 border-transparent hover:border-blue-500">
                <div className="mb-8 text-blue-400 group-hover:text-white transition duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300">
                  {service.desc}
                </p>
                <a href="#contact" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-white border-b border-blue-500 pb-1 hover:border-white transition">
                  Get a Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT / LOCAL SECTION --- */}
      <section id="about" className="py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-100 rounded-full z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000" 
                alt="Oxnard Handyman Project"
                className="relative z-10 w-full h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 z-20 bg-white p-6 shadow-xl max-w-xs border-l-4 border-blue-600">
                <p className="font-bold text-lg text-gray-900 mb-1">Based in Oxnard</p>
                <p className="text-gray-500 text-sm">Serving our local community with pride since 2019.</p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h4 className="text-blue-600 font-bold tracking-widest uppercase mb-4">About Us</h4>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-gray-900 leading-tight">
                Building Trust, <br/> One Project at a Time.
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are dynamic and diverse family ran business. We are capable of handling any type of situation, from helping you move to remodeling your bathroom, tile work, flooring, roofing and much more.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Located at 1011 W Olive St, we pride ourselves on being a local service provider that offers a wide range of handyman services to assist with various household tasks and projects.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  "Family Owned & Operated",
                  "Verified by Business",
                  "Versatile Services",
                  "Free Estimates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href={`mailto:${businessDetails.email}`}
                className="inline-block px-8 py-4 bg-gray-900 text-white font-bold hover:bg-gray-800 transition duration-300"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="reviews" className="py-20 scroll-mt-24" style={{ backgroundColor: businessDetails.accentColor }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">What Our Clients Say</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-lg text-center relative">
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <div className="relative grid grid-cols-1">
              {businessDetails.reviews.map((review, index) => (
                <div 
                  key={index} 
                  className={`col-start-1 row-start-1 transition-opacity duration-500 flex flex-col items-center ${
                    currentReview === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-medium mb-6 text-gray-800 italic leading-relaxed">
                    "{review.text}"
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="font-bold text-lg text-gray-900">{review.author}</div>
                    <div className="text-gray-500 text-sm">{review.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8 relative z-20">
              {businessDetails.reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentReview === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
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
                  <a href={`tel:${businessDetails.cleanPhone}`} className="text-lg font-semibold hover:text-blue-700 transition">
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
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex justify-between text-sm md:text-base border-b border-gray-100 pb-1 last:border-0">
                        <span className="font-medium text-gray-700">{day}</span>
                        <span className="font-bold text-gray-900">7:00 AM - 6:00 PM</span>
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
                src="https://maps.google.com/maps?q=1011+W+Olive+St,+Oxnard,+CA+93033&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title={`${businessDetails.name} Location`}
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
                  <Hammer className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{businessDetails.name}</span>
              </div>
              <p className="text-gray-400 mb-8">
                Professional, reliable handyman services for the entire Oxnard community. 
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPin className="w-6 h-6 mt-1 shrink-0 text-blue-500" />
                  <div>
                    <h5 className="font-bold text-white">Address</h5>
                    <span>{businessDetails.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <Phone className="w-6 h-6 mt-1 shrink-0 text-blue-500" />
                  <div>
                    <h5 className="font-bold text-white">Phone</h5>
                    <a href={`tel:${businessDetails.cleanPhone}`} className="hover:text-white transition">{businessDetails.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <Mail className="w-6 h-6 mt-1 shrink-0 text-blue-500" />
                  <div>
                    <h5 className="font-bold text-white">Email</h5>
                    <a href={`mailto:${businessDetails.email}`} className="hover:text-white transition break-all">{businessDetails.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300">
                  <Clock className="w-6 h-6 mt-1 shrink-0 text-blue-500" />
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
                  <input type="text" name="name" id="name" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-400 mb-1">Phone or Email</label>
                  <input type="text" name="contact" id="contact" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition" placeholder="Your Phone or Email" />
                  {formError && <p className="text-red-400 text-sm mt-1">{formError}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea name="message" id="message" rows="4" required className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition" placeholder="How can we help you?"></textarea>
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