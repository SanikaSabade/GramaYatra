'use client'; 

import { Handshake, Users, DollarSign, Calendar } from 'lucide-react';

const SkillSharePage = () => {
  const workshops = [
    {
      id: 1,
      title: 'Traditional Pottery Making',
      description: 'Learn the ancient art of pottery from a master artisan. Get hands-on with clay and create your own unique piece.',
      host: 'Smt. Kamala Devi, Kutch, Gujarat',
      duration: '3 hours',
      price: '₹1500',
      imageUrl: 'https://placehold.co/600x400/D2B48C/333333?text=Pottery+Workshop',
    },
    {
      id: 2,
      title: 'Organic Farming & Composting',
      description: 'Spend a day with a local farmer, learning sustainable organic farming techniques and the art of composting.',
      host: 'Shri. Ram Lal, Palampur, Himachal Pradesh',
      duration: '4 hours',
      price: '₹1800',
      imageUrl: 'https://placehold.co/600x400/A3C1AD/333333?text=Farming+Workshop',
    },
    {
      id: 3,
      title: 'Authentic Spice Blending & Cooking',
      description: 'Unravel the secrets of Indian spices. Learn to blend traditional masalas and cook a regional delicacy.',
      host: 'Smt. Priya Nair, Alleppey, Kerala',
      duration: '2.5 hours',
      price: '₹1200',
      imageUrl: 'https://placehold.co/600x400/FFD700/333333?text=Cooking+Workshop',
    },
    {
      id: 4,
      title: 'Bamboo Crafting Workshop',
      description: 'Discover the versatility of bamboo. Learn to weave baskets, make decorative items, or simple furniture.',
      host: 'Shri. Biju Das, Assam',
      duration: '3.5 hours',
      price: '₹1600',
      imageUrl: 'https://placehold.co/600x400/8B8C89/333333?text=Bamboo+Craft',
    },
    {
      id: 5,
      title: 'Warli Painting Masterclass',
      description: 'Dive into the tribal art of Warli. Learn the distinctive geometric patterns and storytelling techniques.',
      host: 'Smt. Geeta Patil, Palghar, Maharashtra',
      duration: '2 hours',
      price: '₹1000',
      imageUrl: 'https://placehold.co/600x400/ADD8E6/333333?text=Warli+Art',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 font-inter flex items-center justify-center">
          <Handshake size={40} className="mr-4 text-green-700" /> Skill-Share Workshops: Learn from the Locals
        </h2>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          Unlock unique skills and traditional knowledge directly from the heart of rural India. These workshops empower local artisans and farmers to share their expertise and earn a sustainable income.
        </p>

        <div className="bg-yellow-50 rounded-2xl p-6 mb-12 shadow-md border border-yellow-200 text-center">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            *Empowering through Knowledge:*
          </p>
          <p className="text-gray-700 leading-relaxed">
            When you book a skill-share workshop, you're not just learning; you're directly supporting the livelihoods of our talented hosts. Villagestay takes only a small commission to facilitate these connections, ensuring that the majority of your contribution goes directly to the local community. This platform is truly <em>run by the people, supported by tech, and money earned by the people.</em>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200 group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={workshop.imageUrl}
                  alt={workshop.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 font-inter">
                  {workshop.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{workshop.description}</p>
                <p className="text-green-700 text-sm font-medium flex items-center mb-2">
                  <Users size={16} className="mr-2" /> Host: {workshop.host}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-700 flex items-center">
                    <DollarSign size={18} className="mr-1" /> {workshop.price}
                  </span>
                  <span className="text-gray-600 text-sm flex items-center">
                    <Calendar size={16} className="mr-1" /> {workshop.duration}
                  </span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-base mt-4 transition-colors duration-300 shadow-md">
                  Book Workshop
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SkillSharePage;