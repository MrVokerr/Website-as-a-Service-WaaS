import { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Scissors, 
  Bath, 
  Heart, 
  Star, 
  ChevronRight,
  PawPrint,
  Calendar
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const businessDetails = {
    name: "Paws-N-Style",
    phone: "(805) 253-4382",
    email: "goralia901@gmail.com",
    address: "410 W Wooley Rd, Oxnard, CA 93030",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.567890123456!2d-119.123456789012!3d34.123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e84b1234567890%3A0x1234567890abcdef!2s410%20W%20Wooley%20Rd%2C%20Oxnard%2C%20CA%2093030!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
  };

  const reviews = [
    {
      name: "Teri O.",
      text: "The groomer/owner went above and beyond with my 10 year old Corgi. Queenie was a mess when I dropped her off. The groomer took such care and time with my dog I barely recognized her!",
      stars: 5
    },
    {
      name: "Juan M.",
      text: "Extremely happy with our pups medium teddy bear style and cut. This was his first visit to Paws N Style.",
      stars: 5
    },
    {
      name: "Ashley C.",
      text: "She is the BEST!!!! She handled my baby so good while him being nervous. She knows how to gain dogs trust and is friendly too!",
      stars: 5
    },
    {
      name: "Reyna M.",
      text: "One thing I have to say is the owner Oralia is the best!! If you are looking for a great groomer with knowledge, patience and trust this is the place to come.",
      stars: 5
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setShowSuccessModal(true);
        e.target.reset();
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="font-sans text-gray-700 bg-[#fff5f7] overflow-x-hidden">
      
      {/* --- FLOATING NAV --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`bg-white/90 backdrop-blur-md rounded-full shadow-lg px-6 py-3 flex justify-between items-center border border-pink-100 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-xl'}`}>
            <div className="flex items-center gap-2">
              <div className="bg-pink-500 p-2 rounded-full text-white">
                <PawPrint className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight">Paws-N-Style</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 font-semibold text-gray-600 text-sm">
              <a href="#services" className="hover:text-pink-500 transition-colors">Services</a>
              <a href="#about" className="hover:text-pink-500 transition-colors">About</a>
              <a href="#reviews" className="hover:text-pink-500 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-pink-500 transition-colors">Contact</a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a 
                href={`tel:${businessDetails.phone.replace(/[^0-9]/g, '')}`}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-pink-500 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {businessDetails.phone}
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full px-4 mt-2 md:hidden">
            <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4 text-center font-semibold text-gray-600 border border-pink-100">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Reviews</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (Split Layout) --- */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-6 animate-bounce">
              🐾 Voted Best Groomer in Oxnard
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              We Speak <br/>
              <span className="text-pink-500 relative inline-block">
                Dog & Cat
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-pink-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional grooming with a gentle touch. We treat your furry family members like our own, ensuring a stress-free spa day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold text-lg shadow-lg shadow-pink-500/30 hover:bg-pink-600 hover:scale-105 transition-all">
                Book a Spa Day
              </a>
              <a href="#services" className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-full font-bold text-lg hover:border-pink-200 hover:text-pink-500 transition-all">
                View Services
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 blob-shape overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop" 
                alt="Happy Dog" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-pulse">
              <div className="bg-green-100 p-2 rounded-full">
                <Star className="w-6 h-6 text-green-600 fill-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">5.0 Stars</p>
                <p className="text-xs text-gray-500">On Yelp & Google</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES (Bento Grid) --- */}
      <section id="services" className="py-24 bg-white rounded-t-[3rem] relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pampering Menu</h2>
            <p className="text-gray-500 text-lg">Everything your pet needs to look and feel their best.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-blue-50 p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 rotate-3">
                <Scissors className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Full Grooming</h3>
              <p className="text-gray-600 leading-relaxed">
                Breed-specific cuts, styling, and trims. Includes bath, blow-dry, and nail filing.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-pink-50 p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 border border-pink-100 md:mt-8">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 -rotate-3">
                <Bath className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Luxury Bath</h3>
              <p className="text-gray-600 leading-relaxed">
                Deep cleaning shampoo, conditioning treatment, and blueberry facials for fresh faces.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-purple-50 p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 border border-purple-100">
              <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-6 rotate-3">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Special Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Extra patience for puppies, seniors, and pets with anxiety. We take our time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT (Wavy Divider) --- */}
      <section id="about" className="py-24 bg-[#fff5f7] relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?q=80&w=2070&auto=format&fit=crop" 
                alt="Grooming Tools" 
                className="rounded-3xl w-full h-80 object-cover shadow-lg rotate-2 hover:rotate-0 transition-all"
              />
            </div>
            <div className="md:w-1/2">
              <h4 className="text-pink-500 font-bold uppercase tracking-wider mb-2">About Us</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">More Than Just a Haircut</h2>
              <p className="text-gray-600 mb-6 text-lg">
                At Paws-N-Style, we believe grooming should be a positive experience. Owner Oralia specializes in handling nervous pets and seniors with the gentle touch they deserve.
              </p>
              <ul className="space-y-3 mb-8">
                {['Cage-free options available', 'Hypoallergenic products', 'One-on-one attention'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <PawPrint className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS (Masonry Grid) --- */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Wall of Love</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl hover:bg-pink-50 transition-colors border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT (Postcard Style) --- */}
      <section id="contact" className="py-24 bg-[#fff5f7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl grid md:grid-cols-2">
            
            {/* Info Side */}
            <div className="p-10 md:p-16 text-white flex flex-col justify-between bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div>
                <h2 className="text-3xl font-bold mb-8">Visit Our Salon</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-pink-500 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg">Address</h3>
                      <p className="text-gray-400">{businessDetails.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-pink-500 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg">Phone</h3>
                      <p className="text-gray-400">{businessDetails.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-pink-500 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg">Hours</h3>
                      <p className="text-gray-400">Mon-Sat: 8am - 7pm</p>
                      <p className="text-gray-500 text-sm">Sunday Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Paws-N-Style. <br/>
                  Website by <a href="https://js-oxnard-web.netlify.app/" className="text-pink-500 hover:underline">JS Web Services</a>
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-white p-10 md:p-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Appointment</h3>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                  <input type="text" name="name" required className="w-full px-6 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-pink-500 focus:bg-white transition-all outline-none" placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                  <input type="text" name="contact" required className="w-full px-6 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-pink-500 focus:bg-white transition-all outline-none" placeholder="(805) 555-0123" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Pet Details</label>
                  <input type="text" name="pet" className="w-full px-6 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-pink-500 focus:bg-white transition-all outline-none" placeholder="Breed, Age, Name..." />
                </div>

                <button type="submit" className="w-full py-4 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 hover:shadow-lg hover:-translate-y-1 transition-all">
                  Send Request
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full relative animate-bounce-in text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PawPrint className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
            <p className="text-gray-600 mb-8">
              We'll check our schedule and get back to you shortly to confirm your appointment.
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;