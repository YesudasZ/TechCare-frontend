import { motion } from 'framer-motion';
import { FiClock, FiShield, FiStar, FiCheck, FiTool, FiTv, FiDroplet, FiBatteryCharging } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import banner from "../../pictures/Designer (9).png";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt="TechCare Hero"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 " />
        </div>
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      {/* Services Section */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <ServiceCard title="Carpentry" icon={FiTool} services={22} />
          <ServiceCard title="Appliance" icon={FiTv} services={26} />
          <ServiceCard title="Plumbing" icon={FiDroplet} services={22} />
          <ServiceCard title="Electrical" icon={FiBatteryCharging} services={22} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HowItWorksStep step="01" title="Choose What To Do" />
          <HowItWorksStep step="02" title="Find What You Want" />
          <HowItWorksStep step="03" title="Amazing Service" />
        </div>
      </section>

      {/* Trust and Security Section */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Your Trust and Security</h2>
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

const ServiceCard = ({ title, icon: Icon, services }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300"
  >
    <Icon className="text-5xl mb-4 text-blue-400" />
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{services} Services</p>
  </motion.div>
);

const HowItWorksStep = ({ step, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg shadow-lg transition-all duration-300"
  >
    <h3 className="text-3xl font-bold mb-4 text-blue-400">{step}</h3>
    <p className="text-xl font-semibold mb-2">{title}</p>
    <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </motion.div>
);

const TrustFeature = ({ title, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center"
  >
    <Icon className="text-4xl mx-auto mb-4 text-blue-400" />
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </motion.div>
);

export default Home;