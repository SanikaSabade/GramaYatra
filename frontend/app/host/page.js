'use client'; 
import { Users, Compass, Heart } from 'lucide-react';

const HostPage = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 font-inter">
          Become a Villagestay Host
        </h2>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          Share your village's unique charm, traditions, and hospitality with the world. Villagestay empowers rural communities by connecting you directly with travelers seeking authentic experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {[
            {
              img: 'Earn+Income',
              title: 'Earn Sustainable Income',
              desc: 'Generate income by showcasing your home, local cuisine, and cultural activities to a global audience.',
            },
            {
              img: 'Showcase+Culture',
              title: 'Showcase Your Culture',
              desc: "Introduce travelers to your village's unique traditions, crafts, and lifestyle, fostering cultural exchange.",
            },
            {
              img: 'Easy+Platform',
              title: 'Easy-to-Use Platform',
              desc: 'Manage listings, bookings, and payments effortlessly with our intuitive web and mobile interface.',
            },
            {
              img: 'Global+Reach',
              title: 'Reach a Global Audience',
              desc: 'Connect with urban and international tourists eager for authentic, offbeat rural experiences.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-green-50 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`https://placehold.co/180x180/C8E6C9/000000?text=${item.img}`}
                alt={item.title}
                className="rounded-full mb-6 object-cover border-4 border-green-300 shadow-lg"
              />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 font-inter">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-4xl font-bold text-center mb-10 text-gray-800 font-inter">
          Your Journey to Becoming a Host
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-12">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <div className="bg-green-200 p-5 rounded-full mb-6 shadow-lg">
              <Users size={45} className="text-green-800" />
            </div>
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">1. Create Your Profile</h4>
            <p className="text-gray-600 leading-relaxed">
              Sign up and tell us about your unique village, your home, and the experiences you offer.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <div className="bg-green-200 p-5 rounded-full mb-6 shadow-lg">
              <Compass size={45} className="text-green-800" />
            </div>
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">2. List Your Experience</h4>
            <p className="text-gray-600 leading-relaxed">
              Add captivating photos, detailed descriptions, and set your pricing for homestays or activities.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <div className="bg-green-200 p-5 rounded-full mb-6 shadow-lg">
              <Heart size={45} className="text-green-800" />
            </div>
            <h4 className="text-2xl font-semibold mb-3 font-inter text-gray-800">3. Welcome Guests!</h4>
            <p className="text-gray-600 leading-relaxed">
              Start receiving bookings and share the warmth and authenticity of your village life.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300">
            Register as a Host
          </button>
        </div>
      </section>
    </main>
  );
};

export default HostPage;