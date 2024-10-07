import { motion } from "framer-motion";
import { FiTool, FiZap, FiDroplet, FiTv } from "react-icons/fi";
import Picture1 from "../../pictures/pic1.png"; 
import Picture2 from "../../pictures/pic2.png"; 
import Picture3 from "../../pictures/pic3.png"; 
import Picture4 from "../../pictures/pic4.png"; 
import Picture5 from "../../pictures/pic5.png"; 
import Picture6 from "../../pictures/pic6.png"; 
import Picture7 from "../../pictures/pic7.png"; 
import Picture8 from "../../pictures/pic8.jpg"; 

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-black  py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-12 text-center">
          <motion.h1 
            className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to TechCare
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            TechCare is a platform that connects users with service technicians.
            Easily book service requests, schedule appointments, and pay with either wallet or Razorpay.
            After booking, communicate directly with technicians via chat, share videos or photos, and raise complaints if necessary.
          </motion.p>
        </section>

        <section className="text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            Our Service Categories
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={FiZap}
              title="Electrical"
              description="Repair, Maintenance, and Installation"
              image={Picture1}
            />
            <ServiceCard
              icon={FiTool}
              title="Carpentry"
              description="Repair, Maintenance, and Installation"
              image={Picture2}
            />
            <ServiceCard
              icon={FiDroplet}
              title="Plumbing"
              description="Repair, Maintenance, and Installation"
              image={Picture3}
            />
            <ServiceCard
              icon={FiTv}
              title="Appliance"
              description="Repair, Maintenance, and Installation"
              image={Picture4}
            />

          </div>
        </section>
        <section className="mt-16">
          <motion.h3 
            className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            Our Vision
          </motion.h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <VisionCard image={Picture5} text="At TechCare, we aim to revolutionize the service industry by providing an all-in-one platform for technicians and users." />
            <VisionCard image={Picture6} text="We believe in offering convenience, efficiency, and transparency through technology. Your satisfaction is our priority." />
            <VisionCard image={Picture7} text="Join thousands of satisfied users and make TechCare your go-to for all home service needs." />
            <VisionCard image={Picture8} text="Quality services at your fingertips. Experience the difference with TechCare!" />
          </div>
        </section>

      </div>
    </div>
  );
};
const ServiceCard = ({ icon: Icon, title, description, image }) => (
  <motion.div 
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <img src={image} alt={title} className="w-full h-32 object-cover mb-4 rounded-lg" />
    <div className="flex items-center justify-center mb-4">
      <Icon className="text-4xl text-blue-400" />
    </div>
    <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);
const VisionCard = ({ image, text }) => (
  <motion.div
    className="flex items-center space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img src={image} alt="Vision" className="w-24 h-24 object-cover rounded-full" />
    <p className="text-gray-300 text-lg">{text}</p>
  </motion.div>
);

export default AboutUs;
