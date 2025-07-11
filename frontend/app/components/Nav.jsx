'use client';

import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Become a Host', href: '/host' },
    { label: 'Experience', href: '/experience' },
    { label: 'Skill Share', href: '/skill-share' },
    { label: 'Videos', href: '/videocard' },
    { label: 'Login', href: '/login' },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-green-700 cursor-pointer"
        onClick={() => router.push('/')}
      >
        Villagestay
      </div>

      {/* Navigation Buttons */}
      <div className="space-x-6 text-lg font-medium text-gray-700">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => router.push(link.href)}
            className="hover:text-green-600 transition focus:outline-none"
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
