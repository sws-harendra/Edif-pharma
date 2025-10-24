// components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope 
} from 'react-icons/fa';
import { 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa6';

// Footer links ke data ke liye type
type FooterLink = {
  name: string;
  href: string;
};

// Data
const aboutLinks: FooterLink[] = [
  { name: 'About Us', href: '/about' },
  { name: 'Leadership', href: '/about/leadership' },
  { name: 'CSR / Sustainability', href: '/about/csr' },
  { name: 'Careers', href: '/careers' },
];

const productLinks: FooterLink[] = [
  { name: 'APIs', href: '/products/apis' },
  { name: 'Finished Dosage Forms', href: '/products/dosage-forms' },
  { name: 'Specialty Formulations', href: '/products/specialty' },
  { name: 'Contract Manufacturing', href: '/products/manufacturing' },
];

const resourceLinks: FooterLink[] = [
  { name: 'Certifications', href: '/certifications' },
  { name: 'Markets Served', href: '/markets' },
  { name: 'Press Releases', href: '/news/press' },
  { name: 'Blog / Insights', href: '/insights' },
  { name: 'Media Kit', href: '/media-kit' },
];

const socialLinks = [
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

// Main Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Top Section: 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 2: Products */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white">Headquarters</span>
                  <p>123 Pharma Street<br />Industrial City, PC 12345<br />United States</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="h-4 w-4 text-gray-400" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="h-4 w-4 text-gray-400" />
                <a href="mailto:info@pharmaglobal.com" className="hover:text-white transition-colors">
                  info@pharmaglobal.com
                </a>
              </div>
            </div>
            {/* Request a Quote Button */}
            <div className="mt-6">
              <Link
                href="/request-quote"
                className="
                  inline-block w-full text-center px-5 py-2.5 
                  bg-red-600 text-white font-medium rounded-md shadow-sm
                  hover:bg-red-700 transition-colors duration-300
                "
              >
                Request a Quote
              </Link>
            </div>
          </div>
          
        </div>

        {/* Middle Section: Logo, Social, Legal Links */}
        <div className="border-t border-gray-700 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className='w-20 h-20 flex items-center justify-center'>
                  <img src="/icon.png" alt="kogo.png" />
                </div>
                <p className="text-sm text-gray-400">
                    Global Partner in Healthcare Manufacturing
                  </p>
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
              <Link href="/compliance" className="hover:text-white">Compliance Statement</Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-700 py-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PharmaGlobal. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;