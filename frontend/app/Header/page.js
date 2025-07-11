'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home,
  Compass,
  PlayCircle,
  Handshake,
  Users,
  Info,
  LogIn,
  Menu,
  X,
} from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Experiences', icon: Compass, href: '/experiences' },
    { name: 'Videos', icon: PlayCircle, href: '/videos' },
    { name: 'Skill-Share', icon: Handshake, href: '/skill-share' },
    { name: 'Become a Host', icon: Users, href: '/host' },
    { name: 'About Us', icon: Info, href: '/about' },
  ];

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-xl w-full z-50">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <img
            src="https://placehold.co/48x48/ffffff/22C55E?text=VS"
            alt="Villagestay Logo"
            className="rounded-full shadow-md"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold font-inter tracking-wide">
            GramaYatra
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className="flex items-center gap-2 text-lg font-medium hover:text-green-200 transition-all duration-300"
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}

          <button
            onClick={() => router.push('/login')}
            className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-full shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <LogIn size={18} />
              <span>Login</span>
            </div>
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => router.push('/login')}
            className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-md"
          >
            <LogIn size={20} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-md hover:bg-green-700"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-green-700 px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.href);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full py-3 px-4 text-lg font-medium rounded-md hover:bg-green-600 text-white transition"
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
