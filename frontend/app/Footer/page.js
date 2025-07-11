'use client'; 
import { Home } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16 rounded-t-3xl shadow-inner">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Villagestay */}
        <div>
          <h3 className="text-2xl font-bold mb-5 text-white font-inter">Villagestay</h3>
          <p className="text-sm leading-relaxed">
            Connecting urban and international tourists with authentic rural experiences across India,
            promoting sustainable tourism and rural development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-5 text-white font-inter">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center">
                <Home size={18} className="mr-2" /> Home
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-5 text-white font-inter">Connect With Us</h3>
          <p className="text-sm mb-3">
            Email: <a href="mailto:info@villagestay.com" className="hover:text-green-400">info@villagestay.com</a>
          </p>
          <p className="text-sm mb-5">Phone: +91 98765 43210</p>
          <div className="flex space-x-5">
            {/* Social Icons - You can replace with real logos */}
            <a href="#" className="hover:text-green-400 transition-colors duration-200">
              <img src="https://placehold.co/30x30/000000/ffffff?text=FB" alt="Facebook" className="rounded-full" />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors duration-200">
              <img src="https://placehold.co/30x30/000000/ffffff?text=IG" alt="Instagram" className="rounded-full" />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors duration-200">
              <img src="https://placehold.co/30x30/000000/ffffff?text=TW" alt="Twitter" className="rounded-full" />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors duration-200">
              <img src="https://placehold.co/30x30/000000/ffffff?text=LI" alt="LinkedIn" className="rounded-full" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Villagestay. All rights reserved. Designed for authentic rural connections.
      </div>
    </footer>
  );
};

export default Footer;