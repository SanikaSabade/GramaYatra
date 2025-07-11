'use client'; 

import { Home, Leaf, Users, Compass, CheckCircle, Globe } from 'lucide-react';

const Welcome = ({ setCurrentPage }) => {
  return (
    <main className="container mx-auto px-4 py-12">
      <section
        className="relative bg-cover bg-center h-[450px] md:h-[600px] rounded-3xl shadow-2xl flex items-center justify-center text-center p-8 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://placehold.co/1400x700/6B8E23/FFFFFF?text=Authentic+Rural+India')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-3xl"></div>
        <div className="relative z-10 text-white max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight font-inter drop-shadow-lg">
            Immerse Yourself in India's Village Soul
          </h2>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-medium opacity-90">
            Discover authentic homestays, vibrant traditions, and sustainable adventures.
          </p>
          <button
            onClick={() => setCurrentPage('experiences')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-xl border-2 border-white focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Explore Experiences
          </button>
        </div>
      </section>

      <section className="py-16">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800 font-inter">
          Why Choose Villagestay?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center border border-gray-200">
            <Home size={60} className="text-green-600 mx-auto mb-6 drop-shadow-md" />
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">
              Authentic Village Stays
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Experience genuine hospitality, local cuisine, and traditional living in hand-picked
              village homes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center border border-gray-200">
            <Leaf size={60} className="text-green-600 mx-auto mb-6 drop-shadow-md" />
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">
              Eco-Friendly & Sustainable
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Travel responsibly, minimize your footprint, and contribute to the preservation of
              local ecosystems.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center border border-gray-200">
            <Users size={60} className="text-green-600 mx-auto mb-6 drop-shadow-md" />
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">
              Empowering Rural Families
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Your journey directly supports local livelihoods, crafts, and the vibrant cultural
              heritage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50 rounded-3xl shadow-xl p-10">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800 font-inter">
          Your Journey in 3 Simple Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <div className="bg-green-200 p-5 rounded-full mb-6 shadow-lg">
              <Compass size={45} className="text-green-800" />
            </div>
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">1. Explore & Discover</h4>
            <p className="text-gray-600 leading-relaxed">
              Browse unique homestays, cultural activities, and farm experiences.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <div className="bg-green-200 p-5 rounded-full mb-6 shadow-lg">
              <CheckCircle size={45} className="text-green-800" />
            </div>
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">2. Book Securely</h4>
            <p className="text-gray-600 leading-relaxed">
              Confirm your stay or activity with our easy and secure booking process.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <div className="bg-green-200 p-5 rounded-full mb-6 shadow-lg">
              <Globe size={45} className="text-green-800" />
            </div>
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">3. Live the Experience</h4>
            <p className="text-gray-600 leading-relaxed">
              Immerse yourself in local life and create unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <h3 className="text-4xl font-bold mb-6 text-gray-800 font-inter">Share Your Village Story</h3>
        <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Are you a rural host eager to share your home, culture, or unique skills? Join our growing
          community!
        </p>
        <button
          onClick={() => setCurrentPage('host')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Become a Host Today
        </button>
      </section>
    </main>
  );
};

export default Welcome;