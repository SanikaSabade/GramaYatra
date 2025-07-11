'use client';

import { Users, Video } from 'lucide-react';

const videos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'A Day on Our Organic Farm in Punjab',
    description:
      'Join the Singh family as they walk you through their organic farm, showcasing traditional farming methods and the joy of harvest.',
    host: 'The Singh Family, Amritsar',
  },
  {
    id: 'o_l4b42-M40',
    title: 'Weaving Traditions of Odisha: A Handloom Story',
    description:
      'Witness the intricate art of Pattachitra weaving, passed down through generations in a remote Odisha village.',
    host: 'Meena Devi, Puri',
  },
  {
    id: 'M_gK5p0H54c',
    title: 'Cooking Authentic Kerala Sadya with Local Spices',
    description:
      'Learn to prepare a traditional Keralan Sadya feast from scratch, using fresh ingredients from our village garden.',
    host: 'The Nair Family, Alleppey',
  },
  {
    id: 'Yl_zR2X-b6I',
    title: "Life in the Himalayan Foothills: A Shepherd's Tale",
    description:
      'Follow a local shepherd through the breathtaking landscapes of Himachal, experiencing daily life in the mountains.',
    host: 'Rohan Sharma, Manali',
  },
  {
    id: 't_j16g46W00',
    title: 'Desert Rhythms: Music & Dance of Rajasthan',
    description:
      'Immerse yourself in the vibrant folk music and dance of the Thar desert, performed by local artists.',
    host: 'The Kalbeliya Troupe, Jaisalmer',
  },
  {
    id: 'Hq0WlW_4Q44',
    title: 'Konkan Coast: Fishing Village Life & Fresh Catch',
    description:
      'Discover the daily life of a fishing village on the Konkan coast and enjoy the freshest seafood prepared traditionally.',
    host: 'The Koli Community, Guhagar',
  },
];

export default function VideoCard() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 font-inter flex items-center justify-center">
          <Video size={40} className="mr-4 text-green-700" />
          Villagestay TV: Stories from the Heart of Rural India
        </h2>

        <p className="text-xl text-gray-700 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          Experience the vibrant life of our host communities through their own lenses. Villagestay proudly promotes these authentic stories, connecting you directly to the traditions and daily rhythms of rural India.
        </p>

        <div className="bg-yellow-50 rounded-2xl p-6 mb-12 shadow-md border border-yellow-200 text-center">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            By the people, for the people:
          </p>
          <p className="text-gray-700 leading-relaxed">
            These videos are shared by our hosts, showcasing their unique worlds. Villagestay takes only a small, transparent commission from bookings and potential direct support, ensuring the platform's sustainability and directly empowering local livelihoods. Your engagement here directly contributes to their prosperity and the preservation of their culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200 group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-t-xl"
                  src={`https://www.youtube.com/embed/${video.id}?controls=1&modestbranding=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 font-inter">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                <p className="text-green-700 text-sm font-medium flex items-center">
                  <Users size={16} className="mr-2" />
                  Host: {video.host}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

