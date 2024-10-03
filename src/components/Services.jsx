import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBatteryCharging, FiTv, FiTool, FiDroplet } from 'react-icons/fi';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBook = (id) => {
    console.log("daniel",id)
    navigate(`/schedule/${id}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchServiceTypes(selectedCategory._id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/auth/service-categories');
      setCategories(response.data);
      setSelectedCategory(response.data[0]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceTypes = async (categoryId) => {
    try {
      const response = await axios.get(`/auth/service-types?category=${categoryId}`);
      setServiceTypes(response.data);
    } catch (error) {
      console.error('Error fetching service types:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'electrical':
        return <FiBatteryCharging />;
      case 'appliance':
        return <FiTv />;
      case 'carpentry':
        return <FiTool />;
      case 'plumbing':
        return <FiDroplet />;
      default:
        return <FiTool />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiTool className="text-4xl text-blue-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            key={selectedCategory._id}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={selectedCategory.imageUrl[0]}
              alt={`${selectedCategory.name} Banner`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center text-center mt-40 px-4 py-8">
        <motion.h2 
          className="text-6xl font-bold mb-12 tracking-wide text-transparent text-black-300"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          TechCare Services
        </motion.h2>

        <div className="w-full flex justify-center items-center space-x-8 mb-16">
          {categories.map((category) => (
            <motion.div
              key={category._id}
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  selectedCategory?._id === category._id 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                  : 'bg-white/10 text-white'
                }`}
                whileHover={{ rotate: 15 }}
              >
                <div className="text-4xl">{getCategoryIcon(category.name)}</div>
              </motion.div>
              <span className={`text-xl font-medium mt-3 ${
                selectedCategory?._id === category._id ? 'text-white' : 'text-gray-300'
              }`}>
                {category.name}
              </span>
            </motion.div>
          ))}
        </div>

        {selectedCategory && (
          <motion.div 
            className="w-full max-w-7xl mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-4xl font-bold mb-4">{selectedCategory.name}</h3>
            <div className="flex items-center justify-center mb-8">
              <div className="text-6xl mr-4">{getCategoryIcon(selectedCategory.name)}</div>
              <p className="text-xl">{selectedCategory.description}</p>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {serviceTypes.map((serviceType, index) => (
            <motion.div
              key={serviceType._id}
              className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* <img
                      src={serviceType.imageUrl[0]}
                      alt={serviceType.name}
                      className="w-full h-48 object-cover"
                    /> */}
              <h3 className="text-2xl font-bold mb-2">{serviceType.name}</h3>
              <p className="text-gray-300 mb-4">{serviceType.description}</p>
              <p className="text-2xl font-semibold mb-4 text-blue-400">₹{serviceType.rate}</p>
              <motion.button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>handleBook(serviceType._id)}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
