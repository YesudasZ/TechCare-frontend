import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiShield, FiStar, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { Orbit } from "@uiball/loaders";
import { Tooltip } from "@nextui-org/react";
import banner from "../../pictures/Designer (9).png"; 

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/auth/service-categories');
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching service categories:', error);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleGetStarted = () => {
    navigate('/services');
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/services?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={banner}
            alt="TechCare Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </motion.div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Ready to Live Smarter?
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Book expert home cleaners and handymen at a moment's notice, just pick a time and we'll do the rest.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Get Started</span>
            <FiArrowRight />
          </motion.button>
        </div>
      </motion.div>

      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Our Services</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <Orbit size={35} color="#3B82F6" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard
                    title={category.name}
                    image={category.imageUrl[0]}
                    onClick={() => handleCategoryClick(category._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <section className="py-20 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HowItWorksStep step="01" title="Choose What To Do" />
          <HowItWorksStep step="02" title="Find What You Want" />
          <HowItWorksStep step="03" title="Amazing Service" />
        </div>
      </section>

      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Your Trust and Security</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TrustFeature title="Saves You Time" icon={FiClock} />
          <TrustFeature title="For Your Safety" icon={FiShield} />
          <TrustFeature title="Best-Rated Professionals" icon={FiStar} />
          <TrustFeature title="We Are Well Equipped" icon={FiCheck} />
          <TrustFeature title="Always In Touch" icon={FiCheck} />
          <TrustFeature title="Cash-Free Facility" icon={FiCheck} />
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ title, image, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300"
    onClick={onClick}
  >
    <img src={image} alt={title} className="w-full h-32 object-cover mb-4 rounded-lg" />
    <h3 className="text-2xl font-semibold mb-2 text-blue-400">{title}</h3>
    <p className="text-gray-400">Explore services</p>
  </motion.div>
);

const HowItWorksStep = ({ step, title }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
    className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg shadow-lg transition-all duration-300"
  >
    <h3 className="text-3xl font-bold mb-4 text-blue-400">{step}</h3>
    <p className="text-xl font-semibold mb-2 text-white">{title}</p>
    <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </motion.div>
);

const TrustFeature = ({ title, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center"
  >
    <Tooltip content={title}>
      <div className="mb-4">
        <Icon className="text-4xl mx-auto text-blue-400" />
      </div>
    </Tooltip>
    <h3 className="text-2xl font-bold mb-2 text-blue-400">{title}</h3>
    <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </motion.div>
);

export default Home;
