'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; 
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <footer className={`pt-12 pb-8 border-t border-gray-200 text-white dark:border-gray-800 bg-tertiary ${theme.animations ? 'animate-fade-in' : ''}`}>
      <div className="container mx-auto px-4 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
            <p className={``}>
              Discover premium pet products and accessories at PawParadise. Your one-stop destination for all your furry friends&apos; needs!
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className={`w-6 h-6 transition-transform duration-200 hover:text-secondary ${theme.animations ? 'hover:scale-110' : ''}`}
                />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={`w-6 h-6 transition-transform duration-200 hover:text-secondary ${theme.animations ? 'hover:scale-110' : ''}`}
                />
              </Link>
              <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className={`w-6 h-6 transition-transform duration-200 hover:text-secondary ${theme.animations ? 'hover:scale-110' : ''}`}
                />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className={`w-6 h-6 transition-transform duration-200 hover:text-secondary ${theme.animations ? 'hover:scale-110' : ''}`}
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className={`text-lg font-semibold`}>Categories</h3>
            <ul className={`space-y-2`}>
              <li>
                <Link href="/pet-food" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Pet Food
                </Link>
              </li>
              <li>
                <Link href="/pet-accessories" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Pet Accessories
                </Link>
              </li>
              <li>
                <Link href="/pet-toys" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Pet Toys
                </Link>
              </li>
              <li>
                <Link href="/pet-beds-furniture" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Pet Beds & Furniture
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className={`text-lg font-semibold`}>Support</h3>
            <ul className={`space-y-2`}>
              <li>
                <Link href="/my-account" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/help-center" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/forums" className={`flex items-center hover:text-secondary transition-colors duration-200`}>
                  Forums
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className={`text-lg font-semibold`}>Newsletter</h3>
            <p className={`text-white`}>
              Subscribe to our newsletter for new products, trends and offers.
            </p>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF782C]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF782C]"
              />
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-[#FF782C] text-white rounded-full flex items-center justify-center space-x-2 transition-transform duration-200 ${theme.animations ? 'hover:scale-105' : ''}`}
              >
                <span>Sign Up</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4-4m-4 4l4 4"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-foreground`}>
            Copyright © 2025 PawParadise. All rights reserved.
          </p>
          <div className={`flex space-x-4`}>
            <Link href="/terms-of-service" className={`text-background hover:text-secondary transition-colors duration-200`}>
              Terms of Services
            </Link>
            <Link href="/privacy-policy" className={`text-background hover:text-secondary transition-colors duration-200`}>
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className={`text-background hover:text-secondary transition-colors duration-200`}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;