'use client'; // If using App Router (Next.js 13+)

import { Mountain, Sun, CheckCircle, Users, Leaf } from 'lucide-react';

const AboutUsPage = ({ setCurrentPage }) => {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 font-inter">
          Our Story: The Heart of Villagestay
        </h2>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          Villagestay is more than just a travel platform; it's a movement towards sustainable tourism and rural empowerment.
          We believe in connecting travelers with the authentic heart of India's villages.
        </p>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-semibold mb-5 text-gray-800 font-inter flex items-center">
              <Mountain size={30} className="mr-3 text-green-600" /> Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to bridge the gap between urban life and rural heritage. We aim to provide immersive,
              eco-friendly travel experiences that not only enrich the traveler but also directly benefit and empower
              local communities. By showcasing the unique hospitality, lifestyle, crafts, and traditions of rural India,
              we foster cultural exchange and sustainable development for a brighter future.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-5 text-gray-800 font-inter flex items-center">
              <Sun size={30} className="mr-3 text-green-600" /> Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              We envision a future where rural tourism is a significant contributor to local economies, preserving
              cultural heritage and natural environments. Villagestay strives to be the leading platform for authentic
              rural experiences, recognized for its unwavering commitment to community empowerment, responsible travel,
              and unforgettable, meaningful journeys for all.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <h3 className="text-4xl font-bold text-center mb-10 text-gray-800 font-inter">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          <div className="text-center p-6 bg-green-50 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <CheckCircle size={50} className="text-green-700 mx-auto mb-4 drop-shadow-sm" />
            <h4 className="text-2xl font-semibold mb-2 font-inter text-gray-800">Authenticity</h4>
            <p className="text-gray-600 leading-relaxed">
              We prioritize genuine cultural immersion and real connections with local life.
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <Users size={50} className="text-green-700 mx-auto mb-4 drop-shadow-sm" />
            <h4 className="text-2xl font-semibold mb-2 font-inter text-gray-800">Empowerment</h4>
            <p className="text-gray-600 leading-relaxed">
              We uplift rural communities by creating sustainable economic opportunities.
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <Leaf size={50} className="text-green-700 mx-auto mb-4 drop-shadow-sm" />
            <h4 className="text-2xl font-semibold mb-2 font-inter text-gray-800">Sustainability</h4>
            <p className="text-gray-600 leading-relaxed">
              We champion eco-friendly practices and responsible travel for a healthier planet.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Ready to embark on a meaningful journey?
          </p>
          <button
            onClick={() => setCurrentPage && setCurrentPage('experiences')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Explore Experiences
          </button>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;