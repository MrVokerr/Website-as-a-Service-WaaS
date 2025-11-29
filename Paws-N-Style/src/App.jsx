import React, { useState } from 'react';
import PawPrint from 'lucide-react/dist/esm/icons/paw-print';
import Scissors from 'lucide-react/dist/esm/icons/scissors';
import ShowerHead from 'lucide-react/dist/esm/icons/shower-head';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import X from 'lucide-react/dist/esm/icons/x';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    {
      icon: <Scissors className="w-12 h-12 mx-auto mb-4 text-rose-500" />,
      title: 'Stylish Haircuts',
      description: 'From teddy bear clips to breed-specific styles, we do it all. We give your pup a fresh, clean, and comfortable new look.',
    },
    {
      icon: <ShowerHead className="w-12 h-12 mx-auto mb-4 text-rose-500" />,
      title: 'Deep Cleaning Baths',
      description: 'Our deep cleaning baths include high-quality shampoos, nail trimming, and ear cleaning, leaving your pet feeling refreshed.',
    },
    {
      icon: <Sparkles className="w-12 h-12 mx-auto mb-4 text-rose-500" />,
      title: 'Flea & Tick Treatments',
      description: 'We offer safe and effective flea and tick treatments to keep your furry friend healthy and itch-free.',
    },
     {
      icon: <PawPrint className="w-12 h-12 mx-auto mb-4 text-rose-500" />,
      title: 'Paw-dicures',
      description: 'Keep your pet\'s paws healthy with our nail trimming and filing services. We\'ll have them walking comfortably in no time.',
    },
  ];

  const reviews = [
    {
      quote: 'The groomer/owner went above and beyond the call of duty with my 10 year old bitchy Corgi Queenie. The care and love of dogs (even an ornery one) was exceptional. I will be back!',
      author: 'Teri O.',
    },
    {
      quote: 'Extremely happy with our pups medium teddy bear style and cut. This was his first visit to Paws N Style.',
      author: 'Juan M.',
    },
    {
      quote: 'She is the BEST!!!! She handled my baby so good while him being nervous... She knows how to gain dogs trust and is friendly too! He\'s so happy too!',
      author: 'Ashley C.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = e.target;
    const formData = new FormData(myForm);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setIsModalOpen(true))
      .catch((error) => alert(error));
  };


  return (
    <div className="bg-slate-50 text-slate-700 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-rose-500">
              <PawPrint className="w-8 h-8" />
              <span>Paws-N-Style</span>
            </a>
            <div className="hidden md:flex space-x-8">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-slate-600 hover:text-rose-500 transition-colors duration-300 font-medium">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-rose-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-rose-500 transition-colors duration-300 font-medium">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center text-white py-32 md:py-48"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590822497492-3939241f39f3?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-slate-800/60"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              Your Pet's Happy Place
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-rose-100">
              Professional grooming with a gentle, loving touch. We treat your furry friends like family.
            </p>
            <a href="#contact" className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300">
              Book a Groom
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800">Our Services</h2>
              <p className="mt-4 text-lg text-slate-600">Top-quality care for your beloved pets.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(service => (
                <div key={service.title} className="bg-slate-50 p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300">
                  {service.icon}
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:pr-8">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">About Paws-N-Style</h2>
                <p className="text-lg text-slate-600 mb-4">
                  Paws-N-Style is a premier pet grooming salon in Oxnard, CA, founded by Oralia, a passionate animal lover with years of experience. We believe in providing a safe, comfortable, and stress-free environment for every pet that walks through our door.
                </p>
                <p className="text-lg text-slate-600">
                  Our mission is to provide top-notch grooming services while ensuring the well-being of your furry companions. We use only high-quality, pet-safe products and tailor our services to meet the individual needs of each pet.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1554624388-9c8a8f15b8b9?q=80&w=1974&auto=format&fit=crop"
                  alt="Groomer with a happy dog" 
                  className="rounded-2xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800">Happy Pups, Happy Parents</h2>
              <p className="mt-4 text-lg text-slate-600">See what our clients are saying about us.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map(review => (
                <div key={review.author} className="bg-slate-50 p-8 rounded-2xl shadow-sm">
                  <p className="text-slate-600 mb-4 italic">"{review.quote}"</p>
                  <p className="font-bold text-right text-rose-500">- {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Ready to pamper your pet? Send us a message to book an appointment or ask any questions. We look forward to hearing from you!
                </p>
                <div className="space-y-4">
                  <p className="flex items-center"><PawPrint className="w-5 h-5 mr-3 text-rose-500" />410 W Wooley Rd, Oxnard, CA 93030</p>
                  <p className="flex items-center"><PawPrint className="w-5 h-5 mr-3 text-rose-500" />(805) 253-4382</p>
                  <p className="flex items-center"><PawPrint className="w-5 h-5 mr-3 text-rose-500" />goralia901@gmail.com</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-slate-700 font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-slate-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" required />
                  </div>
                   <div className="mb-4">
                    <label htmlFor="phone" className="block text-slate-700 font-bold mb-2">Phone</label>
                    <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-slate-700 font-bold mb-2">Message</label>
                    <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500" required></textarea>
                  </div>
                  <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Paws-N-Style. All Rights Reserved.</p>
          <p className="mt-2 text-sm">Website created by <a href="https://js-oxnard-web.netlify.app" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline">js-oxnard-web</a></p>
        </div>
      </footer>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
                <X size={24} />
            </button>
            <PawPrint className="w-16 h-16 mx-auto mb-4 text-rose-500" />
            <h3 className="text-2xl font-bold mb-2 text-slate-800">Thank You!</h3>
            <p className="text-slate-600">Your message has been sent successfully. We'll get back to you soon!</p>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="mt-6 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
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
