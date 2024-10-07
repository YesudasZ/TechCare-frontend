import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiFileText, FiCheckCircle } from 'react-icons/fi';
import file from "../../pictures/file.png";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { service } = location.state;

  if (!service) {
    return <div>No service details available</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div  className="min-h-screen bg-gradient-to-b from-gray-500 to-black pt-20 pb-12">
      <div className="max-w-4xl mx-auto my-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h1 className="text-4xl font-extrabold tracking-wide">Booking Confirmed!</h1>
          </div>
          <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                className="w-48 h-48 rounded-full overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img src={file} alt="Technician" className="w-full h-full object-cover" />
              </motion.div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{service.serviceName}</h2>
                <p className="text-gray-600 mb-4">{service.serviceDescription}</p>
                <div className="flex items-center text-blue-600 mb-2">
                  <FiCalendar className="mr-2" />
                  <span>{formatDate(service.appointmentDate)}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <FiClock className="mr-2" />
                  <span>{formatTime(service.appointmentTime)}</span>
                </div>
              </div>
            </div>
            <motion.div
              className="bg-gray-100 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FiMapPin className="mr-2 text-blue-500" />
                Service Address
              </h3>
              <p>{service.address.street}</p>
              <p>{service.address.city}, {service.address.state}</p>
              <p>{service.address.country} - {service.address.postalCode}</p>
              <p>Phone: {service.address.phoneNumber}</p>
            </motion.div>
            <motion.div
              className="bg-green-100 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FiCheckCircle className="mr-2 text-green-500" />
                Payment Status
              </h3>
              <p className="text-green-600 font-bold">Paid: ₹{service.amount}</p>
              <p>Payment ID: {service.paymentId}</p>
            </motion.div>
            <div className="text-center mb-6">
              <p className="text-2xl font-semibold text-purple-600 mb-2">
                "You did your part, the rest is up to our team!"
              </p>
              <p className="text-gray-600">
                "Take a break, we'll handle the rest!"
              </p>
            </div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => navigate('/bookings')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
              >
                <FiFileText className="inline-block mr-2" />
                View My Bookings
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
