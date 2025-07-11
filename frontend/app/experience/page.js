'use client';

import { useRouter } from 'next/navigation';
import { MapPin, DollarSign, Star } from 'lucide-react';

const experiences = [
  {
    id: 1,
    name: 'Rustic Farm Stay in Punjab',
    location: 'Amritsar, Punjab',
    description:
      'Experience traditional Punjabi farm life, participate in farming, and enjoy home-cooked meals.',
    price: '₹2500/night',
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400/A3C1AD/333333?text=Punjabi+Farm',
    tags: ['Farm Life', 'Food', 'Culture'],
    seasonal: 'Harvest Season',
  },
  {
    id: 2,
    name: 'Himalayan Village Retreat',
    location: 'Manali, Himachal Pradesh',
    description:
      'Cozy homestay amidst apple orchards, offering stunning mountain views and local treks.',
    price: '₹3500/night',
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400/8B8C89/333333?text=Himalayan+Retreat',
    tags: ['Mountains', 'Nature', 'Trekking'],
    seasonal: 'Spring Blooms',
  },
  {
    id: 3,
    name: 'Backwater Houseboat in Kerala',
    location: 'Alleppey, Kerala',
    description:
      'Float through serene backwaters, enjoy Keralan cuisine, and witness village life by the water.',
    price: '₹4000/night',
    rating: 4.7,
    imageUrl: 'https://placehold.co/600x400/4CAF50/333333?text=Kerala+Backwaters',
    tags: ['Backwaters', 'Nature', 'Relaxation'],
    seasonal: 'Monsoon Magic',
  },
  {
    id: 4,
    name: 'Desert Camp in Rajasthan',
    location: 'Jaisalmer, Rajasthan',
    description:
      'Spend nights under the stars in a traditional desert camp, with camel safaris and folk music.',
    price: '₹3000/night',
    rating: 4.6,
    imageUrl: 'https://placehold.co/600x400/D2B48C/333333?text=Rajasthan+Desert',
    tags: ['Desert', 'Culture', 'Adventure'],
    seasonal: 'Winter Nights',
  },
  {
    id: 5,
    name: 'Konkan Coastal Homestay',
    location: 'Guhagar, Maharashtra',
    description:
      'Relax in a coastal village, enjoy fresh seafood, and explore pristine beaches.',
    price: '₹2000/night',
    rating: 4.5,
    imageUrl: 'https://placehold.co/600x400/ADD8E6/333333?text=Konkan+Coast',
    tags: ['Beach', 'Seafood', 'Relaxation'],
    seasonal: 'Summer Breeze',
  },
  {
    id: 6,
    name: 'Tribal Art Workshop in Odisha',
    location: 'Puri, Odisha',
    description:
      'Learn traditional Pattachitra art from local artisans and experience tribal culture.',
    price: '₹1800/day',
    rating: 4.7,
    imageUrl: 'https://placehold.co/600x400/FFD700/333333?text=Odisha+Art',
    tags: ['Art', 'Culture', 'Workshop'],
    seasonal: 'Year-round',
  },
];

const hosts = [
  {
    name: 'Radha Devi',
    village: 'Palampur, Himachal Pradesh',
    quote: 'Our home is your home, filled with mountain warmth!',
    img: 'https://placehold.co/150x150/C8E6C9/000000?text=Host+1',
  },
  {
    name: 'Suresh Kumar',
    village: 'Alleppey, Kerala',
    quote: 'Experience the serene backwaters and taste authentic Keralan flavors.',
    img: 'https://placehold.co/150x150/C8E6C9/000000?text=Host+2',
  },
  {
    name: 'Meena Bai',
    village: 'Jaisalmer, Rajasthan',
    quote: 'Share stories under the desert stars with our family.',
    img: 'https://placehold.co/150x150/C8E6C9/000000?text=Host+3',
  },
];

export default function ExperiencesPage() {
  const router = useRouter();

  const handleViewDetails = (exp) => {
    router.push(`/experiences/${exp.id}`); 
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 font-inter">
        Explore Our Authentic Experiences
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={exp.imageUrl}
                alt={exp.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {exp.seasonal}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 font-inter">
                {exp.name}
              </h3>
              <p className="text-gray-600 text-base mb-3 flex items-center">
                <MapPin size={18} className="mr-2 text-green-600" />
                {exp.location}
              </p>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-2">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-xl font-bold text-green-700 flex items-center">
                  <DollarSign size={20} className="mr-1" />
                  {exp.price}
                </span>
                <span className="text-yellow-500 font-semibold flex items-center">
                  <Star size={20} className="mr-1" />
                  {exp.rating}
                </span>
              </div>
              <button
                onClick={() => handleViewDetails(exp)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="py-16 bg-green-50 rounded-3xl shadow-xl mt-16 p-10">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800 font-inter">
          Meet Our Amazing Hosts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {hosts.map((host, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md text-center border border-green-100 hover:shadow-xl transition duration-300"
            >
              <img
                src={host.img}
                alt={host.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-green-300 shadow-lg"
              />
              <h4 className="text-2xl font-semibold mb-2 text-gray-800 font-inter">
                {host.name}
              </h4>
              <p className="text-green-700 text-lg font-medium mb-4 flex items-center justify-center">
                <MapPin size={18} className="mr-2" />
                {host.village}
              </p>
              <p className="text-gray-700 italic leading-relaxed">"{host.quote}"</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
