// import { useState, useEffect } from 'react';
// import axios from '../utils/axiosConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiCalendar, FiClock, FiMapPin, FiUser, FiDollarSign, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('/auth/user-bookings');
//       setBookings(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch bookings. Please try again later.');
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'accepted': return 'bg-blue-100 text-blue-800';
//       case 'in-progress': return 'bg-purple-100 text-purple-800';
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         >
//           <FiClock className="text-4xl text-blue-500" />
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         <FiAlertCircle className="mr-2" /> {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">My Bookings</h1>
//         <AnimatePresence>
//           {bookings.map((booking) => (
//             <motion.div
//               key={booking._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-2xl font-semibold text-gray-800">{booking.serviceName}</h2>
//                   <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
//                     {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-4">{booking.serviceDescription}</p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center text-gray-700">
//                     <FiCalendar className="mr-2 text-blue-500" />
//                     <span>{new Date(booking.appointmentDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <FiClock className="mr-2 text-blue-500" />
//                     <span>{new Date(booking.appointmentTime).toLocaleTimeString()}</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <FiMapPin className="mr-2 text-blue-500" />
//                     <span>{`${booking.address.city}, ${booking.address.state}`}</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <FiUser className="mr-2 text-blue-500" />
//                     <span>{booking.technician ? `${booking.technician.firstName} ${booking.technician.lastName}` : 'Not assigned'}</span>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <div className="flex items-center text-gray-700">
//                     <FiDollarSign className="mr-2 text-green-500" />
//                     <span className="font-semibold">₹{booking.amount}</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <FiCheckCircle className={`mr-2 ${booking.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'}`} />
//                     <span>{booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Bookings;


//**Better one start */

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion'; 
// import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'; // Icons for service status
// import axios from '../utils/axiosConfig';
// const Bookings = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getServices = async () => {
//       try {
//         const response = await axios.get('/auth/user-bookings');
//         setServices(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     getServices();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500 text-lg">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-20 bg-gradient-to-b from-gray-500 to-black min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-100">My Booked Services</h1>

//       {services.length === 0 ? (
//         <p className="text-gray-600">You have no booked services.</p>
//       ) : (
//         <div className=" flex items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
//           {services.map((service) => (
//             <motion.div
//               key={service._id}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
//             >
//               <img
//                 src={service.servicePicture}
//                 alt={service.serviceName}
//                 className="rounded-md mb-4"
//               />
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.categoryName}</h2>
//               <h4 className="text-xl font-semibold text-gray-800 mb-2">{service.serviceName}</h4>
//               <p className="text-gray-600 mb-4">{service.serviceDescription}</p>
//               <p className="text-gray-800 mb-4">Appointment: {new Date(service.appointmentDate).toLocaleDateString()} at {new Date(service.appointmentTime).toLocaleTimeString()}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Amount: ${service.amount}</span>
//                 <span className="flex items-center">
//                   {service.status === 'completed' ? (
//                     <FaCheckCircle className="text-green-500 mr-2" />
//                   ) : service.status === 'cancelled' ? (
//                     <FaTimesCircle className="text-red-500 mr-2" />
//                   ) : (
//                     <FaSpinner className="animate-spin text-yellow-500 mr-2" />
//                   )}
//                   <span className="capitalize">{service.status}</span>
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bookings;

//**better end */



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion'; 
// import { Feather } from 'react-feather'; // Replacing react-icons with Feather Icons
// import axios from '../utils/axiosConfig';

// const Bookings = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getServices = async () => {
//       try {
//         const response = await axios.get('/auth/user-bookings');
//         setServices(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     getServices();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-gray-900">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity }}
//         >
//           <Feather icon="loader" className="text-blue-400 text-5xl" />
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-gray-900">
//         <p className="text-red-500 text-lg">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-20 bg-gradient-to-b from-gray-800 to-black min-h-screen">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2 }}
//       >
//         <h1 className="text-4xl font-extrabold mb-8 text-gray-100 tracking-wider">My Booked Services</h1>
//       </motion.div>

//       {services.length === 0 ? (
//         <p className="text-gray-300">You have no booked services.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <motion.div
//               key={service._id}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-2xl"
//             >
//               <div className="relative">
//                 <img
//                   src={service.servicePicture}
//                   alt={service.serviceName}
//                   className="w-full h-48 object-cover"
//                 />
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"
//                   initial={{ opacity: 0 }}
//                   whileHover={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 />
//                 <div className="absolute bottom-0 left-0 p-4 text-white">
//                   <h2 className="text-lg font-bold">{service.serviceName}</h2>
//                   <p className="text-sm">{service.serviceDescription}</p>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <p className="text-gray-700">
//                   Appointment: {new Date(service.appointmentDate).toLocaleDateString()} at {new Date(service.appointmentTime).toLocaleTimeString()}
//                 </p>
//                 <p className="text-gray-700">Amount: ${service.amount}</p>
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-gray-600 capitalize">{service.status}</span>
//                   <span className="flex items-center">
//                     {service.status === 'completed' ? (
//                       <Feather icon="check-circle" className="text-green-500 mr-2" />
//                     ) : service.status === 'cancelled' ? (
//                       <Feather icon="x-circle" className="text-red-500 mr-2" />
//                     ) : (
//                       <Feather icon="loader" className="animate-spin text-yellow-500 mr-2" />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bookings;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiCheckCircle, FiAlertCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import axios from '../utils/axiosConfig';

const Bookings = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get('/auth/user-bookings');
        setServices(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500 mr-2" />;
      case 'cancelled':
        return <FiXCircle className="text-red-500 mr-2" />;
      default:
        return <FiLoader className="animate-spin text-yellow-500 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"> 
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Bookings
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-blue-500 text-4xl" />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">
            <FiAlertCircle className="inline-block mr-2" /> {error}
          </span>
        </div>
      )}

      <AnimatePresence>
        {services.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:shadow-xl"
              >
                <img
                  src={service.servicePicture}
                  alt={service.serviceName}
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {service.serviceName}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800">
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.serviceDescription}
                  </p>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FiCalendar className="mr-2 text-blue-500" />
                    <span>
                      {new Date(service.appointmentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FiClock className="mr-2 text-blue-500" />
                    <span>
                      {new Date(service.appointmentTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <FiMapPin className="mr-2 text-blue-500" />
                    <span>
                      {`${service.address.city}, ${service.address.state}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">
                      <FiDollarSign className="inline-block mr-1 text-green-500" />
                      {service.amount}
                    </span>
                    <span className="flex items-center text-gray-600 text-sm">
                      {getStatusIcon(service.status)}
                      {service.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && services.length === 0 && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-600 text-center"
          >
            You have no booked services.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bookings;
