import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 text-sm">
              Providing top-notch tech support and care for all your devices.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 Tech Street, Digital City</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@techcare.com</p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 TechCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
const SocialIcon = ({ Icon, href }) => (
  <a href={href} className="text-gray-500 hover:text-white transition-colors duration-200">
    <Icon className="h-5 w-5" />
  </a>
);
const Logo = () => (
  <div className="flex-shrink-0 flex items-center">
    <svg className="h-8 w-auto" viewBox="0 0 184 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8L28 24H4L16 8Z" fill="#4B5563"/>
      <path d="M16 24L4 8H28L16 24Z" fill="#9CA3AF"/>
      <text x="36" y="24" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="white">Tech</text>
      <text x="100" y="24" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#9CA3AF">Care</text>
    </svg>
  </div>
)

export default Footer;
