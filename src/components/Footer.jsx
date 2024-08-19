import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              <span className="text-white">Tech</span>
              <span className="text-gray-200">Care</span>
            </h2>
            <p className="text-gray-300">Providing top-notch tech support and care for all your devices.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">123 Tech Street, Digital City</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
            <p className="text-gray-300">Email: info@techcare.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300"><FaFacebookF /></a>
              <a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300"><FaTwitter /></a>
              <a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300"><FaInstagram /></a>
              <a href="#" className="text-gray-300 hover:text-white transition ease-in-out duration-300"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2024 TechCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
